import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { UpdateMusic } from "../services/MusicServices";

const UpdateMusicModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const musicId = props.music.id;
    const updatedMusic = {
      artist_id: props.music.artist_id,
      title: e.target.title.value,
      album_name: e.target.album_name.value,
      genre: e.target.genre.value,
      created_at: e.target.created_at.value,
      updated_at: e.target.updated_at.value,
    };

    UpdateMusic(musicId, updatedMusic, props.token)
      .then((result) => {
        alert(result);
        props.setUpdated(true);
      })
      .catch((error) => {
        alert("Failed to Update Music");
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
            Update Music Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={props.music.title}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="album_name">
                  <Form.Label>Album Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="album_name"
                    defaultValue={props.music.album_name}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="genre">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    as="select"
                    name="genre"
                    defaultValue={props.music.genre}
                    required
                  >
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
                    defaultValue={props.music.created_at}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="updated_at">
                  <Form.Label>Updated At</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="updated_at"
                    defaultValue={props.music.updated_at}
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

export default UpdateMusicModal;
