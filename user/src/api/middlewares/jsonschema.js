const Validator = require("jsonschema").Validator;
const path = require("path");

Validator.prototype.customFormats.paramInteger = function (input) {
  if (input == null) {
    return false;
  }
  const num = +input;
  return !isNaN(num);
};

exports.validateJsonSchema = (schema) => {
  return (req, res, next) => {
    let jsonData = getRequestJson(req);
    let jsonSchema = this.getJsonSchema(schema, req);
    let v = new Validator();   
    let result = null;
    // schema validation for get functionality
    result = v.validate(jsonData, jsonSchema);

    if (result && result.valid) {
      next();
    } else {
      const message = result.errors
        .map(function (err) {          
          if (err.schema.custom) {
            return err.schema.custom.message;
          }
          return err.stack ;
        })
        .join(". \n ");           
         return res.status(400).json({message: message})
    }
  };
};

let getRequestJson = (req) => {
  switch (req.method) {
    case "POST":
      return req.body;
      break;
    case "PUT":
      return req.body;
      break;
    default:
      return req.query;
  }
};

exports.getJsonSchema = (schema) => {
  const nav = schema.split(".");
  const filePath = path.join(__dirname, "../../jsonSchema", nav[0] + ".json");
  return require(filePath)[nav[1]];
};
