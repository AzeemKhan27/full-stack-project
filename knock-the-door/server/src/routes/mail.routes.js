import { Router } from "express";
import { scheduleMail, cancelMail, listScheduledMails } from '../controllers/mail.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/schedule-mail').post(upload.single('file'),verifyJWT,scheduleMail); 
router.route('/cancel-mail/:jobId').delete(cancelMail);//verifyJWT
router.route('/list-scheduled-mails').get(listScheduledMails,verifyJWT);

export default router;
