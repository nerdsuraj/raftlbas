// src/@types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload; // You can adjust this based on your actual payload structure
  }
}
