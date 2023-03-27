import React from "react";

const Image = ({ imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt={imageUrl} />
    </div>
  );
};

export default Image;
