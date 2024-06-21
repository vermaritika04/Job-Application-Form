import React, { useState } from 'react';
import './style.css';
import database from '../firebase'; // Adjust path as per your project structure
import { ref, set } from 'firebase/database';

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: [],
        interviewTime: '',
    });

    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setFormData({
                    ...formData,
                    additionalSkills: [...formData.additionalSkills, value],
                });
            } else {
                setFormData({
                    ...formData,
                    additionalSkills: formData.additionalSkills.filter((skill) => skill !== value),
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (isNaN(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be a valid number';
        }

        if ((formData.position === 'Developer' || formData.position === 'Designer') &&
            (!formData.relevantExperience || isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
            newErrors.relevantExperience = 'Relevant experience is required and must be a number greater than 0';
        }

        if (formData.position === 'Designer' && (!formData.portfolioURL || !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.portfolioURL))) {
            newErrors.portfolioURL = 'Portfolio URL is required and must be a valid URL';
        }

        if (formData.position === 'Manager' && !formData.managementExperience) {
            newErrors.managementExperience = 'Management experience is required';
        }

        if (formData.additionalSkills.length === 0) {
            newErrors.additionalSkills = 'At least one skill must be selected';
        }

        if (!formData.interviewTime) {
            newErrors.interviewTime = 'Preferred interview time is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            try {
                const newApplicationRef = ref(database, 'jobApplications/' + new Date().getTime());
                await set(newApplicationRef, formData);

                setFormSubmitted(true);
                setErrors({});
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error state if needed
            }
        } else {
            setErrors(validationErrors);
            setFormSubmitted(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Job Application Form</h2>
            <form onSubmit={handleSubmit} className="job-application-form">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={errors.phoneNumber ? 'error' : ''}
                    />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="position">Applying for Position</label>
                    <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className={errors.position ? 'error' : ''}
                    >
                        <option value="">Select</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>

                {formData.position === 'Developer' || formData.position === 'Designer' ? (
                    <div className="form-group">
                        <label htmlFor="relevantExperience">Relevant Experience (Years)</label>
                        <input
                            type="number"
                            id="relevantExperience"
                            name="relevantExperience"
                            value={formData.relevantExperience}
                            onChange={handleInputChange}
                            className={errors.relevantExperience ? 'error' : ''}
                        />
                        {errors.relevantExperience && <span className="error-message">{errors.relevantExperience}</span>}
                    </div>
                ) : null}

                {formData.position === 'Designer' ? (
                    <div className="form-group">
                        <label htmlFor="portfolioURL">Portfolio URL</label>
                        <input
                            type="text"
                            id="portfolioURL"
                            name="portfolioURL"
                            value={formData.portfolioURL}
                            onChange={handleInputChange}
                            className={errors.portfolioURL ? 'error' : ''}
                        />
                        {errors.portfolioURL && <span className="error-message">{errors.portfolioURL}</span>}
                    </div>
                ) : null}

                {formData.position === 'Manager' ? (
                    <div className="form-group">
                        <label htmlFor="managementExperience">Management Experience</label>
                        <input
                            type="text"
                            id="managementExperience"
                            name="managementExperience"
                            value={formData.managementExperience}
                            onChange={handleInputChange}
                            className={errors.managementExperience ? 'error' : ''}
                        />
                        {errors.managementExperience && <span className="error-message">{errors.managementExperience}</span>}
                    </div>
                ) : null}

                <div className="form-group">
                    <label>Additional Skills</label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="additionalSkills"
                                value="JavaScript"
                                checked={formData.additionalSkills.includes('JavaScript')}
                                onChange={handleInputChange}
                            />
                            JavaScript
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="additionalSkills"
                                value="React"
                                checked={formData.additionalSkills.includes('React')}
                                onChange={handleInputChange}
                            />
                            React
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="additionalSkills"
                                value="Node.js"
                                checked={formData.additionalSkills.includes('Node.js')}
                                onChange={handleInputChange}
                            />
                            Node.js
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="additionalSkills"
                                value="UI/UX Design"
                                checked={formData.additionalSkills.includes('UI/UX Design')}
                                onChange={handleInputChange}
                            />
                            UI/UX Design
                        </label>
                    </div>
                    {errors.additionalSkills && <span className="error-message">{errors.additionalSkills}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="interviewTime">Preferred Interview Time</label>
                    <input
                        type="datetime-local"
                        id="interviewTime"
                        name="interviewTime"
                        value={formData.interviewTime}
                        onChange={handleInputChange}
                        className={errors.interviewTime ? 'error' : ''}
                    />
                    {errors.interviewTime && <span className="error-message">{errors.interviewTime}</span>}
                </div>

                <button type="submit" className="submit-button">Submit Application</button>
            </form>

            {formSubmitted && (
                <div className="submission-summary">
                    <h3>Application Submitted Successfully!</h3>
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                    <p><strong>Position:</strong> {formData.position}</p>
                    <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>
                    {formData.position === 'Designer' && (
                        <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
                    )}
                    {formData.position === 'Manager' && (
                        <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
                    )}
                    <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
                    <p><strong>Preferred Interview Time:</strong> {formData.interviewTime}</p>
                </div>
            )}
        </div>
    );
};

export default JobApplicationForm;
