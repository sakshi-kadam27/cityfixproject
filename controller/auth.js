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
          id: user.id,
          name: user.name,
          email: user.email,
          occupation: user.occupation,
          work: user.work,
        };
        console.log('req.session', req.session)

        return res.redirect("/service_provider_dashboard");
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
    // res.send("Portfolio updated successfully!");
     return res.redirect("/service_provider_dashboard");
  });
};

exports.updateCustomerDetails = (req, res) => {
  const db = req.app.locals.db;
  console.log('req.body', req.body)
  const { address, city } = req.body;
  
console.log(req.session);
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  const sql = `
    UPDATE users 
    SET  address = ?, city = ? 
    WHERE id = ?
  `;

  db.query(sql, [ address, city, userId], (err, result) => {
    if (err) {
      console.error("❌ DB Update Error:", err);
      return res.status(500).send("Internal server error");
    }

    console.log("✅CustomerDetails updated for ID:", userId);
    res.send({ message:"✅Customer details updated successfully!"});
  });
};

exports.getAllServiceProviders = (req, res) => {
  const db = req.app.locals.db;
  console.log(req.session);
  
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  // Get customer city
  const getCustomerCity = "SELECT city FROM users WHERE id = ?";

  db.query(getCustomerCity, [userId], (err, customerCityResult) => {
    if (err) {
      console.error("❌ Error fetching customer city:", err);
      return res.status(500).send("Internal server error");
    }

    if (customerCityResult.length === 0) {
      return res.status(404).send("City not found for the user.");
    }

    const customerCity = customerCityResult[0].city;
    
    console.log("✅ Customer city:", customerCity);

    // Fetch service providers in the same city
    const sql = "SELECT * FROM service_provider WHERE city = ?";

    db.query(sql, [customerCity], (err, serviceProviders) => {
      if (err) {
        console.error("❌ Error fetching service providers:", err);
        return res.status(500).send("Internal server error");
      }

      return res.send({
        message: " Service Providers fetched successfully!",
        data: serviceProviders
      });
    });
  });
};

exports.storeBookingDetails = (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).send("Unauthorized. Please log in.");
    }

    // Destructure the required fields from the request body
    const { name_of_service, service_provider_id, date, time } = req.body;
    const status = "pending"; // Default status

    // Validate inputs (optional but recommended)
    if (!name_of_service || !service_provider_id || !date || !time) {
      return res.status(400).send("Missing required booking details.");
    }

    // Insert booking into database
    db.query(
      "INSERT INTO booking SET ?",
      {
        name_of_service,
        userid: userId,
        service_provider_id,
        date,
        time,
        status,
      },
      (err, result) => {
        if (err) {
          console.error("Booking error:", err);
          return res.status(500).send("Booking failed due to server error.");
        }
        return res.status(200).send("✅ Booking successful.");
      }
    );
  } catch (error) {
    console.error("Unexpected error in storeBookingDetails:", error);
    return res.status(500).send("Unexpected server error.");
  }
};

exports.getCustomerOrders = (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).send("Unauthorized. Please log in.");
    }

    db.query("SELECT * FROM booking WHERE userid = ?", [userId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to fetch orders.");
      }

      // Send the booking data back as JSON
      return res.status(200).json({ success: true, orders: result });
    });

  } catch (error) {
    console.error("Unexpected error in getCustomerOrders:", error);
    return res.status(500).send("Unexpected server error.");
  }
};


// For customers only
exports.getCustomerDetailsBeforeUpdate = (req, res) => {
  const db = req.app.locals.db;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching customer details:", err);
      return res.status(500).send("Internal server error");
    }

    if (results.length === 0) {
      return res.status(404).send("Customer not found.");
    }

    return res.send({
      message: "✅ Customer details fetched successfully!",
      role: "customer",
      data: results[0],
    });
  });
};

// For service providers only
exports.getServiceProviderDetailsBeforeUpdate = (req, res) => {
  const db = req.app.locals.db;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  const sql = "SELECT * FROM service_provider WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching service provider details:", err);
      return res.status(500).send("Internal server error");
    }

    if (results.length === 0) {
      return res.status(404).send("Service provider not found.");
    }

    return res.send({
      message: "✅ Service provider details fetched successfully!",
      role: "service_provider",
      data: results[0],
    });
  });
};

// For Customers only
exports.getCustomerDetailsBeforeUpdate = (req, res) => {
  const db = req.app.locals.db;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching Customers details:", err);
      return res.status(500).send("Internal server error");
    }

    if (results.length === 0) {
      return res.status(404).send("Customers not found.");
    }

    return res.send({
      message: "✅ Customers details fetched successfully!",
      role: "Customer",
      data: results[0],
    });
  });
};

exports.getServiceProvidersOrders = (req,res)=>{
   const db = req.app.locals.db;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }
  const sql = `SELECT booking.*, users.name AS customer_name, users.phone, users.address, users.email
FROM booking
LEFT JOIN users ON booking.userid = users.id
WHERE booking.service_provider_id = ? AND booking.status = 'pending';`;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching service provider details:", err);
      return res.status(500).send("Internal server error");
    }

    // if (results.length === 0) {
    //   return res.status(404).send("Service provider not found.");
    // }

    return res.send({
      message: "✅ Service provider details fetched successfully!",
      role: "service_provider",
      data: results,
    });
  });

}


exports.updateOrderStatus = (req, res) => {
  const db = req.app.locals.db;
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).send({ message: "Missing id or status" });
  }

  const validStatus = ['accepted', 'rejected'];
  if (!validStatus.includes(status)) {
    return res.status(400).send({ message: "Invalid status" });
  }

  const sql = "UPDATE booking SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating booking:", err);
      return res.status(500).send({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Booking not found" });
    }

    return res.send({ message: `Booking ${id} marked as ${status}` });
  });
};


// vendor dashboard accepted history funcition


exports.getAcceptedOnlyOrders = (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).send("Unauthorized. Please log in.");
    }

    db.query("SELECT * FROM booking WHERE service_provider_id = ? and status = 'accepted' ", [userId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to fetch orders.");
      }

      // Send the booking data back as JSON
      return res.status(200).json({ success: true, orders: result });
    });

  } catch (error) {
    console.error("Unexpected error in getCustomerOrders:", error);
    return res.status(500).send("Unexpected server error.");
  }
};

exports.updateWorkStatus = (req, res) => {
  try {
    console.log('reached')
    const db = req.app.locals.db;
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).send("Unauthorized. Please log in.");
    }
    console.log(req.body);


    const updateQuery = `
      UPDATE booking 
      SET status = 'work_done' 
      WHERE service_provider_id = ? and id = ? AND status = 'accepted'
    `;

       db.query(updateQuery, [ userId, parseInt(req.body.order_id)], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Failed to update." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Booking not found or not owned by user." });
      }
    return res.status(200).json({ success: true, message:'order updated successfully' });
    });

  } catch (error) {
    console.error("Unexpected error in updateWorkStatus:", error);
    return res.status(500).send("Unexpected server error.");
  }
};

exports.customerRateBooking = (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.session.user?.id;
    const { bookingId, rating } = req.body;

    console.log('rating request body:', req.body);
    if (!userId) {
      return res.status(401).send("Unauthorized. Please log in.");
    }

    if (!bookingId || !rating || rating < 1 || rating > 5) {
      return res.status(400).send("Invalid rating or booking ID.");
    }

    const updateQuery = `
      UPDATE booking
      SET customer_rating = ?
      WHERE id = ? AND userid = ?
    `;

    db.query(updateQuery, [parseInt(rating), parseInt(bookingId), userId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Failed to submit rating." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Booking not found or not owned by user." });
      }

      return res.status(200).json({ success: true, message: "Rating updated successfully." });
    });

  } catch (error) {
    console.error("Unexpected error in rateBooking:", error);
    return res.status(500).send("Unexpected server error.");
  }
};


exports.getCompletedOnlyOrders = (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).send("Unauthorized. Please log in.");
    }

    db.query("SELECT * FROM booking WHERE service_provider_id = ? and status = 'work_done' ", [userId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Failed to fetch orders.");
      }

      // Send the booking data back as JSON
      return res.status(200).json({ success: true, orders: result });
    });

  } catch (error) {
    console.error("Unexpected error in getCustomerOrders:", error);
    return res.status(500).send("Unexpected server error.");
  }
};