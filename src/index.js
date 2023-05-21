import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from "./routes/users.js";
import { RecipeRouter } from './routes/recipe.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/recipe", RecipeRouter);
app.use("/auth", userRouter);

mongoose.connect("mongodb+srv://heet:heet738@recipedb.lexg4bw.mongodb.net/recipedb?retryWrites=true&w=majority");





app.listen("3001",() =>  console.log("Server is started at 3001"));