import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const Product = () => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [imgCover, setImgCover] = useState(null);
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://project-model.onrender.com/api/v1/categories", {
        headers: { token: token },
      });
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("priceAfterDiscount", priceAfterDiscount);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    if (imgCover) formData.append("imgCover", imgCover);
    if (images.length > 0) {
      for (let img of images) {
        formData.append("images", img);
      }
    }

    try {
      await axios.post("https://project-model.onrender.com/api/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error("Error adding product.");
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="py-2">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-4">
       
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceAfterDiscount">Price After Discount</label>
          <input
            type="number"
            className="form-control"
            id="priceAfterDiscount"
            value={priceAfterDiscount}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Select Category</label>
          <select
            className="form-control"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imgCover">Cover Image</label>
          <input
            type="file"
            className="form-control"
            id="imgCover"
            onChange={(e) => setImgCover(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="images"> Images</label>
          <input
            type="file"
            className="form-control"
            id="images"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>
        <button type="submit" className="btn btn-success my-2">Add Product</button>
      </form>

      <button 
        className="btn btn-primary my-1" 
        onClick={() => navigate('/updateProduct')} 
      >
       Update Product
      </button>
    </div>
  );
};

export default Product;
