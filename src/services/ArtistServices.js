import axios from 'axios';
// artistServices.js

export function getArtistMusics(token,artistid) {
  return axios.get(`http://127.0.0.1:8000/artistmusicapi/${artistid}/`,{
    method: 'GET',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      Authorization: `Token ${token}`,
    }
  })
     .then(response => response.data)
}

export function getArtists(token) {
    return axios.get('http://127.0.0.1:8000/artistapi/',{
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        Authorization: `Token ${token}`,
      }
    })
       .then(response => response.data)
}

export function addArtist(artist,token){
    return axios.post('http://127.0.0.1:8000/artistapi/', {

      id:null,
      name:artist.name.value,
      dob:artist.dob.value,
      gender:artist.gender.value,
      address:artist.address.value,
      first_release_year:artist.first_release_year.value,
      no_of_albums_released:artist.no_of_albums_released.value,
    },{
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        Authorization: `Token ${token}`,

      }
    }
    )
      .then(response=>response.data)
  }


  export function UpdateArtist(artistid, artist, token) {
    console.log('artist',artistid,artist)
    return axios.put(`http://127.0.0.1:8000/artistapi/${artistid}/`, artist, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then(response => response.data);
  }
  
  export function deleteArtist(artistid, token) {
    return axios.delete(`http://127.0.0.1:8000/artistapi/${artistid}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.data);
  }
  