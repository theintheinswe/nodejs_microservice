const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ name, email, password, salt }) {
    const User = new UserModel({
      name,
      email,
      password,
      salt
    });

    const UserResult = await User.save();
    return UserResult;
  }
 
  async FindUser({ email }) {
    const existingUser = await UserModel.findOne({ email: email });
    return existingUser;
  }

  async FindUserById({ id }) {
    const existingUser = await UserModel.findById(id);
    return existingUser;
  }  
}

module.exports = UserRepository;
