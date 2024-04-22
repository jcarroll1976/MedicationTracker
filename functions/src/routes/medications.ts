import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import { Medication } from "../models/Medication";

const medicationRouter = express.Router();

function handleError(err: any, res: express.Response): void {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }

  //Get User's Medications
  medicationRouter.get("/users/:userId/medications", async (req: express.Request, res: express.Response) => {
    try {
      const userId = new ObjectId(req.params.userId);
  
      // Check for valid user session (replace with your logic)
      if (!isValidJWT(req.headers.authorization)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const client = await getClient();
      const medications = await client.db()
        .collection<Medication>("medications")
        .find({ userId }) // Filter by user ID
        .toArray();
      res.status(200).json(medications);
    } catch (err) {
      handleError(err, res);
    }
  });

  //Adds Medication for User
  medicationRouter.post("/users/:userId/medications", async (req: express.Request, res: express.Response) => {
    try {
      const medication: Medication = req.body;
  
      // Check for valid user session (replace with your logic)
      if (!isValidJWT(req.headers.authorization)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const client = await getClient();
      medication.userId = new ObjectId(req.params.userId); // Set user ID from URL param
      await client.db()
        .collection<Medication>("medications")
        .insertOne(medication);
      res.status(201).json(medication);
    } catch (err) {
      handleError(err, res);
    }
  });

  //Removes a User's Medication
  medicationRouter.delete("/users/:userId/medications/:medicationId", async (req: express.Request, res: express.Response) => {
    try {
      const userId = new ObjectId(req.params.userId);
      const medicationId = new ObjectId(req.params.medicationId);
  
      // Check for valid user session (replace with your logic)
      if (!isValidJWT(req.headers.authorization)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const client = await getClient();
      const result = await client.db()
        .collection<Medication>("medications")
        .deleteOne({ _id: medicationId, userId });
  
      if (result.deletedCount) {
        res.sendStatus(204); // No content
      } else {
        res.status(404).json({ message: "Medication not found" });
      }
    } catch (err) {
      handleError(err, res);
    }
  });
  
  //Updates a User's refill date(if necessary)
  shoutoutRouter.patch("/users/:userId/medications/:medicationId", async (req: express.Request, res: express.Response) => {
    try {
      const userId = new ObjectId(req.params.userId);
      const medicationId = new ObjectId(req.params.medicationId);
      const updateData = req.body; // Update data (e.g., dosage, frequency, instructions)
  
      // Check for valid user session (replace with your logic)
      if (!isValidJWT(req.headers.authorization)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const client = await getClient();
      const result = await client.db()
        .collection<Medication>("medications")
        .updateOne({ _id: medicationId, userId }, { $set: updateData }); // Update specific fields
  
      if (result.modifiedCount) {
        // Update refill date logic (choose option 1 or 2)
        if (/* update affects refill logic */) {
          updateData.refillDate = calculateNewRefillDate(updateData); // Update refill date
          await client.db()
            .collection<Medication>("medications")
            .updateOne({ _id: medicationId, userId }, { $set: updateData }); // Update refill date
        }
        res.status(200).json({ message: "Medication updated successfully" });
      } else {
        res.status(404).json({ message: "Medication not found" });
      }
    } catch (err) {
      handleError(err, res);
    }
  });
  
  
  