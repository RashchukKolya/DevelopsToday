import getArrOfComments from '../../api/apiComments';

export const addInfoForComment = data => {
  return {
    type: 'addInfoForComment',
    data,
  };
};

export const addOneComment = data => {
  return {
    type: 'addOneComment',
    data,
  };
};

export const fetchDataComment = () => dispatch => {
  return getArrOfComments()
    .then(data => dispatch(addInfoForComment(data)))
    .catch(err => console.log(err));
};
