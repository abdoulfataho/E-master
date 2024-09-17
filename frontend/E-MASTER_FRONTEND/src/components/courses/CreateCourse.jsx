import React, { useState } from 'react';
import CourseService from './CourseService';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = { title, description };
        try {
            await CourseService.createCourse(course, file);
            alert('Course created successfully');
        } catch (error) {
            alert('Failed to create course');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '5px' }}>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '10px' }}>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '5px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '10px' }}>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: '5px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '10px' }}>PDF File:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required style={{ padding: '5px' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px', border: 'none' }}>Create Course</button>
        </form>
    );
};

export default CreateCourse;
