import React from "react";
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import {UpdateUser } from '../services/UserServices';

const UpdateUserModal=(props)=>{
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = props.user.id;
    const updatedUser = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      dob: e.target.dob.value,
      password: e.target.password.value, // Corrected assignment
      last_login: e.target.last_login.value,
      is_superuser: e.target.is_superuser.value,
      date_joined: e.target.date_joined.value,
      is_staff: e.target.is_staff.value,
      is_active: e.target.is_active.value,
    };
    
    UpdateUser(userId, updatedUser, props.token)
      .then((result) => {
        alert(result);
        props.setUpdated(true);
      })
      .catch((error) => {
        alert("Failed to Update User");
      });
  };
  

    return (
        <div className="container">
  <Modal {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update User Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="first_name" required 
                  defaultValue={props.user.first_name}
                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="last_name" required 
                                    defaultValue={props.user.last_name}
                                    placeholder="" />
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control type="text" name="phone" required 
                                    defaultValue={props.user.phone}

                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" required
                                    defaultValue={props.user.email}

                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="dob">
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control type="date" name="dob" required 
                                    defaultValue={props.user.dob}

                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" required 
                                    defaultValue={props.user.dob}

                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="last_login">
                  <Form.Label>Last Login</Form.Label>
            <Form.Control type="datetime-local" name="last_login" required 
                              defaultValue={props.user.last_login}

            placeholder="" />
                </Form.Group>
                <Form.Group controlId="is_superuser">
    <Form.Check type="checkbox" name="is_superuser" label="Is Superuser" 
                                  defaultValue={props.user.is_superuser}

    />
                </Form.Group>
                <Form.Group controlId="date_joined">
                  <Form.Label>Date Joined</Form.Label>
                  <Form.Control type="date" name="date_joined" required
                                  defaultValue={props.user.date_joined}
                                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="is_staff">
                  <Form.Check type="checkbox" name="is_staff" label="Is Staff"
                         defaultValue={props.user.is_staff}

                  />
                </Form.Group>
                <Form.Group controlId="is_active">
                  <Form.Check type="checkbox" name="is_active" label="Is Active" 
                         defaultValue={props.user.is_active}
                         />
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
      </Modal>
        </div>
    );
};
export default UpdateUserModal;