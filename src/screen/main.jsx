import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../screen/main.css'

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.number().typeError('Phone Number must be a number').required('Phone Number is required'),
  position: yup.string().required('Applying for Position is required'),
  relevantExperience: yup
    .number()
    .typeError('Relevant Experience must be a number')
    .min(1, 'Relevant Experience must be greater than 0')
    .when('position', {
      is: (val) => val === 'Developer' || val === 'Designer',
      then: yup.number().required('Relevant Experience is required'),
    }),
  portfolioURL: yup
    .string()
    .url('Portfolio URL must be a valid URL')
    .when('position', {
      is: 'Designer',
      then: yup.string().required('Portfolio URL is required'),
    }),
  managementExperience: yup.string().when('position', {
    is: 'Manager',
    then: yup.string().required('Management Experience is required'),
  }),
  additionalSkills: yup.array().min(1, 'At least one skill must be selected'),
  preferredInterviewTime: yup.date().required('Preferred Interview Time is required').nullable(),
});

const JobApplicationForm = () => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const watchPosition = watch('position');

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="form-container">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" {...register('fullName')} />
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" {...register('phoneNumber')} />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>

        <div className="form-group">
          <label>Applying for Position</label>
          <select {...register('position')}>
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p>{errors.position.message}</p>}
        </div>

        {(watchPosition === 'Developer' || watchPosition === 'Designer') && (
          <div className="form-group">
            <label>Relevant Experience (years)</label>
            <input type="text" {...register('relevantExperience')} />
            {errors.relevantExperience && <p>{errors.relevantExperience.message}</p>}
          </div>
        )}

        {watchPosition === 'Designer' && (
          <div className="form-group">
            <label>Portfolio URL</label>
            <input type="text" {...register('portfolioURL')} />
            {errors.portfolioURL && <p>{errors.portfolioURL.message}</p>}
          </div>
        )}

        {watchPosition === 'Manager' && (
          <div className="form-group">
            <label>Management Experience</label>
            <input type="text" {...register('managementExperience')} />
            {errors.managementExperience && <p>{errors.managementExperience.message}</p>}
          </div>
        )}

        <div className="form-group">
          <label>Additional Skills</label>
          <div>
            <label>
              <input type="checkbox" value="JavaScript" {...register('additionalSkills')} />
              JavaScript
            </label>
            <label>
              <input type="checkbox" value="CSS" {...register('additionalSkills')} />
              CSS
            </label>
            <label>
              <input type="checkbox" value="Python" {...register('additionalSkills')} />
              Python
            </label>
            {/* Add more skills as needed */}
          </div>
          {errors.additionalSkills && <p>{errors.additionalSkills.message}</p>}
        </div>

        <div className="form-group">
          <label>Preferred Interview Time</label>
          <Controller
            control={control}
            name="preferredInterviewTime"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            )}
          />
          {errors.preferredInterviewTime && <p>{errors.preferredInterviewTime.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
