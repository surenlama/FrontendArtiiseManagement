import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { addMusic } from "../services/MusicServices";

const AddMusicModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newMusic = {
      artist_id: formData.get("artist_id"),
      title: formData.get("title"),
      album_name: formData.get("album_name"),
      genre: formData.get("genre"),
      created_at: formData.get("created_at"),
      updated_at: formData.get("updated_at"),
    };

    addMusic(newMusic, props.token)
      .then((result) => {
        alert(result);
        props.setUpdated(true);
      })
      .catch((error) => {
        alert("Failed to Add Music");
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
            Fill in Music Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="artist_id">
                  <Form.Label>Artist ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="artist_id"
                    required
                    placeholder="Enter Artist ID"
                  />
                </Form.Group>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    required
                    placeholder="Enter Title"
                  />
                </Form.Group>
                <Form.Group controlId="album_name">
                  <Form.Label>Album Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="album_name"
                    required
                    placeholder="Enter Album Name"
                  />
 
                </Form.Group>
                <Form.Group controlId="genre">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control as="select" name="genre" required>
                    <option value="">Select Genre</option>
                    <option value="Mb">Mb</option>
                    <option value="Country">Country</option>
                    <option value="Classic">Classic</option>
                    <option value="Rock">Rock</option>
                    <option value="Jazz">Jazz</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="created_at">
                  <Form.Label>Created At</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="created_at"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="updated_at">
                  <Form.Label>Updated At</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="updated_at"
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

export default AddMusicModal;
