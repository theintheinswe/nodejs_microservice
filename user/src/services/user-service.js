const { UserRepository } = require("../database");
const {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const {
  NotFoundError,
  ValidationError,
} = require("../utils/app-errors");

// All Business logic will be here
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingUser = await this.repository.FindUser({ email });

    if (!existingUser)
      throw new NotFoundError("user not found with provided email id!");

    const validPassword = await ValidatePassword(
      password,
      existingUser.password,
      existingUser.salt
    );
    if (!validPassword) throw new ValidationError("password does not match!");

    const token = await GenerateSignature({
      name : existingUser.name,
      email: existingUser.email,
      _id: existingUser._id,
    });

    return { id: existingUser._id, name : existingUser.name, token };
  }

  async SignUp(userInputs) {
    
    const { name, email, password } = userInputs;

    // create salt
    let salt = await GenerateSalt();

    let userPassword = await GeneratePassword(password, salt);

    const existedUser = await this.repository.FindUser({ email });
   
    if (existedUser)
      throw new NotFoundError("Already exist!");

    const existingUser = await this.repository.CreateUser({
      name,
      email,
      password: userPassword,      
      salt,
    });
    
    const token = await GenerateSignature({
      name:name,
      email: email,
      _id: existingUser._id,
    });
    return { id: existingUser._id, name:name, token };
  }  

}

module.exports = UserService;
