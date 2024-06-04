import React, { useState } from 'react';
import { uploadProfilePicture } from '../api/api'; // Ensure the correct path to your api module

const ProfilePictureUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profile_picture', file);

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      setError('You must be logged in to upload a profile picture.');
      return;
    }

    try {
      const res = await uploadProfilePicture(userId, formData, token);
      setSuccess('Profile picture uploaded successfully.');
      console.log(res.data);
    } catch (err) {
      setError('Error uploading profile picture: ' + err.message);
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="file" onChange={onChange} />
      </div>
      <div>
        <button type="submit">Upload</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
};

export default ProfilePictureUpload;
