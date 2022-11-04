import express from "express";

import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/category", (req, res) => {
  res.send("[GET] Get forum categories");
});

router.get("/post", (req, res) => {
  res.send("[GET] Get forum posts");
});

router.post("/post", verifyToken, (req, res) => {
  res.send("[POST] Create new forum post");
});

router.get("/post/:forumId", (req, res) => {
  res.send(`[GET] Get forum post ID ${req.params.forumId} detail`);
});

router.get("/post/:forumId/reply", (req, res) => {
  res.send(`[GET] Get forum replies for forum post ID ${req.params.forumId}`);
});

router.post("/post/:forumId/reply", verifyToken, (req, res) => {
  res.send(`[POST] Create new forum reply for forum post ID ${req.params.forumId}`);
});

export default router;
