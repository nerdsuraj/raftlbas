import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import { Restaurant } from '../models/Restaurant.js';
import { generateToken } from '../utils/auth.js';

export const Resolvers = {
  Query: {
    studentList: async () => {
      return await User.find();
    },
    restaurantList: async () => {
      try {
        const restaurants = await Restaurant.find();
        return restaurants.map((restaurant:any) => ({
          id: restaurant._id.toString(),
          name: restaurant.name,
          borough: restaurant.borough,
          cuisine: restaurant.cuisine,
          address: restaurant.address,
          grades: restaurant.grades.map((grade:any) => ({
            date: grade.date,
            grade: grade.grade,
            score: grade.score !== null && grade.score !== undefined ? grade.score : 0, // Provide a default value for missing scores
          })),
          restaurant_id: restaurant.restaurant_id,
        }));
      } catch (error) {
        console.error("Error fetching restaurant list:", error);
        throw new Error("Unable to fetch restaurant list");
      }
    },
  },
  Mutation: {
    register: async (_: any, { username, email, password }: any) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      return await user.save();
    },
    login: async (_: any, { username, password }: any) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Incorrect password');

      return generateToken(user.id); // Return JWT token
    },
  },
};
