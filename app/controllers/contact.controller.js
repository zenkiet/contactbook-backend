const ContactService = require("../servers/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = (req, res) => {
    res.send({ message: "create handler" });
};

exports.findAll = (req, res) => {
    res.send({ message: "findAll handler" });
};

exports.findOne = (req, res) => {
    res.send({ message: "fondOne handler" });
};

exports.update = (req, res) => {
    res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" });
};

// create and save a new contact
exports.create = async (req, res, next) => {
    if (!req.body?.name){
        return new(new ApiError(400, 'Name can not be empty'));
    }
    
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch(error){
        new ApiError(500, "An error occurred while creating the contact");
    }
}

// retrieve and return all contacts from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving contacts"));
    }
    return res.send(documents);
}

// find a single contact with a contactId
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.find({ _id: ObjectId(req.params.contactId) });
        if(!document){
            return next(new ApiError(404, "Contact not found with id " + req.params.contactId));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving contact with id " + req.params.contactId));
    }
}

// update a contact by the id in the request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Contact not found with id " + req.params.id));
        }
    } catch (error){
        return next(new ApiError(500, "An error occurred while updating contact with id " + req.params.id));
    }
}

// delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found with id " + req.params.id));
        }
        return res.send({ message: "Contact deleted successfully!" });
    } catch(error){
        return next(new ApiError(500, "An error occurred while deleting contact with id: " + req.params.id));
    }
}

// find all favorite contacts of a user
exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch(error){
        return next(new ApiError(500, "An error occurred while retrieving favorite contacts"));
    }
}

// delete all contacts from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.deleteAll();
        return res.send({ message: `${documents.deletedCount} contacts deleted successfully!` });
    } catch(error){
        return next(new ApiError(500, "An error occurred while deleting all contacts"));
    }
}