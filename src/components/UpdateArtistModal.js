import React from "react";
import { Modal, Col, Row, Form, Button, FormControl } from "react-bootstrap";
import { UpdateArtist } from "../services/ArtistServices";

const UpdateArtistModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const artistId = props.artist.id

    const updatedArtist = {
      name: e.target.name.value,
      dob: e.target.dob.value,
      gender: e.target.gender.value,
      address: e.target.address.value,
      first_release_year: e.target.first_release_year.value,
      no_of_albums_released: e.target.no_of_albums_released.value,
    };

    UpdateArtist(artistId, updatedArtist, props.token)
      .then((result) => {
        alert(result);
        props.setUpdated(true);
      })
      .catch((error) => {
        alert("Failed to Update Artist");
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
            Update Artist Information
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
                    defaultValue={props.artist.name}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    defaultValue={props.artist.dob}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    defaultValue={props.artist.gender}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    defaultValue={props.artist.address}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="first_release_year">
                  <Form.Label>First Release Year</Form.Label>
                  <Form.Control
                    type="date"
                    name="first_release_year"
                    defaultValue={props.artist.first_release_year}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="no_of_albums_released">
                  <Form.Label>No. of Albums Released</Form.Label>
                  <Form.Control
                    type="text"
                    name="no_of_albums_released"
                    defaultValue={props.artist.no_of_albums_released}
                    required
                  />
                </Form.Group>
               
              

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateArtistModal;
