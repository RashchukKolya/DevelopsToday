import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: #000;
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
const StyledCurrentPost = styled.div`
  display: block;
  width: 400px;
  margin: auto;
  h2,
  h3,
  h5,
  p,
  li {
    text-align: center;
    padding: 10px 0;
  }
`;
const StyledInput = styled.input`
  display: block;
  width: 200px;
  margin: 0 auto 10px;
`;

const CurrentPostViewComponent = ({
  currentPost,
  comments,
  addComment,
  inputComment,
  handlerChange,
}) => {
  return (
    <div>
      <StyledHeader>
        <StyledButton>
          <NavLink to="DevelopsToday/">To all posts</NavLink>
        </StyledButton>
      </StyledHeader>
      <StyledCurrentPost>
        <h3>Author: {currentPost.author}</h3>
        <h5>{currentPost.date}</h5>
        <h2>{currentPost.title}</h2>
        <p>{currentPost.body}</p>
        <h3>Comments</h3>
        <ul>
          {comments.map(el => (
            <li key={el.id}>{el.body}</li>
          ))}
        </ul>
        <form onSubmit={addComment}>
          <StyledInput
            type="text"
            name="inputComment"
            value={inputComment}
            onChange={handlerChange}
            required
          />
          <StyledButton type="submit">Add comment</StyledButton>
        </form>
      </StyledCurrentPost>
    </div>
  );
};

function MSTP(state) {
  return {
    currentPost: state.currentPost,
  };
}

export default connect(
  MSTP,
  null,
)(CurrentPostViewComponent);
