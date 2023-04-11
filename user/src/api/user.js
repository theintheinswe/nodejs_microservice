const UserService = require("../services/user-service");
const { validateJsonSchema } = require("./middlewares/jsonschema");

module.exports = (app) => {
  const service = new UserService();

  app.post("/signup", validateJsonSchema("user.singup"), async (req, res, next) => {
    try {       
      const { name, email, password } = req.body;
      const data = await service.SignUp({ name, email, password });     
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/signin", validateJsonSchema("user.singin"), async (req, res, next) => {    
    try {      
      const { email, password } = req.body;
      const data = await service.SignIn({ email, password });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }); 
};
