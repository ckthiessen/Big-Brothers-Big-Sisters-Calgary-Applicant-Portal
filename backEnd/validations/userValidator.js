const FluentValidation = require('@kalstong/fluentvalidation');

const config = {
    breakOnFirstError : false // Stop at first error
}

function checkValidation(validation) {
    if (validation === undefined || validation.length > 0) {
        console.log('user failed validation.  throwing an error');
        throw validation;
    }
}

module.exports = {
    validateUser: function(user) {
        console.log('validating user');
        let validation =  new FluentValidation()
                            .Config(config)
                            .RuleFor(user.id).IsNotNullOrWhitespace().ErrorMessage("Id cannot be empty")
                            .RuleFor(user.name).IsNotNullOrWhitespace().ErrorMessage("Name cannot be empty")
                            .RuleFor(user.email).IsNotNullOrWhitespace().ErrorMessage("Email cannot be empty")
                            .RuleFor(user.password).IsNotNullOrWhitespace().ErrorMessage("You must have a password")
                            .errors;

        checkValidation(validation);
    },
    validateDelete: function(id) {
        console.log('validating user');
        let validation =  new FluentValidation()
                            .Config(config)
                            .RuleFor(id).IsNotNullOrWhitespace().ErrorMessage("Id cannot be empty");

        checkValidation(validation);
    },
    validateId: function(id) {
        console.log('validating user id');
        let validation = new FluentValidation()
                            .Config(config)
                            .RuleFor(id).IsNotNullOrWhitespace().ErrorMessage("The Id cannot be empty");
        checkValidation(validation);
    }
}