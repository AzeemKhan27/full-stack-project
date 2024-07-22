import { Router } from "express";
import mailController from '../controllers/mail.controller.js';
import { scheduleMail, cancelMail, listScheduledMails } from '../controllers/mail.controller.js';
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/schedule-mail').post(mailController.uploadFile,verifyJWT,scheduleMail); //uploadFile,scheduleMail
router.route('/cancel-mail').post(verifyJWT,cancelMail);
router.route('/list-scheduled-mails').get(verifyJWT,listScheduledMails);

export default router;
