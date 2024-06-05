// src/components/NewChatForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewChatForm from './NewChatForm';

describe('NewChatForm', () => {
  const handleCreateNewChat = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form when displayNewChatForm is true', () => {
    render(<NewChatForm displayNewChatForm={true} handleCreateNewChat={handleCreateNewChat} />);

    expect(screen.getByLabelText('Enter Username:')).toBeInTheDocument();
    expect(screen.getByText('Create Chat')).toBeInTheDocument();
  });

  test('does not render the form when displayNewChatForm is false', () => {
    render(<NewChatForm displayNewChatForm={false} handleCreateNewChat={handleCreateNewChat} />);

    expect(screen.queryByLabelText('Enter Username:')).not.toBeInTheDocument();
    expect(screen.queryByText('Create Chat')).not.toBeInTheDocument();
  });

  test('calls handleCreateNewChat with the correct username on form submit', () => {
    render(<NewChatForm displayNewChatForm={true} handleCreateNewChat={handleCreateNewChat} />);

    const input = screen.getByLabelText('Enter Username:');
    const submitButton = screen.getByText('Create Chat');

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);

    expect(handleCreateNewChat).toHaveBeenCalledWith('testuser');
  });

  test('clears the input after form submit', () => {
    render(<NewChatForm displayNewChatForm={true} handleCreateNewChat={handleCreateNewChat} />);

    const input = screen.getByLabelText('Enter Username:');
    const submitButton = screen.getByText('Create Chat');

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);

    expect(input.value).toBe('');
  });

  test('updates the input value when user types', () => {
    render(<NewChatForm displayNewChatForm={true} handleCreateNewChat={handleCreateNewChat} />);

    const input = screen.getByLabelText('Enter Username:');

    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(input.value).toBe('testuser');
  });
});
