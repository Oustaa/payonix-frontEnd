import React, { useState } from "react";
import axios from "axios";
import Image from "./components/Image";

function App() {
  const [file, setFile] = useState(null);
  const [rmt_base, setRmt_base] = useState("");
  const [p_name, setP_name] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        `http://localhost:8000/products/variety/${rmt_base}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            pv_description: p_name,
          },
        }
      );
      console.log(response);
      // setImages([...images, response.data.image_url]);
    } catch (error) {
      console.log(error);
    }
    // setImages([...images, respons.data.image_url]);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setRmt_base(e.target.value)} />
        <input type="text" onChange={(e) => setP_name(e.target.value)} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {images.map((imageUrl, i) => (
        <Image key={i} imageUrl={imageUrl} />
      ))}
      <img
        src="http://localhost:8000/images/1679658589386-20210320_213223.png"
        alt="Kawasaki Z1000"
      />
    </div>
  );
}

export default App;
