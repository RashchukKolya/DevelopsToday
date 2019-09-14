import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addOneComment } from '../redux/actions/commentsAction';
import CurrentPostVievComponent from '../CurrentPostView/CurrentPostViewComponent';

class CommentsComponent extends Component {
  state = {
    inputComment: '',
    comments:
      this.props.comment.filter(
        el => el.postId === this.props.currentPost.id,
      ) || [],
  };

  handlerChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addComment = async e => {
    e.preventDefault();
    const item = {
      body: this.state.inputComment,
      postId: this.props.currentPost.id,
      id: Math.round(Math.random() * 10000),
    };
    await axios.post('https://simple-blog-api.crew.red/comments', { ...item });
    await this.props.addOneComment(item);
    await this.setState({
      inputComment: '',
      comments:
        this.props.comment.filter(
          el => el.postId === this.props.currentPost.id,
        ) || [],
    });
  };

  render() {
    const { inputComment, comments } = this.state;
    const { addComment, handlerChange } = this;
    return (
      <CurrentPostVievComponent
        addComment={addComment}
        inputComment={inputComment}
        comments={comments}
        handlerChange={handlerChange}
      />
    );
  }
}

function MSTP(state) {
  return {
    comment: state.comment,
    currentPost: state.currentPost,
  };
}

function MDTP(dispatch) {
  return {
    addOneComment(data) {
      dispatch(addOneComment(data));
    },
  };
}

export default connect(
  MSTP,
  MDTP,
)(CommentsComponent);
