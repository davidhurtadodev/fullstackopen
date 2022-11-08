import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateBlogForm } from '../components/CreateBlogForm';

test('the form calls teh event handler with the right data on submit', async () => {
  const mockHandlerSubmit = jest.fn();
  const mockHandlerCreateBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(
    <CreateBlogForm createBlog={mockHandlerCreateBlog} />
  );

  const titleInput = container.querySelector('.title-input');
  const authorInput = container.querySelector('.author-input');
  const urlInput = container.querySelector('.url-input');
  const submitBtn = screen.getByText('Create');

  await user.type(titleInput, 'Testing form');
  await user.type(authorInput, 'Leon');
  await user.type(urlInput, 'www.fa.com');

  await user.click(submitBtn);

  expect(mockHandlerCreateBlog.mock.calls).toHaveLength(1);
  expect(mockHandlerCreateBlog.mock.calls[0][0].title).toBe('Testing form');
  expect(mockHandlerCreateBlog.mock.calls[0][0].author).toBe('Leon');
  expect(mockHandlerCreateBlog.mock.calls[0][0].url).toBe('www.fa.com');
});
