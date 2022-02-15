import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditHome from './EditHome';
// import { Toast } from 'bootstrap';
import { Toast } from 'bootstrap/dist/js/bootstrap.esm.min.js'


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({
    id: "",
    userId: "",
    title: "",
    body: "",
  });
  const [message, setMessage] = useState("");

  //   get ID
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    Array.from(document.querySelectorAll(".toast")).forEach(
      (toastNode) => new Toast(toastNode)
    );
  });

  // edit data formValues
  const handleEditChange = (e) => {
    e.preventDefault();
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  // edit modal data
  const handleEditPostForm = (e, post) => {
    e.preventDefault();
    console.log(post);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then((res) => setEditPost(res.data))
      .catch((err) => console.log(err));

    setEditPostId(post.userId);
    const formValues = {
      id: posts.title,
      name: posts.body,
    };
    setEditFormData(formValues);
  };

  console.log(editPost, "Edit Form data");

  // sava form data
  const handleFormSave = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/${editPost.id}`,
        editPost
      )
      .then((res) => console.log(res.data, "save"))
      .catch((err) => console.log(err));

    console.log("posts", posts);
    const savePost = {
      id: editPost.id,
      title: editPost.title,
      body: editPost.body,
    };
    const updatedPosts = [...posts];
    const postIndex = posts.findIndex((post) => post.id === editPost.id);
    updatedPosts[postIndex] = savePost;
    setPosts(updatedPosts);
    setEditPostId(null);
    console.log(editPostId);
    document.getElementById("clos").click();
    document.getElementById("liveToastBtn").click();
    setMessage("User is Updated Successfully");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // handlePostDelete

  const handlePostDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = [...posts];
    const updatedPost = post.filter((post) => post.id !== id);
    setPosts(updatedPost);
    setMessage("User is deleted successfully");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  console.log(message, "message");

  const fetchurl = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(fetchurl);
      setPosts(data.data);
    }
    fetchData();
  }, [fetchurl]);

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <EditHome
            posts={posts}
            handleEditPostForm={handleEditPostForm}
            handlePostDelete={handlePostDelete}
          />
        </tbody>
      </table>
      <form onSubmit={handleFormSave}>
        <div className="modal" id="exampleModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"></h5>
                <button
                  type="button"
                  id="clos"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="exampleInputId">id</label>
                  <input
                    name="id"
                    type="text"
                    id="exampleInputId"
                    className="form-control"
                    value={editPost.id}
                    onChange={(e) => handleEditChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputId">Title</label>
                  <input
                    name="title"
                    type="text"
                    id="exampleInputTitle"
                    className="form-control"
                    value={editPost.title}
                    onChange={(e) => handleEditChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleinputname">Body</label>
                  <input
                    name="body"
                    type="text"
                    id="exampleInputId"
                    className="form-control"
                    value={editPost.body}
                    onChange={(e) => handleEditChange(e)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-primary d-none"
        id="liveToastBtn"
      >
        Show live toast
      </button>
      {message && (
        <div className="App p-5">
          <div
            class="toast show bg-light"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ position: "fixed", top: "80px", left: "76%" }}
          >
            <div class="toast-body">
              <p style={{ color: "green" }}>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

