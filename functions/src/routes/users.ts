import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import { User } from "../models/Medication";

const userRouter = express.Router();

/*const errorResponse = (error: any, res: any) => {
    console.error("FAIL", error);
    res.status(500).json({ message: "Internal Server Error" });
 };*/

 userRouter.get("/users/:id", async (req, res) => {
    try {
      const _id: ObjectId = new ObjectId(req.params.id);
      const client = await getClient();
      const user = await client.db().collection<User>("users")
          .findOne({ _id });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: "Not Found"});
      }
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
   });