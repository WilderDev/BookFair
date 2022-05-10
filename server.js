// Import Express Package
const express = require("express");

// Initialize express
const app = express();

// Serve static build files from the "dist" directory
app.use(express.static("./dist/book-fair"));

// Route incoming server requrests to the correct file
app.get("/*", (_, res) =>
  res.sendFile("index.html", { root: "dist/book-fair" })
);

// Start the app on the default Heroku Port
app.listen(process.env.PORT || 8080);
