import React, { useEffect, useState } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { addMusic } from "../services/MusicServices";
import { getArtists } from "../services/ArtistServices";

const AddMusicModal = (props) => {
  const [artists, setArtists] = useState([]);
  const [error,setError] = useState("");

  useEffect(() => {
    // Fetch the list of artists
    getArtists(props.token)
      .then((data) => {
        setArtists(data.results);
      })
      .catch((error) => {
        console.log("Failed to fetch artists:", error);
      });
  }, [props.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newMusic = {
      artist_id: formData.get("artist_id"),
      title: formData.get("title"),
      album_name: formData.get("album_name"),
      genre: formData.get("genre"),
    };

    addMusic(newMusic, props.token)
      .then((result) => {
        alert(result);
        props.setUpdated(true);
      })
      .catch(error => {
        let errorMessage = 'An error occurred User Adding.'; // Default error message
      
        if (error.response && error.response.data) {
          if (error.response.data.non_field_errors) {
            errorMessage = error.response.data.non_field_errors[0]; 

          } 
        
        }
        setError(errorMessage); 
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
                  <Form.Label>Artist</Form.Label>
                  <Form.Control as="select" name="artist_id" required>
                    <option value="">Select Artist</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name}
                      </option>
                    ))}
                  </Form.Control>
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
                  <p className='text-danger'>{error}</p>

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
