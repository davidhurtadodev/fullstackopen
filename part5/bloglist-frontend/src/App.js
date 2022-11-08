import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import { Notification } from './Notification';
import { CreateBlogForm } from './components/CreateBlogForm';
import { Tooglable } from './components/Toogglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const orderedBlogs = blogs.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        }
        if (a.likes < b.likes) {
          return 1;
        }
        return 0;
      });
      setBlogs(orderedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
  };

  const handleBlogSubmit = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create({ title, author, url });

      setBlogs([...blogs, createdBlog]);
      setError(null);
      setNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} created`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      console.error(err);
      setNotification(null);
      setError('Wrong request');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleAddLike = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id);
      const modifiedBlog = { ...blog, likes: blog.likes + 1 };
      const returnedBlog = await blogService.addLike(id, modifiedBlog);

      const newBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : { ...returnedBlog, user: blog.user }
      );
      const orderedBlogs = newBlogs.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        }
        if (a.likes < b.likes) {
          return 1;
        }
        return 0;
      });
      setBlogs(orderedBlogs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      // blogService.setToken(user.token);
      const response = await blogService.deleteBlog(blog);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);

      setError(null);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setError('wrong username or password');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  if (!user) {
    return (
      <form id="loginForm" onSubmit={(e) => handleLogin(e)}>
        {error && <Notification error={error} notification={notification} />}
        <div>
          username
          <input
            type="text"
            name="Username"
            id="userInput"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }

  return (
    <div className="app">
      {(error || notification) && (
        <Notification error={error} notification={notification} />
      )}
      <h2>blogs</h2>
      <p>{`${user.username}`} logged in</p>
      <button type="button" onClick={(e) => handleLogout(e)}>
        logout
      </button>
      <Tooglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm createBlog={handleBlogSubmit} />
      </Tooglable>

      {blogs.map((blog) => (
        <div className="blog">
          <Blog
            handleAddLike={handleAddLike}
            deleteBlog={handleDelete}
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </div>
      ))}
    </div>
  );
};

export default App;
