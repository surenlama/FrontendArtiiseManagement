import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { deleteUser, getUsers } from "../services/UserServices";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import {FaEdit} from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useCookies } from 'react-cookie';
import Navigation from './Navigation'
import { Link } from "react-router-dom";


const Manage = () => {
  const [users, setUsers] = useState([]);
  const [addUserShow, setAddUserShow] = useState(false);
  const [editUserShow, setEditUserShow] = useState(false);
  const [editUser, setEditUser] = useState([]);
  const [isUserUpdated, setUserisUpdated] = useState(false);
  const [token, setToken] = useCookies(['mytoken']);
  const [totalResult, setTotalResults] = useState(0);
  const baseUrl = 'http://127.0.0.1:8000'


  useEffect(() => {
    let mounted = true;
    if (users.length && !isUserUpdated) {
      return;
    }
    fetchData(baseUrl + '/userapi', token['mytoken']);
    return () => {
      mounted = false;
      setUserisUpdated(false);
    };
  }, [isUserUpdated, users, token]);
  
  function fetchData(baseurl, token) {
    fetch(baseurl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        const users = data.results;
        if (users) {
          setUsers(users);
          setTotalResults(data.count);
        } else {
          setUsers([]);
          setTotalResults(0);
        }
      }).catch((error) => {
        alert("Page not found", error);
      });
  }
  
  
  const handleAdd = (e) => {
    e.preventDefault();
    setAddUserShow(true);
  };
  const handleUpdate = (e, usr) => {
    e.preventDefault();
    setEditUserShow(true);
    setEditUser(usr);
  };

  const handleDelete = (e, id) => {
    if (window.confirm('Are you sure?')) {
      e.preventDefault();
      deleteUser(id, token['mytoken'])
        .then((result) => {
          alert(result);
          setUserisUpdated(true);
        })
        .catch((error) => {
          alert("Failed to Delete User");
        });
    }
  };
  let AddUserClose = () => setAddUserShow(false);
  let EditUserClose = () => setEditUserShow(false);
 
  function changeUrl(baseurl){
    fetchData(baseurl, token['mytoken']);  }
  var links =[];
  console.log('link',links)
  for(let i=1;i<=Math.ceil(totalResult/5);i++){
    links.push(<li class="page-item"><Link onClick={()=>changeUrl(baseUrl+`/userapi/?page=${i}`)} to={`/manage/?page=${i}`} class="page-link">{i}</Link></li>)
  }
  return (
    <>
    <Navigation />
    <div className="row side-row">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Date of birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th style={{ width: '105px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
              <td>
              <Button
               className="mr-2" 
               variant="danger"
                onClick={event => handleDelete(event, user.id)}
                >
                  <RiDeleteBin5Line/>
                </Button>

                <Button
                  className="mr-2"
                  variant="primary"
                  onClick={event => handleUpdate(event, user)}
                >
                  <FaEdit/>
                </Button>
                <UpdateUserModal
                  show={editUserShow}
                  onHide={EditUserClose}
                  user={editUser}
                  setUpdated={setUserisUpdated}
                  token={token['mytoken']} // Pass the token here

                />
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant="success" onClick={handleAdd}>
          Add User
        </Button>{" "}

        
      </ButtonToolbar>
      <nav aria-label="Page navigation example mt-5">
  <ul className="pagination justify-content-center">
            {links}

  </ul>
</nav>
      <AddUserModal
        show={addUserShow}
        onHide={AddUserClose}
        setUpdated={setUserisUpdated}
        token = {token['mytoken']}
      ></AddUserModal>
    </div>
    </>
 );
};

export default Manage;
