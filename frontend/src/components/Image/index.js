import React from 'react'

const Image = ({id}) => {
    const imageSrc = `http://localhost:5000/image_src/${id}`;

  return (
    <div>
      <img src={imageSrc} alt="Image from Database" />
    </div>
  )

}
export default Image