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
import { Link } from "react-router-dom";


const ManageMusic = () => {
  const [musics, setMusics] = useState([]);
  const [addMusicShow, setAddMusicShow] = useState(false);
  const [editMusicShow, setEditMusicShow] = useState(false);
  const [editMusic, setEditMusic] = useState({});
  const [isMusicUpdated, setMusicisUpdated] = useState(false);
  const [token, setToken] = useCookies(["mytoken"]);
  const [totalResult, setTotalResults] = useState(0);
  const baseUrl = 'http://127.0.0.1:8000'


  useEffect(() => {
    let mounted = true;
    if (musics.length && !isMusicUpdated) {
      return;
    }
 
    fetchData(baseUrl + '/musicapi', token['mytoken']);

    return () => {
      mounted = false;
      setMusicisUpdated(false);
    };
  }, [isMusicUpdated, musics, token]);

  function fetchData(baseurl, token) {
    fetch(baseurl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        const musics = data.results;
        if (musics) {
          setMusics(musics);
          setTotalResults(data.count);
        } else {
          setMusics([]);
          setTotalResults(0);
        }
      }).catch((error) => {
        alert("Page not found", error);
      });
  }



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

  function changeUrl(baseurl){
    fetchData(baseurl, token['mytoken']);  }
  var links =[];
  for(let i=1;i<=Math.ceil(totalResult/5);i++){
    links.push(<li class="page-item"><Link onClick={()=>changeUrl(baseUrl+`/musicapi/?page=${i}`)} to={`/musicmanage/?page=${i}`} class="page-link">{i}</Link></li>)
  }

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
      <nav aria-label="Page navigation example mt-5">
  <ul className="pagination justify-content-center">
            {links}

  </ul>
</nav>



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
