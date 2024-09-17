import axios from 'axios';

const API_URL = 'http://localhost:7071/courses';

class CourseService {
  createCourse(course, file) {
    const formData = new FormData();
    formData.append('course', JSON.stringify(course));
    formData.append('file', file);

    return axios.post(`${API_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  getAllCourses() {
    return axios.get(`${API_URL}/allCourses`);
  }
}

export default new CourseService();