import React, { useEffect, useState } from 'react';
import {Table} from 'reactstrap';
import axios from 'axios';

function EmployeeList(){
    const url = 'http://localhost:3000/employees/';
    let [employees, setEmployees] = useState([]);
    let [id, setId] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [isEdit, setIsEdit] = useState(false);

    useEffect(() =>{
        getEmployeesList();
    }, []);

    let getEmployeesList =  async () =>{
        const result = await axios.get(url);
        console.log(result.data);
        setEmployees(result.data);
    }

    let getEmployeeById = (empId = 0) => {
            axios.get(url+empId).then((res) =>{
                const {id,first_name,last_name, email} = res.data;
                console.log(res);
                 setId(id);
                 setFirstName(first_name);
                 setLastName(last_name);
                 setEmail(email);
            })
    }

    function editEmployee(){
        axios.put(url+id, {
            id : id,
            first_name : firstName,
            last_name : lastName,
            email :email
        })
    }

    //Add record
    function addEmployee(){
    axios.post(url, {
            "id" : id,
            "first_name" : firstName,
            "last_name" : lastName,
            "email" :email
        });
    }

    //Delete Record
    function deleteRow(id){
        axios.delete(`${url}${id}`).then(response => {
            console.log(response);
            getEmployeesList();
        });
    }

    return (<div>
            <h1>Add New Employee :</h1>
            <form>
                <label id="id">Id:</label>
                <input type = "text" 
                id = "id" 
                value = {id}
                disabled = {isEdit ? "disabled" : ""}
                onChange = {event => setId(event.target.value)}/>

                <label id="first_name">First Name:</label>
                <input type = "text" 
                id = "first_name" 
                value = {firstName}
                onChange = {event => setFirstName(event.target.value)}/>

                <label id="last_name">Last Name:</label>
                <input type = "text" 
                id = "last_name" 
                value = {lastName}
                onChange = {event => setLastName(event.target.value)}/>

                <label id="email">Email:</label>
                <input type = "text" 
                id = "email" 
                value = {email}
                onChange = {event => setEmail(event.target.value)}/>
                <button onClick = {() => (isEdit ? editEmployee() : addEmployee())}>{isEdit ? "Update" : "Add"}</button>
            </form>
            <Table>
            <thead>
            <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((emp) => (
                <tr key = {emp.id}>
                <td >{emp.id}</td>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>
                    <button onClick = {() => {
                        deleteRow(emp.id)
                        }}>delete</button>
                </td>
                <td>
                    <button onClick = {() => {
                        setIsEdit(true);
                        getEmployeeById(emp.id)
                        }}>Edit</button>
                </td>
                </tr>
            ))}
            </tbody>
      </Table>
   </div>);
}

export default EmployeeList;