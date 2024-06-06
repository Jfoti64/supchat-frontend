import React, { useState } from 'react';
import { uploadProfilePicture } from '../api/api'; // Ensure the correct path to your api module
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 16px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
  font-size: 16px;
`;

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
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="profile-picture">Choose file</Label>
        <Input id="profile-picture" type="file" onChange={onChange} />
      </div>
      <div>
        <Button type="submit">Upload</Button>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Form>
  );
};

export default ProfilePictureUpload;
