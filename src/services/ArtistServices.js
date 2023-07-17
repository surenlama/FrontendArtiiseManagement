import axios from 'axios';

export function getArtistCSV(token) {
  console.log('hitted');
  return axios
    .get('http://127.0.0.1:8000/artistcsvview/', {
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      responseType: 'blob', // Set the response type to 'blob'
    })
    .then(response => response.data);
}



export function importArtistCSV(token, file) {
  console.log('file', file.name);
  const formData = new FormData();
  formData.append("file", file);

  return axios.post('http://127.0.0.1:8000/csvfile/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`,
    },
  })
  .then(response => response.data)
  
  // .catch(error => {
  //   console.log('error dataa', error);
  //   throw new Error(error.response.data.error);
  // });
}


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
  