
import { jwtmiddlwarefunction } from '../jwtmiddleware';
import { addNewUserBlog, blogPostToBeUpdated, deleteUserBlog, listUserBlogs,searchBlogsByUserId } from '../controllers/blog_controller';
import express,{ Router } from 'express';

const router:Router = express.Router();

router.post('/createUserBlog',jwtmiddlwarefunction,addNewUserBlog);

router.get('/listUserBlogs/:skip',listUserBlogs);

router.put('/editUserBlog/:_id',jwtmiddlwarefunction,blogPostToBeUpdated);

router.get('/blogDetails/:id/:skip',jwtmiddlwarefunction,searchBlogsByUserId);

router.delete('/deleteUserBlog/:id',deleteUserBlog);

export default router;