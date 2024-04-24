import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import {Medication} from "../models/Medication"; // Replace with your medication model path
//import { User } from "../models/Medication"; // Replace with your user model path (optional)

const medicationRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// get all Medications for a user
medicationRouter.get("/users/:user_id/medications", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const client = await getClient();
    const cursor = client.db().collection<Medication>("medications")
      .find({ userId }); // Filter by user ID
    const results = await cursor.toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// get Medication by ID for a user
medicationRouter.get("/users/:user_id/medications/:id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const medication = await client.db().collection<Medication>("medications")
      .findOne({ _id, userId }); // Filter by user and ID
    if (medication) {
      res.status(200).json(medication);
    } else {
      res.status(404).json({ message: "Medication Not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// create a new Medication for a user
medicationRouter.post("/users/:user_id/medications", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const medication: Medication = req.body; // Replace with your model type
    medication.userId = userId; // Add user ID to medication object

    // Add validation logic for medication data (e.g., required fields)

    const client = await getClient();
    await client.db()
      .collection<Medication>("medications")
      .insertOne(medication);
    res.status(201).json(medication);
  } catch (err) {
    // Handle specific medication creation errors (e.g., validation)
    errorResponse(err, res);
  }
});

// update a Medication by ID for a user (optional authorization)
medicationRouter.put("/users/:user_id/medications/:id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const _id: ObjectId = new ObjectId(req.params.id);
    const updatedMedication: Medication = req.body; // Replace with your model type

    // Add validation logic for updated medication data

    const client = await getClient();

    // Optional authorization check (using User model)
    // if (/* check if user making request owns the medication */) {
    const result = await client.db().collection<Medication>("medications")
      .updateOne({ _id, userId }, { $set: updatedMedication }); // Update only specified fields
    // } else {
    //   res.status(401).json({ message: "Unauthorized" });
    // }

    if (result.matchedCount) {
        res.status(200).json({ message: "Medication updated successfully" });
      } else {
        res.status(404).json({ message: "Medication Not Found" });
      }
    } catch (err) {
      errorResponse(err, res);
    }
  });


  export default medicationRouter;