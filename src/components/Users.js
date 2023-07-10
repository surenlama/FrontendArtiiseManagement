import React, {useEffect, useState} from "react";
import {Table} from 'react-bootstrap';
import {getUsers} from '../services/UserServices';
import "../App.css";
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';



const Users = ()=>{
    const [users, setUsers] = useState([]);
    const [token, setToken] = useCookies(['mytoken']);

    useEffect(()=>{
        let mounted = true;
        getUsers(token['mytoken'])
        .then(data => {
            if (mounted) {
                setUsers(data)
            }
        })
        return () => mounted = false;
    },[token]);
    return (
        <div className="row side-row">
        <Table striped bordered hover id="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone  Number</th>
              <th>Email Address</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Address</th>
        
            </tr>
          </thead>
          <tbody>
          {users.map((user)=>
            <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.dob}</td>
            <td>{user.gender}</td>
            <td>{user.address}</td>
 
          </tr>
            )}      
            
           
          </tbody>
          
        </Table>
        </div>
      );
}

export default Users