const localVideo = document.getElementById("localVideo");
const remoteVideosContainer = document.getElementById("remoteVideosContainer");
const localUser = document.getElementById("localUser");
const connectButton = document.getElementById("connectButton");
const remoteUser = document.getElementById("remoteUser");
const callButton = document.getElementById("callButton");
const hangUpButton = document.getElementById("hangUpButton");
let localStream;
let stompClient;
let acceptedCall = false;

// ICE Server Configurations
const iceServers = {
    iceServer: {
        urls: "stun:stun.l.google.com:19302"
    }
}

// Maintain a list of peer connections
let peerConnections = {};

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
    })
    .catch(error => {
        console.log(error);
    });

connectButton.onclick = () => {
    let socket = new SockJS('/chatroom', {debug: false});
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log("Connected: " + frame);

        stompClient.subscribe('/user/' + localUser.value + "/topic/call", (call) => {
            let caller = call.body;
            if (confirm(`Incoming call from ${caller}. Do you want to accept?`)) {
                setupPeerConnection(caller);
                acceptedCall = true;
                stompClient.send("/app/acceptCall", {}, JSON.stringify({"fromUser": localUser.value, "toUser": caller}));
            } else {
                stompClient.send("/app/rejectCall", {}, JSON.stringify({"fromUser": localUser.value, "toUser": caller}));
            }
        });

        stompClient.subscribe('/user/' + localUser.value + "/topic/offer", (offer) => {
            if (!acceptedCall) return;
            let o = JSON.parse(offer.body)["offer"];
            let caller = JSON.parse(offer.body)["fromUser"];
            setupPeerConnection(caller);
            peerConnections[caller].setRemoteDescription(new RTCSessionDescription(o));
            peerConnections[caller].createAnswer().then(description => {
                peerConnections[caller].setLocalDescription(description);
                stompClient.send("/app/answer", {}, JSON.stringify({
                    "toUser": caller,
                    "fromUser": localUser.value,
                    "answer": description
                }));
            });
        });

        stompClient.subscribe('/user/' + localUser.value + "/topic/answer", (answer) => {
            let o = JSON.parse(answer.body)["answer"];
            let caller = JSON.parse(answer.body)["fromUser"];
            peerConnections[caller].setRemoteDescription(new RTCSessionDescription(o));
        });

        stompClient.subscribe('/user/' + localUser.value + "/topic/candidate", (candidate) => {
            let o = JSON.parse(candidate.body)["candidate"];
            let caller = JSON.parse(candidate.body)["fromUser"];
            let iceCandidate = new RTCIceCandidate({
                sdpMLineIndex: o["lable"],
                candidate: o["id"],
            });
            peerConnections[caller].addIceCandidate(iceCandidate);
        });

        stompClient.send("/app/addUser", {}, localUser.value);
    });
};

callButton.onclick = () => {
    let callee = remoteUser.value;
    setupPeerConnection(callee);
    stompClient.send("/app/call", {}, JSON.stringify({"callTo": callee, "callFrom": localUser.value}));
};

function setupPeerConnection(remoteUser) {
    if (peerConnections[remoteUser]) return;

    let peerConnection = new RTCPeerConnection(iceServers);
    peerConnections[remoteUser] = peerConnection;

    peerConnection.ontrack = (event) => {
        let remoteVideo = document.createElement("video");
        remoteVideo.id = "remoteVideo_" + remoteUser;
        remoteVideo.autoplay = true;
        remoteVideo.srcObject = event.streams[0];
        remoteVideosContainer.appendChild(remoteVideo);
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            let candidate = {
                type: "candidate",
                lable: event.candidate.sdpMLineIndex,
                id: event.candidate.candidate,
            };
            stompClient.send("/app/candidate", {}, JSON.stringify({
                "toUser": remoteUser,
                "fromUser": localUser.value,
                "candidate": candidate
            }));
        }
    };

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.createOffer().then(description => {
        peerConnection.setLocalDescription(description);
        stompClient.send("/app/offer", {}, JSON.stringify({
            "toUser": remoteUser,
            "fromUser": localUser.value,
            "offer": description
        }));
    });
}

// Screen sharing code remains the same
const displayMediaOptions = {
  video: {
    displaySurface: "browser",
  },
  audio: {
    suppressLocalAudioPlayback: false,
  },
  preferCurrentTab: false,
  selfBrowserSurface: "exclude",
  systemAudio: "include",
  surfaceSwitching: "include",
  monitorTypeSurfaces: "include",
};

async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

        const videoElement = document.getElementById("screenVideo");
        toggleVideoVisibility("screenVideo");
        videoElement.srcObject = captureStream;
        videoElement.play();

        // Add the screen sharing stream to all peer connections
        captureStream.getTracks().forEach(track => {
            for (let peer in peerConnections) {
                peerConnections[peer].addTrack(track, captureStream);
            }
        });

    } catch (err) {
        console.error(`Error: ${err}`);
    }
    return captureStream;
}

const ScreenSharing = document.getElementById("startButton");
ScreenSharing.onclick = async () => { startCapture(displayMediaOptions) };

const stopButton = document.getElementById("stopButton");
stopButton.onclick = () => {
  const videoElement = document.getElementById("screenVideo");
  videoElement.srcObject.getTracks().forEach(track => track.stop());
  toggleVideoVisibility("screenVideo");
};

function toggleVideoVisibility(videoElementId) {
    const videoElement = document.getElementById(videoElementId);
    if (videoElement.style.display === "none" || videoElement.style.display === "") {
        videoElement.style.display = "block";
    } else {
        videoElement.style.display = "none";
    }
}