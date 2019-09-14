import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { toggleModal } from '../redux/actions/toggleModalAction';

const StyledHeader = styled.div`
  background: #000;
  padding: 20px;
`;
const StyledButton = styled.button`
  display: block;
  width: 100px;
  height: 20px;
  margin: auto;
  border: 1px solid black;
  background: #fff;
  border-radius: 5px;
`;
const StyledCover = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;
const StyledItem = styled.div`
  width: 300px;
  background: #ccc;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  h3,
  h5,
  p {
    text-align: center;
    margin-bottom: 10px;
  }
`;
const StyledBtnCover = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledBtn = styled.button`
  display: block;
  border: 1px solid black;
  padding: 5px;
  border-radius: 100%;
  background-color: #fff;
`;

const AllPostsViewComponents = ({
  posts,
  modalToggle,
  deletePost,
  openCurrentPost,
  showPostInfoInModal,
  currentPost,
}) => {
  return (
    <div>
      <StyledHeader>
        <StyledButton onClick={modalToggle}>Add new post</StyledButton>
      </StyledHeader>
      <StyledCover>
        {posts.map(el => (
          <StyledItem key={el.id}>
            <StyledBtnCover>
              <StyledBtn id={el.id} onClick={showPostInfoInModal}>
                Edit
              </StyledBtn>
              <StyledBtn id={el.id} onClick={deletePost}>
                X
              </StyledBtn>
            </StyledBtnCover>
            <h3>Author: {el.author}</h3>
            <h3>{el.title}</h3>
            <p>{el.body}</p>
            <p>{el.date}</p>
            <StyledButton>
              <NavLink
                to={`DevelopsToday/posts/:${currentPost.id}`}
                id={el.id}
                onClick={openCurrentPost}
              >
                Open post
              </NavLink>
            </StyledButton>
          </StyledItem>
        ))}
      </StyledCover>
    </div>
  );
};

function MSTP(state) {
  return {
    posts: state.post,
    currentPost: state.currentPost,
  };
}

function MDTP(dispatch) {
  return {
    modalToggle() {
      dispatch(toggleModal());
    },
  };
}

export default connect(
  MSTP,
  MDTP,
)(AllPostsViewComponents);
