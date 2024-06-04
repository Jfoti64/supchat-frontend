import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUser, updateUser } from '../api/api';
import Button from '../components/Button';

const ProfilePage = () => {
  const [formData, setFormData] = useState({ first_name: '', family_name: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Decode the token to get the user ID and check expiration
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
      setLoading(true); // Ensure loading state is set
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="family_name"
        value={formData.family_name}
        onChange={handleChange}
        placeholder="Family Name"
      />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
      <Button $primary type="submit">
        Update Profile
      </Button>
    </form>
  );
};

export default ProfilePage;
