const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const session = require("express-session");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// Setup MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Assign db to app.locals
app.locals.db = db;

db.connect((error) => {
  if (error) {
    console.log("MySQL Connection Error:", error);
  } else {
    console.log("✅ MySQL Connected...");
  }
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "cityfix-secret",
    resave: false,
    saveUninitialized: false
  })
);

// Static files
const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));

// View engine
app.set("view engine", "hbs");




// Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

// Start server
app.listen(5000, () => {
  console.log("🚀 Server Started on Port 5000");
});
