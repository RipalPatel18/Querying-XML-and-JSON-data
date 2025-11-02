// app.js – same setup as class example
const express = require("express");
const path = require("path");
const libraryRouter = require("./routes/library");

const app = express();
const port = 3000;

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve public folder
app.use(express.static(path.join(__dirname, "public")));

// use router
app.use("/", libraryRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
