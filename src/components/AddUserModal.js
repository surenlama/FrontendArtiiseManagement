import React,{useState} from "react";
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addUser } from '../services/UserServices';

const AddUserModal=(props)=>{
  const [error,setError] = useState(null);

  const handleSubmit = (e) => {
    console.log("called", e.target);
    e.preventDefault();
    addUser(e.target, props.token)
      .then((result) => {
        alert(result);
        props.setUpdated(true);
      })
      .catch(error => {
        let errorMessage = 'An error occurred User Adding.'; // Default error message
      
        if (error.response && error.response.data) {
          if (error.response.data.first_name) {

            errorMessage = error.response.data.first_name[0]; 

          } else if (error.response.data.phone) {
            
            errorMessage = error.response.data.phone[0]; 
          }
          else if (error.response.data.dob) {
            
            errorMessage = error.response.data.dob[0]; 
          }
          else if (error.response.data.password) {
            
            errorMessage = error.response.data.password[0]; 
          }
          else if (error.response.data.email) {
            errorMessage = error.response.data.email[0]; 
          }
        
        }
           console.log('error',error.response);
        setError(errorMessage); 
      });
    }

    return (
        <div className="container">
  <Modal {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Fill in User Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="first_name" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="last_name" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control type="text" name="phone" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="dob">
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control type="date" name="dob" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address.</Form.Label>
                  <Form.Control type="text" name="address" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" required placeholder="" />
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
                {/* <Form.Group controlId="last_login">
                  <Form.Label>Last Login</Form.Label>
                  <Form.Control type="datetime-local" name="last_login" required placeholder="" />
                </Form.Group> */}
                {/* <Form.Group controlId="is_superuser">
                  <Form.Check type="checkbox" name="is_superuser" label="Is Superuser" />
                </Form.Group>
                <Form.Group controlId="date_joined">
                  <Form.Label>Date Joined</Form.Label>
                  <Form.Control type="date" name="date_joined" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="is_staff">
                  <Form.Check type="checkbox" name="is_staff" label="Is Staff" />
                </Form.Group>
                <Form.Group controlId="is_active">
                  <Form.Check type="checkbox" name="is_active" label="Is Active" />
                </Form.Group> */}
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <p className='text-danger'>{error}</p>

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
export default AddUserModal;