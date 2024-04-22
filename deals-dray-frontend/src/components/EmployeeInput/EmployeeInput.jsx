// EmployeeInput.js
import React from 'react';
import "../EmployeeInput/EmployeeInput.css"; // Import EmployeeInput.css

// Inside EmployeeInput component

const EmployeeInput = ({ label, name, type, autoComplete, id, value, onChange, options, required }) => {
    // Ensure value is not undefined
    const normalizedValue = value !== undefined ? value : [];

    const handleChange = (e) => {
        onChange(name, e.target.value);
    };
 
    return (
        <div className="employee-form-container">
            <label className="employee-form-label" htmlFor={id}>{label}</label>
            {type === 'select' ? (
                <select
                    className="employee-form-input"
                    name={name}
                    id={id}
                    value={normalizedValue}
                    onChange={handleChange}
                    required={required}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : type === 'radio' ? (
                <div className="employee-radio-container">
                    {options.map((option, index) => (
                        <div key={index} className="employee-radio-option">
                            <input
                                type="radio"
                                id={`${id}-${index}`}
                                name={name}
                                value={option.value}
                                checked={normalizedValue === option.value}
                                onChange={handleChange}
                            />
                            <label htmlFor={`${id}-${index}`}>{option.label}</label>
                        </div>
                    ))}
                </div>
            ) : type === 'checkbox' ? (
                <div className="employee-checkbox-container">
                    {options.map((option, index) => (
                        <div key={index} className="employee-checkbox-option">
                            <input
                                type="checkbox"
                                id={`${id}-${index}`}
                                name={name}
                                value={option.value}
                                checked={normalizedValue.includes(option.value)}
                                onChange={handleChange}
                            />
                            <label htmlFor={`${id}-${index}`}>{option.label}</label>
                        </div>
                    ))}
                </div>
            ) : (
                <input
                type={type} // Use the provided type
                name={name}
                autoComplete={autoComplete}
                id={id}
                value={normalizedValue}
                onChange={handleChange}
                required={required}
                className="short-input" // Add a class to the input field
            />
            
            )}
        </div>
    );
}

export default EmployeeInput;
