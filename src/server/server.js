// express 모듈 호출
// const express = require("express");
import { Axios } from "axios";
import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server Response Success");
});

app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});

app.get("/notes", async (req, res) => {
  try {
    const response = await Axios("http://localhost:3001/notes");
    const notes = response.data;
    console.log(notes);
    // res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
