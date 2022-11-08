import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

test('render title and author, but not likes and url', () => {
  const blog = {
    title: 'testing blog',
    author: 'David',
    url: 'testurl.com',
  };
  render(<Blog blog={blog} />);

  const title = screen.findByText('testing blog');
  const author = screen.findByText('David');
  const url = screen.queryByText('testurl.com');
  const likes = screen.queryByText('likes');

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test('when clicked view, renders url and likes', async () => {
  const blog = {
    title: 'testing button',
    author: 'David',
    url: 'testurl1.com',
    user: {
      name: 'David',
    },
  };
  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('View');
  await user.click(button);

  const url = screen.getByText('testurl1.com');
  const likes = screen.findByText('likes');

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test('if like button its clicked twice, the event handler its called also twice', async () => {
  const blog = {
    title: 'testing button',
    author: 'David',
    url: 'testurl1.com',
    user: {
      name: 'David',
    },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} addLike={mockHandler} />);

  const buttonView = screen.getByText('View');

  const user = userEvent.setup();
  await user.click(buttonView);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
