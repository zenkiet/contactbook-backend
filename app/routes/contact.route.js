const express = require("express");
const contacts = require("../controllers/contact.controller");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .get(contacts.findAll)
        .post(contacts.create)
        .delete(contacts.deleteAll);

    router.route("/favorite")
        .get(contacts.findAllFavorite);

    router.route("/:id")
        .get(contacts.findOne)
        .put(contacts.update)
        .delete(contacts.delete);

    app.use("/api/contacts", router);
};