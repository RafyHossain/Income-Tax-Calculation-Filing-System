const express = require("express");
const userRoutes=require("./routes/user.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Income Tax Calculation API Running"
    });
});
app.use("/users", userRoutes);

module.exports = app;