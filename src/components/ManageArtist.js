import React, { useEffect, useState } from "react";
import { Table, Form, Modal } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import saveAs from "file-saver";
import {
  deleteArtist,
  getArtists,
  getArtistMusics,
  importArtistCSV,
  getArtistCSV
} from "../services/ArtistServices";
import AddArtistModal from "./AddArtistModal";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useCookies } from "react-cookie";
import UpdateArtistModal from "./UpdateArtistModal";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";


const ManageArtist = () => {
  const [error,setError] = useState("");
  const [artists, setArtists] = useState([]);
  const [addArtistShow, setAddArtistShow] = useState(false);
  const [editArtistShow, setEditArtistShow] = useState(false);
  const [editArtist, setEditArtist] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistMusics, setArtistMusics] = useState([]);
  const [isArtistUpdated, setArtistisUpdated] = useState(false);
  const [token, setToken] = useCookies(["mytoken"]);
  const [totalResult, setTotalResults] = useState(0);
  const [importFile, setImportFile] = useState(null); 
  const baseUrl = 'http://127.0.0.1:8000'

  useEffect(() => {
    let mounted = true;
    if (artists.length && !isArtistUpdated) {
      return;
    }
 
    fetchData(baseUrl + '/artistapi', token['mytoken']);

    return () => {
      mounted = false;
      setArtistisUpdated(false);
    };
  }, [isArtistUpdated, artists, token]);

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
        const artists = data.results;
        if (artists) {
          setArtists(artists);
          setTotalResults(data.count);
        } else {
          setArtists([]);
          setTotalResults(0);
        }
      }).catch((error) => {
        alert("Page not found", error);
      });
  }
   
  const handleAdd = (e) => {
    e.preventDefault();
    setAddArtistShow(true);
  };

  const handleUpdate = (e, usr) => {
    console.log("usr", usr);
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

  const handleUpload = (event) => {
    event.preventDefault();
    if (importFile) {
      console.log('importFile',importFile)
      importArtistCSV(token["mytoken"], importFile)
        .then((result) => {
          console.log('result',result)
          alert(result);
          setArtistisUpdated(true);
        })
        .catch(error => {
          console.log('import error',error.response.data.file[0])
          let errorMessage = 'An error occurred User Adding.';
        
          if (error.response && error.response.data) {
            if (error.response.data.file) {
              errorMessage = error.response.data.file[0]; 
            } 
           
          }
          setError(errorMessage); 
        });
    }
  };
// ManageArtist.js

const handleGenerateCsv = () => {
  getArtistCSV(token["mytoken"])
    .then((data) => {
      // Save the response data to a file.
      const csvFile = new File([data], "artists.csv");
      saveAs(csvFile, "artists.csv");
    })
    .catch((error) => {
      console.log("Failed to generate CSV file:", error);
    });
};


  let AddArtistClose = () => setAddArtistShow(false);
  let EditArtistClose = () => setEditArtistShow(false);

  function changeUrl(baseurl){
    fetchData(baseurl, token['mytoken']);  }
  var links =[];
  for(let i=1;i<=Math.ceil(totalResult/5);i++){
    links.push(<li class="page-item"><Link onClick={()=>changeUrl(baseUrl+`/artistapi/?page=${i}`)} to={`/artistmanage/?page=${i}`} class="page-link">{i}</Link></li>)
  }
  
  return (
    <>
      <Navigation />
      <div className="row side-row">
      <p className='text-danger'>{error}</p>

  <form
    method="post"
    enctype="multipart/form-data"
  >
    <label for="file"></label>
    <input
    className="form-control"
      type="file"
      id="file"
      name="file"
      onChange={(e) => setImportFile(e.target.files[0])}
      style={{ width: "350px" }}
    />
    <div style={{display: 'flex', justifyContent: 'space-between', margin: '16px 0px'}}>
    <Button
      variant="success"
      type="submit"
      style={{ width: "100px" }}
      onClick={handleUpload}
    >
      Import
    </Button>
 
    </div>
  </form>
  
  <Button
    variant="success"
    type="submit"
    style={{
      width: "100px",
      marginLeft: "820px",
      marginBottom: "10px",
    }}
    onClick={handleGenerateCsv}
  >
    Export
  </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>First Release Year</th>
              <th>No. of Albums</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th style={{ width: '400px',textAlign: 'center' }}>Action</th>

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
                <td>
                  <span style={{width: '300px'}}>
                  <Button
                    className="mr-2"
                    variant="danger"
                    style={{marginTop: '10px'}}
                    onClick={(event) => handleDelete(event, artist.id)}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                  {/* <span>&nbsp;&nbsp;</span> */}

                  <Button
                    className="mr-2"
                    variant="primary"
                    style={{marginTop: '10px'}}
                    onClick={(event) => handleUpdate(event, artist)}
                  >
                    <FaEdit />
                  </Button>
                  {/* <span>&nbsp;&nbsp;</span> */}

                  <Button
                    className="mr-2"
                    variant="primary"
                    style={{marginTop: '10px'}}
                    onClick={(event) => handleViewMusics(event, artist)}
                  >
                    <BsMusicNoteBeamed />
                  </Button>
                  <UpdateArtistModal
                    show={editArtistShow}
                    onHide={EditArtistClose}
                    artist={editArtist}
                    setUpdated={setArtistisUpdated}
                    token={token["mytoken"]} // Pass the token here
                  ></UpdateArtistModal>
                  </span>
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
     
        <nav aria-label="Page navigation example mt-5">
  <ul className="pagination justify-content-center">
            {links}

  </ul>
</nav>
        <Modal
          show={selectedArtist !== null}
          onHide={() => setSelectedArtist(null)}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Musics List</Modal.Title>
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
                        <td>{music.musics.map((item) => item.id)}</td>
                        <td>{music.musics.map((item) => item.title)}</td>
                        <td>{music.musics.map((item) => item.album_name)}</td>
                        <td>{music.musics.map((item) => item.genre)}</td>
                        <td>{music.musics.map((item) => item.created_at)}</td>
                        <td>{music.musics.map((item) => item.updated_at)}</td>
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
