import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { deleteMusic, getMusics } from "../services/MusicServices";
import AddMusicModal from "./AddMusicModal";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCookies } from "react-cookie";
import UpdateMusicModal from "./UpdateMusicModal";
import Navigation from './Navigation'

const ManageMusic = () => {
  const [musics, setMusics] = useState([]);
  const [addMusicShow, setAddMusicShow] = useState(false);
  const [editMusicShow, setEditMusicShow] = useState(false);
  const [editMusic, setEditMusic] = useState({});
  const [isMusicUpdated, setMusicisUpdated] = useState(false);
  const [token, setToken] = useCookies(["mytoken"]);

  useEffect(() => {
    let mounted = true;
    if (musics.length && !isMusicUpdated) {
      return;
    }
    getMusics(token["mytoken"])
      .then((data) => {
        console.log("Musics data:", data.results.artist_id);
        if (mounted) {
          setMusics(data.results);
        }
      })
      .catch((error) => {
        console.log("Failed to fetch Musics:", error);
      });
    return () => {
      mounted = false;
      setMusicisUpdated(false);
    };
  }, [isMusicUpdated, musics, token]);

  const handleAdd = (e) => {
    e.preventDefault();
    setAddMusicShow(true);
  };

  const handleUpdate = (e, music) => {
    e.preventDefault();
    setEditMusicShow(true);
    setEditMusic(music);
  };

  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      deleteMusic(id, token["mytoken"])
        .then((result) => {
          alert(result);
          setMusicisUpdated(true);
        })
        .catch((error) => {
          alert("Failed to Delete Music");
        });
    }
  };

  let AddMusicClose = () => setAddMusicShow(false);
  let EditMusicClose = () => setEditMusicShow(false);

  return (
    <>
    <Navigation />
    <div className="row side-row">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Artist Id</th>
            <th>Title</th>
            <th>Album Name</th>
            <th>Genre</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(musics) && musics.length > 0 ? (
            musics.map((music) => (
              <tr key={music.id}>
                <td>{music.id}</td>
                <td>{music.artist_id}</td>
                <td>{music.title}</td>
                <td>{music.album_name}</td>
                <td>{music.genre}</td>
                <td>{music.created_at}</td>
                <td>{music.updated_at}</td>
                <td>
                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={(event) => handleDelete(event, music.id)}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                  <Button
                    className="mr-2"
                    variant="primary"
                    onClick={(event) => handleUpdate(event, music)}
                  >
                    <FaEdit />
                  </Button>
                  <UpdateMusicModal
                    show={editMusicShow}
                    onHide={EditMusicClose}
                    music={editMusic}
                    setUpdated={setMusicisUpdated}
                    token={token["mytoken"]} // Pass the token here
                  ></UpdateMusicModal>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No music available</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant="success" onClick={handleAdd}>
          Add Music
        </Button>{" "}
      </ButtonToolbar>
      <AddMusicModal
        show={addMusicShow}
        onHide={AddMusicClose}
        setUpdated={setMusicisUpdated}
        token={token["mytoken"]}
      ></AddMusicModal>
    </div>
    </>
  );
};

export default ManageMusic;
