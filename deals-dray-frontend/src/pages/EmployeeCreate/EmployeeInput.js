// EmployeeInput.js



// const EmployeeInput = ({ label, type = 'text', name, value, onChange, options, ...rest }) => {
//     return (
//         <div>
//             <label htmlFor={name}>{label}</label>
//             {type === 'checkbox' || type === 'radio' ? (
//                 <input type={type} id={name} name={name} value={value} onChange={(e) => onChange(name, e.target.checked ? e.target.value : '')} {...rest} />
//             ) : type === 'dropdown' ? (
//                 <select id={name} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} {...rest}>
//                     {options.map((option, index) => (
//                         <option key={index} value={option.value}>{option.label}</option>
//                     ))}
//                 </select>
//             ) : (
//                 <input type={type} id={name} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} {...rest} />
//             )}
//         </div>
//     );
// };

// export default EmployeeInput;
// EmployeeInput.js
import React from 'react';
import "./EmployeeInput.css";

const EmployeeInput = ({ label, name, type, autoComplete, id, value, onChange, options, required }) => {
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
                    value={value}
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
                                checked={value === option.value}
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
                                checked={value.includes(option.value)}
                                onChange={handleChange}
                            />
                            <label htmlFor={`${id}-${index}`}>{option.label}</label>
                        </div>
                    ))}
                </div>
            ) : type === 'file' ? (
                <input
                    type="file"
                    name={name}
                    id={id}
                    accept="image/jpeg, image/png"
                    onChange={(e) => onChange(name, e.target.files[0])}
                    required={required}
                />
            ) : (
                <input
                    type="text"
                    name={name}
                    autoComplete={autoComplete}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    required={required}
                />
            )}
        </div>
    );
}

export default EmployeeInput;
