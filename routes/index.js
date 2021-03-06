var express = require("express");
var router = express.Router();
const moment = require("moment");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    date: moment().startOf("hour").fromNow(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    date: moment().startOf("day").fromNow(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Node Messenger", messages: messages });
});

/* POST new message */
router.post("/new", function (req, res, next) {
  const newMessage = {
    text: req.body.message,
    user: req.body.user,
    date: moment()
      .startOf("hour" - 1)
      .fromNow(),
  };

  if (!newMessage.user || !newMessage.text) {
    res.render("new", { error: "Please include a message and name!" });
    return;
  }

  messages.unshift(newMessage);
  res.redirect("/");
});

/* GET new post page. */
router.get("/new", function (req, res, next) {
  res.render("new");
});

module.exports = router;
