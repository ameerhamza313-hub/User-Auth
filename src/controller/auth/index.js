import { compare, hash } from "bcrypt";
import UserModel from "../../model/user/index.js";
import jwt from "jsonwebtoken";

const authController = {
  signUp: async (req, res) => {
    try {
      const payload = req.body;
      console.log(payload);
      const userCheck = await UserModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (userCheck) {
        return res.status(200).json({ message: "user already exits" });
      }
      const hPassword = await hash(payload.password, 10);
      const user = await UserModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hPassword,
      });

      res.status(200).json({ message: "user created successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!", error });
    }
  },
  signIn: async (req, res) => {
    try {
      const payload = req.body;
      const userCheck = await UserModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!userCheck) {
        res.status(401).json({ message: "invalid credential" });
      }

      const comparePassword = compare(payload.password, userCheck.password);
      if (!comparePassword) {
        res.status(401).json({ message: "invalid credential" });
      }
    //   res.status(200).json({ message: "user login successfully" });

      const data = {
        id: userCheck.id,
        firstName: userCheck.firstName,
        email:userCheck.email,
      }
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY,{
        expiresIn: "1m"
      });
      res.status(200).json({data: token})
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "internal server error" ,error});
    }
  },




  };

export default authController;
