import React, { useState } from 'react';
import "../../pages/organisation/tree-structure.css";

const EmployeeNode = ({ employee, fetchEmployeeDetails }) => {
    const [subordinates, setSubordinates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalSubordinates, setTotalSubordinates] = useState(null); // Initialize with null
    const [isOpen, setIsOpen] = useState(false); // State to track visibility of subordinates
  
    const handleClick = async () => {
      setIsOpen(!isOpen); // Toggle the visibility of subordinates
  
      // If subordinates are not loaded yet, fetch them
      if (!subordinates.length && !isLoading) {
        setIsLoading(true);
        try {
          const fetchedEmployee = await fetchEmployeeDetails(employee._id);
          setSubordinates(fetchedEmployee.subordinates);
          setTotalSubordinates(fetchedEmployee.subordinateCount); // Set total subordinates count from API
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    return (
      <div className="employee-node">
        <div className="node-box" onClick={handleClick}>
          <span>{employee.name} {employee.manager ? '' : '(Missing Manager)'}</span>
          {subordinates.length > 0 && <span>({subordinates.length} direct)</span>} {/* Display direct subordinates count if available */}
          {totalSubordinates !== null && <span>({totalSubordinates} total)</span>} {/* Display total subordinates count if available */}
          {isLoading && <span>Loading subordinates...</span>}
          {error && <span>Error fetching subordinates: {error.message}</span>}
        </div>
  
        {/* Render subordinates only if isOpen is true */}
        {isOpen && subordinates.length > 0 && (
          <ul className="subordinates-list">
            {subordinates.map((subordinate) => (
              <li key={subordinate._id}>
                <div className="tree-line" />
                <div className="tree-branch">
                  <EmployeeNode employee={subordinate} fetchEmployeeDetails={fetchEmployeeDetails} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default EmployeeNode;
