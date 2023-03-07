import axios from 'axios';

export default axios.create({
  baseURL: 'https://restaurants162.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '2b63cb427cmshf12c83d90898c38p1ec0cejsna50a069c33ef',
    'X-RapidAPI-Host': 'restaurants162.p.rapidapi.com'
  }

});