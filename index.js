const express = require("express");
const uuid = require("uuid");

const port = 3000;
const app = express();
app.use(express.json);

const users = [];

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);
  return response.status(201).json(user);
});

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, age } = request.body;

  const updatedUser = { id, name, age };

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  users[index] = updatedUser;

  return response.json(updatedUser);
});

app.delete("/users:id", (request, response) => {
  const { id } = request.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  return response.status(204).json();
});

app.listen(3000, () => {
  console.log(`🚀 Server started on port ${port}`);
});
