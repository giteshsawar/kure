const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const UserSchema = mongoose.model("users");

let SBChannel = null;

router.route("/saveUser").post((req, res) => {
  const { user } = req.body;
  const userObj = new UserSchema(user);
  userObj.save((err, data) => {
    if (err) return res.status(400).send(err);

    return res.status(200).send(data);
  });
});

router.route("/fetchUser").post((req, res) => {
  const { username } = req.body;
  UserSchema.findOne({ username }).exec((err, data) => {
    if (err) return res.status(400).send(err);

    return res
      .status(200)
      .send({
        user: data,
        sendbirdApi: "",
        channelUrl: SBChannel
      });
  });
});

router.route("/setChannelUrl").post((req, res) => {
  const { SBChannelUrl } = req.body;
  SBChannel = SBChannelUrl;
  res.status(200).send({});
});

module.exports = router;
