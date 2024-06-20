import React, { useState } from 'react';

export default function Application() {
    const [position, setPosition] = useState('');
    const [experience, setExperience] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [managementExperience, setManagementExperience] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [skills, setSkills] = useState([]);
    const [interviewTime, setInterviewTime] = useState('');
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
        setExperience('');
        setPortfolio('');
        setManagementExperience('');
    };

    const handleSkillChange = (event) => {
        const value = event.target.value;
        setSkills((prevSkills) =>
            prevSkills.includes(value)
                ? prevSkills.filter((skill) => skill !== value)
                : [...prevSkills, value]
        );
    };

    const validate = () => {
        const newErrors = {};

        if (!fullName) newErrors.fullName = 'Full Name is required.';
        if (!email) {
            newErrors.email = 'Email is required.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) newErrors.email = 'Email must be a valid email format.';
        }
        if (!phone) {
            newErrors.phone = 'Phone Number is required.';
        } else {
            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phone)) newErrors.phone = 'Phone Number must be a valid number.';
        }
        if (position === 'Developer' || position === 'Designer') {
            if (!experience) {
                newErrors.experience = 'Relevant Experience is required.';
            } else if (experience <= 0) {
                newErrors.experience = 'Relevant Experience must be a number greater than 0.';
            }
        }
        if (position === 'Designer') {
            if (!portfolio) {
                newErrors.portfolio = 'Portfolio URL is required.';
            } else {
                const urlRegex = /^(http|https):\/\/[^ "]+$/;
                if (!urlRegex.test(portfolio)) newErrors.portfolio = 'Portfolio URL must be a valid URL.';
            }
        }
        if (position === 'Manager' && !managementExperience) {
            newErrors.managementExperience = 'Management Experience is required.';
        }
        if (skills.length === 0) newErrors.skills = 'At least one skill must be selected.';
        if (!interviewTime) newErrors.interviewTime = 'Preferred Interview Time is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            const data = {
                fullName,
                email,
                phone,
                position,
                experience,
                portfolio,
                managementExperience,
                skills,
                interviewTime,
            };
            setSubmittedData(data);
        }
    };

    return (
        <div className='bg-primary d-flex flex-column justify-content-start align-items-center' style={{ height: '100vh' }}>
            <div className='text-white fs-1 fw-bold m-4'>
                Job Application Form
            </div>
            <div className='card w-50 m-4 overflow-auto flex flex-column justify-content-start align-items-center p-4' style={{ height: '90vh' }}>
                <form className='w-100' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                    </div>
                    <div className='mb-4'>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className='mb-4'>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>
                    <div className="input-group mb-4">
                        <label className="input-group-text fw-bold" htmlFor="inputGroupFile01">Resume</label>
                        <input type="file" className="form-control" id="inputGroupFile01" />
                    </div>
                    <div className='mb-4'>
                        <textarea
                            className="form-control"
                            id="coverLetter"
                            rows="4"
                            placeholder="Cover Letter"
                        ></textarea>
                    </div>
                    <div className='mb-4'>
                        <div className="input-group mb-3">
                            <select
                                className="form-select"
                                id="inputGroupSelect02"
                                value={position}
                                onChange={handlePositionChange}
                            >
                                <option value="">Applying for Position</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                    </div>
                    {position === 'Developer' || position === 'Designer' ? (
                        <div className='mb-4'>
                            <input
                                type="number"
                                className="form-control"
                                id="experience"
                                placeholder="Relevant Experience (Number of years)"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                            {errors.experience && <div className="text-danger">{errors.experience}</div>}
                        </div>
                    ) : null}
                    {position === 'Designer' ? (
                        <div className='mb-4'>
                            <input
                                type="url"
                                className="form-control"
                                id="portfolio"
                                placeholder="Portfolio URL"
                                value={portfolio}
                                onChange={(e) => setPortfolio(e.target.value)}
                            />
                            {errors.portfolio && <div className="text-danger">{errors.portfolio}</div>}
                        </div>
                    ) : null}
                    {position === 'Manager' ? (
                        <div className='mb-4'>
                            <textarea
                                className="form-control"
                                id="managementExperience"
                                rows="4"
                                placeholder="Management Experience"
                                value={managementExperience}
                                onChange={(e) => setManagementExperience(e.target.value)}
                            ></textarea>
                            {errors.managementExperience && <div className="text-danger">{errors.managementExperience}</div>}
                        </div>
                    ) : null}
                    <div className='mb-4 d-flex flex-column align-items-start'>
                        <div className='fw-bold fs-5 mb-3'>Additional Skills</div>
                        <div className="form-check" style={{ width: 'fit-content' }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="JavaScript"
                                id="flexCheckJavaScript"
                                onChange={handleSkillChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckJavaScript">
                                JavaScript
                            </label>
                        </div>
                        <div className="form-check" style={{ width: 'fit-content' }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="CSS"
                                id="flexCheckCSS"
                                onChange={handleSkillChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckCSS">
                                CSS
                            </label>
                        </div>
                        <div className="form-check" style={{ width: 'fit-content' }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="Python"
                                id="flexCheckPython"
                                onChange={handleSkillChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckPython">
                                Python
                            </label>
                        </div>
                        <div className="form-check" style={{ width: 'fit-content' }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="Java"
                                id="flexCheckJava"
                                onChange={handleSkillChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckJava">
                                Java
                            </label>
                        </div>
                        {errors.skills && <div className="text-danger">{errors.skills}</div>}
                    </div>
                    <div className='mb-4'>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="startDateTime"
                            value={interviewTime}
                            onChange={(e) => setInterviewTime(e.target.value)}
                        />
                        {errors.interviewTime && <div className="text-danger">{errors.interviewTime}</div>}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Submit Application</button>
                    </div>
                </form>


                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel"><h3 className="text-center">Application Summary</h3></h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {submittedData && (

                                <div className="mt-4 w-100">
                                    
                                    <p><strong>Full Name:</strong> {submittedData.fullName}</p>
                                    <p><strong>Email:</strong> {submittedData.email}</p>
                                    <p><strong>Phone Number:</strong> {submittedData.phone}</p>
                                    <p><strong>Position:</strong> {submittedData.position}</p>
                                    <p><strong>Relevant Experience:</strong> {submittedData.experience}</p>
                                    <p><strong>Portfolio URL:</strong> {submittedData.portfolio}</p>
                                    <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
                                    <p><strong>Additional Skills:</strong> {submittedData.skills.join(', ')}</p>
                                    <p><strong>Preferred Interview Time:</strong> {submittedData.interviewTime}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
