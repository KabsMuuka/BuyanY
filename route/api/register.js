import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
const SALTROUNDS = 10;

//database User
import User from "../../model/User.js";

router.post("/", (req, res) => {
  const { userRole, phoneNumber, password } = req.body;

  //save into the database
  try {
    bcrypt.genSalt(SALTROUNDS, (err, salt) => {
      if (err) res.json({ err: err.message });

      bcrypt.hash(password, salt, async (err, hashedpassword) => {
        if (err) res.json({ err: err.message });

        await User.create({
          userRole: userRole,
          phoneNumber: phoneNumber,
          password: hashedpassword,
        })
          .then(() => {
            console.log("User saved into the db");
          })
          .catch((err) => console.log(err.message));
      });
    });
  } catch (error) {
    res.status(500).json({ err: "server error" });
  }
});

export default router;
