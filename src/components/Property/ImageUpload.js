import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImagesChange, existingImages = [] }) => {
  const [images, setImages] = useState(existingImages);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    // Convert files to data URLs for preview
    const newImages = files.map(file => URL.createObjectURL(file));
    
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <div className="upload-header">
        <h4>Property Images</h4>
        <p>Upload photos of your property (max 10 images)</p>
      </div>

      <div className="images-grid">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image} alt={`Property ${index + 1}`} />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => removeImage(index)}
            >
              ×
            </button>
          </div>
        ))}
        
        {images.length < 10 && (
          <div className="upload-area" onClick={triggerFileInput}>
            <div className="upload-icon">📷</div>
            <p>Add Images</p>
            <small>Click to upload</small>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;