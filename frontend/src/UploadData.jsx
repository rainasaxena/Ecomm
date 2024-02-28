import React, { useState } from "react";
import Button from "./components/Button";

const UploadData = () => {


  const [formData, setFormData] = useState({
    cat_id: 'ijh43bf5e455b',
    prod_title: '',
    prod_desc: '',
    prod_image_file: '',
    prod_price: 0,
    prod_old_price: 0,
    prod_specs: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(authTokens.access);
    

    fetch('http://127.0.0.1:8000/create-product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens.access}`,
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };


  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit}>
        <div className="p-8 flex flex-col">
          <label className="font-bold text-left mb-1 mt-2" for="prod_title">
            Product Title
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="prod_title"
            type="text"
            id="prod_title"
            placeholder="Enter product title"
            value={formData.prod_title} onChange={handleChange}
          />

          <label className="font-bold text-left mb-1 mt-2" for="prod_img_file">
            Product Image
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="prod_img_file"
            type="file"
            id="prod_img_file"
            placeholder="Select file"
            value={formData.prod_image_file} onChange={handleChange}
          />

          <label className="font-bold text-left mb-1 mt-2" for="prod_desc">
            Product Description
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="prod_desc"
            type="text"
            id="prod_desc"
            placeholder="Enter product description"
            value={formData.prod_desc} onChange={handleChange}
          />

          <label className="font-bold text-left mb-1 mt-2" for="prod_price">
            Product Price
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="prod_price"
            type="text"
            id="prod_price"
            placeholder="Enter product price"
            value={formData.prod_price} onChange={handleChange}
          />

          <label className="font-bold text-left mb-1 mt-2" for="prod_old_price">
            Product Old Price
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="prod_old_price"
            type="text"
            id="prod_old_price"
            placeholder="Enter product old price"
            value={formData.prod_old_price} onChange={handleChange}
          />

          <label className="font-bold text-left mb-1 mt-2" for="prod_specs">
            Product Specifications
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="prod_specs"
            type="text"
            id="prod_specs"
            placeholder="Enter product specifications"
            value={formData.prod_specs} onChange={handleChange}
          />

          <label className="font-bold text-left mb-1 mt-2" for="cat_id">
            Product Category
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="cat_id"
            type="text"
            id="cat_id"
            placeholder="Enter product category"
            value={formData.cat_id} onChange={handleChange}
          />
          <Button type="submit">Submit Data</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadData;
