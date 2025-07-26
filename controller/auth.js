const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const db = req.app.locals.db;
  const { name, email, phone, password, occupation, work } = req.body;

  try {
    // const hashedPassword = await bcrypt.hash(password, 8);
    if (occupation == "customer") {
      db.query(
        "INSERT INTO users SET ?",
        {
          name,
          email,
          phone,
          password,
          occupation,
          work: null,
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
    } else {
      db.query(
        "INSERT INTO service_provider SET ?",
        {
          name,
          email,
          phone,
          password,
          occupation,
          work,
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
    }
  } catch (error) {
    console.error(error);
    return res.send("Something went wrong");
  }
};

exports.login = (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  console.log("👉 Login attempt for:", email);
  console.log("👉 Password entered:", password);

  // First try in 'users' table
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).send("Internal server error");
    }

    if (results.length > 0) {
      const user = results[0];
      console.log("✅ Found in users:", user);

      if (password !== user.password) {
        return res.send("Incorrect password");
      }

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        occupation: user.occupation,
        work: user.work || null,
      };

      return res.redirect("/home");
    } else {
      // If not found in users, try in service_provider
      db.query("SELECT * FROM service_provider WHERE email = ?", [email], (err, spResults) => {
        if (err) {
          console.error("❌ DB Error:", err);
          return res.status(500).send("Internal server error");
        }

        if (spResults.length === 0) {
          return res.status(404).send("No user found with this email.");
        }

        const user = spResults[0];
        console.log("✅ Found in service_provider:", user);

        if (password !== user.password) {
          return res.send("Incorrect password");
        }

        req.session.user = {
          id: user.Id,
          name: user.name,
          email: user.email,
          occupation: user.occupation,
          work: user.work,
        };
        console.log('req.session', req.session)

        return res.redirect("/portfolio");
      });
    }
  });
};

exports.updatePortfolio = (req, res) => {
  const db = req.app.locals.db;
  const { shop_name, address, price, city } = req.body;
console.log(req.session);
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  const sql = `
    UPDATE service_provider 
    SET shop_name = ?, address = ?, price = ?, city = ? 
    WHERE id = ?
  `;

  db.query(sql, [shop_name, address, price, city, userId], (err, result) => {
    if (err) {
      console.error("❌ DB Update Error:", err);
      return res.status(500).send("Internal server error");
    }

    console.log("✅ Portfolio updated for ID:", userId);
    res.send("Portfolio updated successfully!");
  });
};
