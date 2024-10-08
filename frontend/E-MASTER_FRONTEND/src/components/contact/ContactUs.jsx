import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ab9nn18", "template_sddgaca", form.current, {
        publicKey: "CoiekFgRtIfSWO6le",
      })
      .then(
        (result) => {
          console.log(result.text);
          setMessageSent(true);
          setTimeout(() => setMessageSent(false), 3000); // Auto-hide after 3 seconds
        },
        (error) => {
          console.log(error.text);
          setMessageSent(false);
        }
      );
    e.target.reset();
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8"
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_name">
              Full Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="Your full name"
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_email">
              Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              placeholder="Your email address"
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Message subject"
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your message..."
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        {messageSent && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
              <p className="font-semibold">Message sent successfully!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactUs;