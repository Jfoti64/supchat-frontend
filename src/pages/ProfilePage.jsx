import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUser, updateUser, getProfilePictureUrl } from '../api/api';
import Button from '../components/Button';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import ProfilePicture from '../components/ProfilePicture';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  height: 100vh;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
`;

const Title = styled.h3`
  margin-top: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  color: red;
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    family_name: '',
    bio: '',
    profile_picture: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;
  const isTokenExpired = decodedToken ? decodedToken.exp * 1000 < Date.now() : true;

  useEffect(() => {
    if (isTokenExpired) {
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getUser(userId, token);
        if (response && response.data) {
          setFormData(response.data);
        } else {
          setError('Error fetching user data');
          console.error('Error fetching user data:', response);
        }
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, userId, isTokenExpired, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ ...formData, id: userId }, token);
      console.log('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <ProfileContainer>
      <ProfileForm onSubmit={handleSubmit}>
        <Input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <Input
          name="family_name"
          value={formData.family_name}
          onChange={handleChange}
          placeholder="Family Name"
        />
        <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
        <Button $primary type="submit">
          Update Profile
        </Button>
      </ProfileForm>
      <ProfilePictureUpload userId={userId} />
      {formData.profile_picture && (
        <ProfilePictureContainer>
          <Title>Profile Picture</Title>
          <ProfilePicture src={getProfilePictureUrl(formData.profile_picture)} size={'125px'} alt="Profile" />
        </ProfilePictureContainer>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;
