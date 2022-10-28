const dummy = (blogs) => {
  if (Array.isArray(blogs)) return 1;
  return -1;
};

const totalLikes = (blogs) =>
  blogs.reduce((previous, current) => previous + current.likes, 0);

const favoriteBlog = (blogs) => {
  const maxValue = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes === maxValue);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
