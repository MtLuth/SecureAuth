const app = require("./server/server");

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
