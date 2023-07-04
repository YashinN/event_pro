const request = require("supertest");
const { getAllEvents } = require("../controllers/eventController");
require("dotenv").config();
const connectDB = require("../config/db");
const express = require("express");
const app = express();

// route to test
app.get("/", getAllEvents);

// connects to mongo db
connectDB();

describe("Test function to get all events from db", () => {
  describe("test getAllEvents controller function", () => {
    test("Should respond with status code 200", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });
});
