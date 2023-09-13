import {Router} from "express";
import {createUser} from "../Controller/User/userCreate";
import login from "../Controller/login/authentication";
import refresh from "../Controller/token/refresh";
import postRouter from "./posts";
import commentRouter from "./comment";
import categoryRouter from "./category";

const router: Router = Router();

router.post('/login', login)
router.post('/user/', createUser);
router.post('/refresh/', refresh);

router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/category', categoryRouter)


export default router;