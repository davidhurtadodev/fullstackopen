import { useState } from 'react';
const Blog = ({ blog, deleteBlog, blogs, setBlogs, handleAddLike }) => {
  const [visibleData, setVisibleData] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handlerDeleteButton = async () => {
    const deletedBlog = await deleteBlog(blog);

    const filteredBlogs = blogs.filter(
      (blogToFilter) => blogToFilter.id !== blog.id
    );
    setBlogs(filteredBlogs);
  };
  if (!visibleData) {
    return (
      <div style={{ border: 'solid 1px', marginBottom: '20px' }}>
        {blog.title} {blog.author}
        <button
          className="view-button"
          type="button"
          onClick={() => setVisibleData(!visibleData)}
        >
          View
        </button>
      </div>
    );
  }
  return (
    <div style={{ border: 'solid 1px', marginBottom: '20px' }}>
      {blog.title} {blog.author}
      <button type="button" onClick={() => setVisibleData(!visibleData)}>
        hide
      </button>
      <div>{blog.url}</div>
      <div>
        likes <span id="likeValue">{blog.likes}</span>
        <button type="button" onClick={() => handleAddLike(blog.id)}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      <button type="button" onClick={() => handlerDeleteButton(blog.id)}>
        Delete
      </button>
    </div>
  );
};

export default Blog;
