import {Router} from "express";
import {createCategory} from "../Controller/Category/categoryCreate";
import uploadImage from "../Utils/multerInstance/multerInstance";
import {getCategory, getCategoryWithRelatedPosts, selectionCategory} from "../Controller/Category/categoryGet";

const categoryRouter: Router = Router();

categoryRouter.get('/selection/', selectionCategory)
categoryRouter.get('/posts', getCategoryWithRelatedPosts)
categoryRouter.get('/:id', getCategory)
categoryRouter.post('/', uploadImage('category'), createCategory)


export default categoryRouter;