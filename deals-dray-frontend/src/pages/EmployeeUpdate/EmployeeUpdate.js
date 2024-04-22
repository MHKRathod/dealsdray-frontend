import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeInput from '../../components/EmployeeInput/EmployeeInput';
import axios from "axios";
import ModalUpdate from '../../components/Modal/ModalUpdate';


const UpdateEmployeeForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null); 
    const [modalIsOpen, setModalIsOpen] = useState(false); 

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`https://xto10x-24f21250d5a0.herokuapp.com/api/employees/${id}`);
                console.log('API Response:', response.data); 
                const employeeData = response.data.employee; 
                console.log('Employee Data:', employeeData); 
                setFormData(employeeData); 
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };
        fetchEmployeeDetails();
    }, [id]);

    console.log('FormData:', formData);

    if (!formData) {
        return <div>Loading...</div>; 
    }

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let courses = formData.courses;
            // Check if courses is an array, if not, initialize it as an empty array
            if (!Array.isArray(courses)) {
                courses = [];
            }
    
            const dataToSend = {
                ...formData,
                courses: courses.join(','), // Join courses array into comma-separated string
            };
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            const response = await axios.put(`https://xto10x-24f21250d5a0.herokuapp.com/api/employees/edit/${id}`, dataToSend, config);
            console.log('Response from backend:', response.data);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };
    

    return (
        <Fragment>
            <h1 className="heading-1">Update Employee</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    {/* Using EmployeeInput component */}
                    <EmployeeInput label="Name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                    <EmployeeInput label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    <EmployeeInput label="Mobile No" name="mobile" type="text" pattern="[0-9]{10}" value={formData.mobile} onChange={handleInputChange} required />
                    <EmployeeInput label="Designation" name="designation" type="select" value={formData.designation} onChange={handleInputChange} options={[
                        { label: 'HR', value: 'HR' },
                        { label: 'SDE', value: 'SDE' },
                        { label: 'SDE2', value: 'SDE2' },
                        { label: 'Service Engineer', value: 'Service Engineer' },
                        { label: 'Data Scientist', value: 'Data Scientist' }
                    ]} required />
                    <EmployeeInput label="Gender" name="gender" type="radio" value={formData.gender} onChange={handleInputChange} options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' }
                    ]} required />
                    <EmployeeInput label="Courses" name="courses" type="checkbox" value={formData.courses} onChange={handleInputChange} options={[
                        { label: 'B.Tech', value: 'B.Tech' },
                        { label: 'M.Tech', value: 'M.Tech' },
                        { label: 'B.Sc', value: 'B.Sc' },
                        { label: 'M.Sc', value: 'M.Sc' }
                    ]} />
                    <button type="submit" class="submit-button">Update</button>
                </form>
            </div>
                <ModalUpdate isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        </Fragment>
    );
};

export default UpdateEmployeeForm;