import React from "react";
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import {UpdateUser } from '../services/UserServices';

const UpdateUserModal=(props)=>{
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = props.user.id;
    const currentDate = new Date();

    const updatedUser = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      gender: e.target.gender.value,
      password: e.target.password.value, 
      is_superuser: false,
      date_joined: currentDate,
      is_staff: false,
      is_active: true,
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
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" required 
                                    defaultValue={props.user.address}

                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" required 
                                    defaultValue={props.user.dob}

                  placeholder="" />
                </Form.Group>
                <Form.Group controlId="gender">

                <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" name="gender" required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
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