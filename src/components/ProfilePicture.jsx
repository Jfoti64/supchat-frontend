import React from 'react';
import styled from 'styled-components';

const RoundImage = styled.img`
  width: ${(props) => props.size || '45px'};
  height: ${(props) => props.size || '45px'};
  border-radius: 50%;
  object-fit: cover;
  border: ${(props) => props.border || '2px solid #ddd'};
  aspect-ratio: 1; /* Maintain a 1:1 aspect ratio */
`;

const ProfilePicture = ({ src, alt, size, border }) => {
  return <RoundImage src={src} alt={alt} size={size} border={border} />;
};

export default ProfilePicture;
