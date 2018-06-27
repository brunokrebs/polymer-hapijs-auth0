module.exports = [
  './routes/todo_get.js',
  './routes/todo_post.js',
  './routes/todo_delete.js',

].map((elem) => require(elem));
