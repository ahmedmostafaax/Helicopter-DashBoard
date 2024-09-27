import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap'; 

const Category = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [show, setShow] = useState(false); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://project-model.onrender.com/api/v1/categories", {
        headers: { token: token },
      });
      const fetchedCategories = response.data.categories || response.data;

      if (Array.isArray(fetchedCategories)) {
        setCategories(fetchedCategories);
      } else {
        setError("Unexpected data format received from API.");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Error fetching categories.");
    }
  };

  const showMessage = (type, message) => {
    if (type === "success") {
      setSuccess(message);
      setError("");
    } else {
      setError(message);
      setSuccess("");
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post("https://project-model.onrender.com/api/v1/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      showMessage("success", "Category added successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      showMessage("error", "Error adding category.");
    }
  };

  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setImage(null);
    setShow(true); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`https://project-model.onrender.com/api/v1/categories/${selectedCategory._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      showMessage("success", "Category updated successfully!");
      fetchCategories();
      setShow(false); 
    } catch (err) {
      console.error("Error updating category:", err);
      showMessage("error", "Error updating category.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://project-model.onrender.com/api/v1/categories/${id}`, {
        headers: { token: token },
      });
      showMessage("success", "Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      showMessage("error", "Error deleting category.");
    }
  };

  return (
    <div className="container">
      <h1 className="py-2">Manage Categories</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label className="my-1" htmlFor="name">Category Name</label>
          <input
            type="text"
            className="form-control py-2"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="my-1" htmlFor="image">Category Image</label>
          <input
            type="file"
            className="form-control py-2"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-success my-2">Add Category</button>
      </form>

      <h2>Existing Categories</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>
                  <button className="btn btn-warning m-2" onClick={() => openUpdateModal(category)}>
                    Update
                  </button>
                  <button className="btn btn-danger m-2" onClick={() => handleDelete(category._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No categories available</td>
            </tr>
          )}
        </tbody>
      </table>

      
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="updateName">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="updateName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateImage">Category Image (optional)</label>
              <input
                type="file"
                className="form-control"
                id="updateImage"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-success mt-2">Update Category</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Category;
