import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePictureUpload from './ProfilePictureUpload';
import { uploadProfilePicture } from '../api/api';

// Mock the uploadProfilePicture API call
jest.mock('../api/api', () => ({
  uploadProfilePicture: jest.fn(),
}));

describe('ProfilePictureUpload', () => {
  const mockUserId = 'testUserId';
  const mockToken = 'mockToken';

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', mockToken);
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  test('renders upload form', () => {
    render(<ProfilePictureUpload userId={mockUserId} />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  test('displays error if no file is selected', async () => {
    render(<ProfilePictureUpload userId={mockUserId} />);

    fireEvent.submit(screen.getByText('Upload'));

    await waitFor(() => {
      expect(screen.getByText('Please select a file to upload.')).toBeInTheDocument();
    });
  });

  test('uploads file successfully', async () => {
    const mockResponse = { data: { message: 'Profile picture uploaded successfully' } };
    uploadProfilePicture.mockResolvedValue(mockResponse);

    render(<ProfilePictureUpload userId={mockUserId} />);

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    fireEvent.change(screen.getByLabelText(/choose file/i), {
      target: { files: [file] },
    });
    fireEvent.submit(screen.getByText('Upload'));

    await waitFor(() => {
      expect(uploadProfilePicture).toHaveBeenCalledWith(
        mockUserId,
        expect.any(FormData),
        mockToken
      );
      expect(screen.getByText('Profile picture uploaded successfully.')).toBeInTheDocument();
    });
  });

  test('displays error if upload fails', async () => {
    const mockError = new Error('Upload failed');
    uploadProfilePicture.mockRejectedValue(mockError);

    render(<ProfilePictureUpload userId={mockUserId} />);

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    fireEvent.change(screen.getByLabelText(/choose file/i), {
      target: { files: [file] },
    });
    fireEvent.submit(screen.getByText('Upload'));

    await waitFor(() => {
      expect(uploadProfilePicture).toHaveBeenCalledWith(
        mockUserId,
        expect.any(FormData),
        mockToken
      );
      expect(
        screen.getByText('Error uploading profile picture: Upload failed')
      ).toBeInTheDocument();
    });
  });
});
