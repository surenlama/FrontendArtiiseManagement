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


const Manage = () => {
  const [users, setUsers] = useState([]);
  const [addUserShow, setAddUserShow] = useState(false);
  const [editUserShow, setEditUserShow] = useState(false);
  const [editUser, setEditUser] = useState([]);
  const [isUserUpdated, setUserisUpdated] = useState(false);
  const [token, setToken] = useCookies(['mytoken']);

  useEffect(() => {
    let mounted = true;
    if (users.length && !isUserUpdated) {
      return;
    }
    getUsers(token['mytoken']).then((data) => {
      if (mounted) {
        setUsers(data.results);
      }
    });
    return () => {
      mounted = false;
      setUserisUpdated(false);
    };
  }, [isUserUpdated, users,token]);

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
            <th>Action</th>
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
              <Button className="mr-2" variant="danger"
                onClick={event => handleDelete(event, user.id)}>
                  <RiDeleteBin5Line/>
                </Button>
                <span>&nbsp;&nbsp;</span>

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

                ></UpdateUserModal>
               
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
