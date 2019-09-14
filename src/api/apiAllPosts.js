import axios from 'axios';

export default function getArrOfPosts() {
  return axios
    .get('https://simple-blog-api.crew.red/posts')
    .then(arrOfData => arrOfData.data)
    .catch(err => console.log(err));
}
