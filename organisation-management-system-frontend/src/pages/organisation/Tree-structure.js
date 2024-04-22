import React, { useState, useEffect } from 'react';
import './tree-structure.css';
import EmployeeNode from '../../components/EmployeeNode/EmployeeNode';

const OrganizationalTree = () => {
  const [data, setData] = useState({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://xto10x-24f21250d5a0.herokuapp.com/api/organizational');
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching organizational data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const response = await fetch(`https://xto10x-24f21250d5a0.herokuapp.com/api/subordinates/${employeeId}`);
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
  };

  const rootEmployeeId = Object.keys(data)[0]; // Assuming the first key is the root

  return (
    <div className="organizational-tree">
      {data[rootEmployeeId] && (
        <EmployeeNode
          employee={data[rootEmployeeId].employee}
          fetchEmployeeDetails={fetchEmployeeDetails}
          isRoot={true}
          onClick={() => handleEmployeeClick(data[rootEmployeeId].employee._id)}
        />
      )}
      {selectedEmployeeId && (
        <EmployeeNode
          employee={data[selectedEmployeeId].employee}
          fetchEmployeeDetails={fetchEmployeeDetails}
        />
      )}
    </div>
  );
};

export default OrganizationalTree;


