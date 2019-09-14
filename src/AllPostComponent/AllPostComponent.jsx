import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { fetchData } from '../redux/actions/postAction';
import { fetchDataComment } from '../redux/actions/commentsAction';
import { selectCurrentPost } from '../redux/actions/currentPostAction';
import { toggleModal } from '../redux/actions/toggleModalAction';
import Modal from '../Modal/Modal';
import AllPostsViewComponents from '../AllPostsViewComponents/AllPostsViewComponents';

class AllPostComponent extends Component {
  state = {
    postTitle: '',
    postText: '',
    postAuthor: '',
    postDate: moment().format('LLL'),
    isEdit: false,
    editId: '',
  };

  componentDidMount = () => {
    this.props.fetchData();
    this.props.fetchDataComment();
  };

  handlerChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createPost = async e => {
    e.preventDefault();
    const item = {
      title: this.state.postTitle,
      body: this.state.postText,
      author: this.state.postAuthor,
      id: Math.round(Math.random() * 10000),
      date: this.state.postDate,
    };
    await this.setState({
      postTitle: '',
      postText: '',
      postAuthor: '',
    });
    await axios.post('https://simple-blog-api.crew.red/posts', { ...item });
    this.props.toggleModal();
    this.props.fetchData();
  };

  deletePost = async e => {
    const { id } = e.target;
    await axios.delete(`https://simple-blog-api.crew.red/posts/${id}`);
    this.props.fetchData();
  };

  showPostInfoInModal = async e => {
    const { id } = e.target;
    const editPostObj = this.props.posts.find(el => el.id === Number(id));
    await this.setState({
      postTitle: editPostObj.title,
      postText: editPostObj.body,
      postAuthor: editPostObj.author,
      postDate: editPostObj.date,
      isEdit: true,
      editId: id,
    });
    this.props.toggleModal();
  };

  editArticle = async e => {
    e.preventDefault();
    const id = this.state.editId;
    const item = {
      title: this.state.postTitle,
      body: this.state.postText,
      author: this.state.postAuthor,
      date: this.state.postDate,
      id,
    };
    await this.setState({
      postTitle: '',
      postText: '',
      postAuthor: '',
      isEdit: false,
      editId: '',
    });
    await axios.put(`https://simple-blog-api.crew.red/posts/${id}`, {
      ...item,
    });
    await this.props.fetchData();
    this.props.toggleModal();
  };

  openCurrentPost = e => {
    const id = Number(e.target.id);
    const currentPost = this.props.posts.find(el => el.id === id);
    this.props.selectCurrentPost(currentPost);
  };

  render() {
    const {
      deletePost,
      openCurrentPost,
      editArticle,
      showPostInfoInModal,
      handlerChange,
      createPost,
    } = this;
    const { postTitle, postText, postAuthor, isEdit } = this.state;
    const { showModal } = this.props;
    return (
      <div>
        {showModal && (
          <Modal
            handlerChange={handlerChange}
            createPost={createPost}
            postTitle={postTitle}
            postText={postText}
            postAuthor={postAuthor}
            editArticle={editArticle}
            isEdit={isEdit}
          />
        )}
        <AllPostsViewComponents
          deletePost={deletePost}
          openCurrentPost={openCurrentPost}
          showPostInfoInModal={showPostInfoInModal}
        />
      </div>
    );
  }
}

function MSTP(state) {
  return {
    posts: state.post,
    showModal: state.showModal,
  };
}

function MDTP(dispatch) {
  return {
    fetchData() {
      dispatch(fetchData());
    },
    fetchDataComment() {
      dispatch(fetchDataComment());
    },
    selectCurrentPost(data) {
      dispatch(selectCurrentPost(data));
    },
    toggleModal() {
      dispatch(toggleModal());
    },
  };
}
export default connect(
  MSTP,
  MDTP,
)(AllPostComponent);
