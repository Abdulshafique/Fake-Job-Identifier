const { validationResult } = require('express-validator');
exports.createPostValidator = (req, res, next) => {
    req.check('title', "write a title").notEmpty(); // Fixed typo here
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });

    req.check('body', "write a body").notEmpty(); // Fixed typo here
    req.check("body", "body must be between 4 to 200 characters").isLength({
        min: 4,
        max: 200
    });

    // check for errors
    const errors = req.validationErrors(); // Corrected to validationResult(req)
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]; // Fixed variable name here
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

