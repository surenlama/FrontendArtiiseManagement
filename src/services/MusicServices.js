import axios from 'axios';
// musicServices.js



export function getMusics(token) {
    return axios.get('http://127.0.0.1:8000/musicapi/',{
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        Authorization: `Token ${token}`,
      }
    })
       .then(response => response.data)
}

export function addMusic(music,token){
  console.log('data',music.title.value)
    return axios.post('http://127.0.0.1:8000/musicapi/', {
      
      id:null,
      artist_id:music.artist_id,
      title:music.title,
      album_name:music.album_name,
      genre:music.genre,

      
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


  export function UpdateMusic(musicid, music, token) {
    console.log('music',musicid,music)
    return axios.put(`http://127.0.0.1:8000/musicapi/${musicid}/`, music, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then(response => response.data);
  }
  
  export function deleteMusic(musicid, token) {
    return axios.delete(`http://127.0.0.1:8000/musicapi/${musicid}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.data);
  }
  