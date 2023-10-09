import { Router } from "express";
import { createCategory } from "../Controller/Category/categoryCreate";
import uploadImage from "../Utils/multerInstance/multerInstance";
import { getAllCategory, getCategory, getCategoryWithRelatedPosts, selectionCategory } from "../Controller/Category/categoryGet";
import { editCategory } from "../Controller/Category/categoryEdit";
import { deleteCategoryById } from "../Controller/Category/categoryDelete";

const categoryRouter: Router = Router();
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/selection/", selectionCategory);
categoryRouter.get("/posts", getCategoryWithRelatedPosts);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/:id",deleteCategoryById);
categoryRouter.put("/:categoryId", uploadImage("category"), editCategory);
categoryRouter.post("/", uploadImage("category"), createCategory);

export default categoryRouter;
