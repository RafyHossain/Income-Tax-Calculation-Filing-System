const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Income Tax Calculation API Running"
    });
});

module.exports = app;