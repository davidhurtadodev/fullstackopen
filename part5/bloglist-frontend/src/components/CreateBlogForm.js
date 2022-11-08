import { useState } from 'react';
import PropTypes from 'prop-types';

export const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        title
        <input
          type="text"
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
          value={title}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="Author"
          onChange={(e) => setAuthor(e.target.value)}
          className="author-input"
          value={author}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="Url"
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
          value={url}
        />
      </div>
      <button id="createBlogButton" type="submit">
        Create
      </button>
    </form>
  );
};

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
