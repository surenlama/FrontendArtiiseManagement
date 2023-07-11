import React, { useEffect, useState } from "react";
import { Table, Form, Modal } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { deleteArtist, getArtists, getArtistMusics } from "../services/ArtistServices";
import AddArtistModal from "./AddArtistModal";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useCookies } from "react-cookie";
import UpdateArtistModal from "./UpdateArtistModal";
import Navigation from './Navigation'

const ManageArtist = () => {
  const [artists, setArtists] = useState([]);
  const [addArtistShow, setAddArtistShow] = useState(false);
  const [editArtistShow, setEditArtistShow] = useState(false);
  const [editArtist, setEditArtist] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistMusics, setArtistMusics] = useState([]);
  const [isArtistUpdated, setArtistisUpdated] = useState(false);
  const [token, setToken] = useCookies(["mytoken"]);

  useEffect(() => {
    let mounted = true;
    if (artists.length && !isArtistUpdated) {
      return;
    }
    getArtists(token["mytoken"]).then((data) => {
      console.log("Artists data:", data);
      if (mounted) {
        setArtists(data.results);
      }
    });
    return () => {
      mounted = false;
      setArtistisUpdated(false);
    };
  }, [isArtistUpdated, artists, token]);

  const handleAdd = (e) => {
    e.preventDefault();
    setAddArtistShow(true);
  };

  const handleUpdate = (e, usr) => {
    console.log('usr',usr)
    e.preventDefault();
    setEditArtistShow(true);
    setEditArtist(usr);
  };

  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      deleteArtist(id, token["mytoken"])
        .then((result) => {
          alert(result);
          setArtistisUpdated(true);
        })
        .catch((error) => {
          alert("Failed to Delete Artist");
        });
    }
  };

  const handleViewMusics = (e, artist) => {
    e.preventDefault();
    setSelectedArtist(artist);
    getArtistMusics(token["mytoken"], artist.id)
      .then((data) => {
        console.log("Artist Musics:", data);
        setArtistMusics(data);
      })
      .catch((error) => {
        console.log("Failed to fetch artist musics:", error);
      });
  };

  let AddArtistClose = () => setAddArtistShow(false);
  let EditArtistClose = () => setEditArtistShow(false);

  return (
    <>
    <Navigation />
    <div className="row side-row">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>First Release Year</th>
            <th>No. of Albums Released</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th style={{
              textAlign:'center'
            }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.id}</td>
              <td>{artist.name}</td>
              <td>{artist.dob}</td>
              <td>{artist.gender}</td>
              <td>{artist.address}</td>
              <td>{artist.first_release_year}</td>
              <td>{artist.no_of_albums_released}</td>
              <td>{artist.created_at}</td>
              <td>{artist.updated_at}</td>
              <td style={{
                width:'200px'
              }}>
                <Button
                  className="mr-2"
                  variant="danger"
                  onClick={event => handleDelete(event, artist.id)}
                >
                  <RiDeleteBin5Line />
                </Button>
                <span>&nbsp;&nbsp;</span>

                <Button
                  className="mr-2"
                  variant="primary"
                  onClick={(event) => handleUpdate(event, artist)}
                >
                  <FaEdit />
                </Button>
                <span>&nbsp;&nbsp;</span>

                <Button
                  className="mr-2"
                  variant="primary"
                  onClick={(event) => handleViewMusics(event, artist)}
                >
                  <BsMusicNoteBeamed/>
                </Button>
                <UpdateArtistModal
                  show={editArtistShow}
                  onHide={EditArtistClose}
                  artist={editArtist}
                  setUpdated={setArtistisUpdated}
                  token={token["mytoken"]} // Pass the token here
                ></UpdateArtistModal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant="success" onClick={handleAdd}>
          Add Artist
        </Button>{" "}
      </ButtonToolbar>

      <Modal show={selectedArtist !== null} onHide={() => setSelectedArtist(null)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Artist Musics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArtist !== null && (
            <div>
              <h5>Artist: {selectedArtist.name}</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Album Name</th>
                    <th>Genre</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {artistMusics.map((music) => (
                    <tr key={music.id}>
                      <td>{music.musics.map(item=>item.id)}</td>

                      <td>{music.musics.map(item=>item.title)}</td>
                      <td>{music.musics.map(item=>item.album_name)}</td>
                      <td>{music.musics.map(item=>item.genre)}</td>
                      <td>{music.musics.map(item=>item.created_at)}</td>
                      <td>{music.musics.map(item=>item.updated_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedArtist(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <AddArtistModal
        show={addArtistShow}
        onHide={AddArtistClose}
        setUpdated={setArtistisUpdated}
        token={token["mytoken"]}
      ></AddArtistModal>
    </div>
    </>
  );

};

export default ManageArtist;
