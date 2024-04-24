import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import medicationRouter from './routes/medications';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/',medicationRouter)
export const api = functions.https.onRequest(app);

//this came directly from slide 79 in the Modern Web slides. If you think or find that it is missing something, you might start by referencing that slide.

