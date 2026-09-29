const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/users", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "External API request failed" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${req.params.id}`
    );
    if (!response.ok) return res.status(404).json({ error: "User not found" });
    const user = await response.json();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "External API request failed" });
  }
});

if (require.main === module) {
  app.listen(3000, () => console.log("API demo running at http://localhost:3000"));
}

module.exports = app;