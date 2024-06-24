import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import './Department.css';

function Department() {
  const { departmentName } = useParams();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees/view')
      .then(response => {
        const filteredEmployees = response.data.filter(employee => 
          employee.department.toLowerCase() === departmentName.toLowerCase()
        );
        setEmployees(filteredEmployees);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [departmentName]);

  return (
    <div>
      <h2>{departmentName} Employees</h2>
      <table>
        <thead> 
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
          </tr> 
        </thead> 
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.gender}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody> 
      </table>
    </div>
  );
}

export default Department;
