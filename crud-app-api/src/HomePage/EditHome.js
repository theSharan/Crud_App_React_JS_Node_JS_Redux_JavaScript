import React from 'react';

const EditHome = ({posts, handleEditPostForm, handlePostDelete}) => {
  return (
    <>
      {posts.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.body}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={(e)=>handleEditPostForm(e,item)}
            >
              Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={()=>handlePostDelete(item.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default EditHome;
