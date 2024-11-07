import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';

const userCtrl = {
  addUser: async (req: any, res: any, next: any) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        console.log("🚀 ~ addUser: ~ reqBody:", reqBody)

      if (!reqBody.email || !reqBody.password) {
        return res.status(400).json({ message: 'email, and password are required' });
      }

      const existingUser = await User.findOne({ email: reqBody.email });
      console.log("🚀 ~ addUser: ~ existingUser:", existingUser)
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already in use' });
      }

      const user = new User({ email: reqBody.email, password: reqBody.password });
      let saveuser = await user.save();
      console.log("🚀 ~ addUser: ~ saveuser:", saveuser)
      if(saveuser){
        res.status(201).json({ message: 'User created successfully', user });
      }else{
        res.status(500).json({ message: 'something went wrong while addind the user!' });
      }

    } catch (error) {
      console.error("Error in addUser:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default userCtrl;
