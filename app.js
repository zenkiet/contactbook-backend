const express = require("express");
const cors = require("cors");
const ContactRoutes = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });

});

ContactRoutes(app);

// handle 404 error
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});    

// handle errors
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
})

module.exports = app;