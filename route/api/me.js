import express from "express";
const router = express.Router();
import User from "../../model/User.js";
import middleware from "../../middleware/middleware.js";

router.get("/", middleware, async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ err: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

//verify(token: string, secretOrPublicKey: jwt.Secret | jwt.PublicKey,
//options: jwt.VerifyOptions & { complete: true; }): jwt.Jwt
