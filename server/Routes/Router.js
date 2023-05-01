import express from "express";
const router = new express.Router();
import db from "../db/conn.js";

// register user data
router.post("/insert-data-user", (req, res) => {
  // console.log(req.body);

  const { name, email, age, mobile, work, Address, description } = req.body;

  if (!name || !email || !age || !mobile || !work || !Address || !description) {
    res.status(422).json("plz fill the all data");
  }

  try {
    db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
      if (result.length) {
        res.status(422).json("This Data is Already Exist");
      } else {
        db.query(
          "INSERT INTO users SET ?",
          { name, email, age, mobile, work, Address, description },
          (err, result) => {
            if (err) {
              console.log("err" + err);
            } else {
              res.status(201).json({ msg: "user data registerd successfully" });
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// All get userdata(fetchdata)

router.get("/get-users-data", (req, res) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    if (err) {
      console.log(err);
      res.json("nodata available");
    } else {
      res.status(201).json(result);
    }
  });
});

// get single user data (detail or view)

router.get("/indiviual-user/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM users WHERE id = ? ", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json(result);
    }
  });
});

// user delete data

router.delete("/delete-user/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ? ", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json({ msg: "user data Deleted successfully" });
    }
  });
});

// update users data

router.patch("/updateuser/:id", (req, res) => {
  const { id } = req.params;

  const data = req.body;

  db.query("UPDATE users SET ? WHERE id = ? ", [data, id], (err, result) => {
    if (err) {
      res.status(422).json({ message: "error" });
    } else {
      res.status(201).json({ msg: "user data Updated successfully" });
    }
  });
});

export default router;
