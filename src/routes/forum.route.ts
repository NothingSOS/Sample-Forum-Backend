import express from "express";

const router = express.Router();

router.get("/category", (req, res) => {
  res.send("Forum Category!");
});

export default router;