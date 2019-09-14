import getArrOfPosts from '../../api/apiAllPosts';

export const addInfoForPost = data => {
  return {
    type: 'addInfoForPost',
    data,
  };
};

export const fetchData = () => dispatch => {
  return getArrOfPosts()
    .then(data => dispatch(addInfoForPost(data)))
    .catch(err => console.log(err));
};
