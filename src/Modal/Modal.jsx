import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleModal } from '../redux/actions/toggleModalAction';

const StyledOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 180px;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
  }
`;

const StyledButtonDel = styled.button`
  display: block;
  margin-left: auto;
  border: none;
  background: #fff;
`;
const StyledButtonSave = styled.button`
  display: block;
  width: 50px;
  margin: 5px auto;
  border-radius: 5px;
`;
const Modal = ({
  modalToggle,
  handlerChange,
  createPost,
  postTitle,
  postText,
  postAuthor,
  editArticle,
  isEdit,
}) => {
  return (
    <StyledOverlay onDoubleClick={modalToggle}>
      <StyledModal>
        <StyledButtonDel onClick={modalToggle}>X</StyledButtonDel>
        <StyledForm onSubmit={isEdit ? editArticle : createPost}>
          <label>
            Post title:
            <input
              type="text"
              value={postTitle}
              name="postTitle"
              required
              onChange={handlerChange}
            />
          </label>
          <label>
            Post text:
            <input
              type="text"
              value={postText}
              name="postText"
              required
              onChange={handlerChange}
            />
          </label>
          <label>
            Author of post:
            <input
              type="text"
              value={postAuthor}
              name="postAuthor"
              required
              onChange={handlerChange}
            />
          </label>
          <StyledButtonSave type="submit">Save</StyledButtonSave>
        </StyledForm>
      </StyledModal>
    </StyledOverlay>
  );
};

function MDTP(dispatch) {
  return {
    modalToggle() {
      dispatch(toggleModal());
    },
  };
}

export default connect(
  null,
  MDTP,
)(Modal);
