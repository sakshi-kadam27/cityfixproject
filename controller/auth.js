const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const db = req.app.locals.db;
  const { name, email, phone, password, occupation, work } = req.body;

  try {
    // const hashedPassword = await bcrypt.hash(password, 8);
    db.query(
      "INSERT INTO users SET ?",
      {
        name,
        email,
        phone,
        password,
        occupation,
        work: occupation === "service_provider" ? work : null
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.send("Registration failed");
        }
       // res.send("✅ Registered successfully");
       return res.redirect("/login");
      }
      
    );
  } catch (error) {
    console.error(error);
    return res.send("Something went wrong");
  }
};



exports.login = async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  console.log("👉 Login attempt for:", email);
  console.log("👉 Password entered:", password);

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Login failed");
    }

    if (results.length === 0) {
      return res.send("User not found");
    }

    const user = results[0];
    console.log("👉 Hashed password from DB:", user.password);
    console.log("👉 user passwored", password);


    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    console.log("✅ Match result:", isMatch);

    if (!isMatch) {
      return res.send("Incorrect password");
    }

    req.session.user = {
  id: user.id,
  name: user.name,
  email: user.email,
  occupation: user.occupation
};

return res.redirect("/home");  // ✅ make sure this is here

    
  });
};


