import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { addArtist } from "../services/ArtistServices";

const AddArtistModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('data appear',e.target)
    addArtist(e.target, props.token)
      .then((result) => {
        alert(result);
        props.setUpdated(true);
      })
      .catch((error) => {
        alert("Failed to Add Artist");
      });
  };

  return (
    <div className="container">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Fill in Artist Information of artist
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    required
                    placeholder=""
                  />
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
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="first_release_year">
                  <Form.Label>First Release Year</Form.Label>
                  <Form.Control
                    type="date"
                    name="first_release_year"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="no_of_albums_released">
                  <Form.Label>No. of Albums Released</Form.Label>
                  <Form.Control
                    type="number"
                    name="no_of_albums_released"
                    required
                    placeholder=""
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

export default AddArtistModal;
