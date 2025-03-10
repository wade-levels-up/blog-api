const { Router } = require("express");
const commentsRouter = Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");

commentsRouter.get("/", commentsController.getComments);
commentsRouter.post("/", commentsController.addComment);

module.exports = { commentsRouter };
