const Validator = require("validator");
const isEmpty = require("isempty");
module.exports = function validateKeyInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data["key"] = !isEmpty(data["key"]) ? data["key"] : "";

// api_key checks
  if (Validator.isEmpty(data["key"])) {
    errors.api_key = "Key field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};