const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    status: "success",
    data: {
      name: "Node.js Boilerplate API",
      version: "1.0.0",
      developer: "Waleed Ahmad",
    },
  });
});

module.exports = router;
