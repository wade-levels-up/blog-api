const { Router } = require("express");
const commentsRouter = Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");

commentsRouter.get("/", commentsController.getComments);
commentsRouter.get("/:commentid", commentsController.getComment);
commentsRouter.post("/", commentsController.addComment);
commentsRouter.delete("/:commentid", commentsController.deleteComment);
commentsRouter.put("/:commentid", commentsController.updateComment);

module.exports = { commentsRouter };
