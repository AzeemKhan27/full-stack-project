import { Router } from "express";
import mailController from '../controllers/mail.controller.js';
import { scheduleMail, cancelMail, listScheduledMails } from '../controllers/mail.controller.js';
// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/schedule-mail').post(mailController.uploadFile,scheduleMail); //uploadFile,scheduleMail
router.route('/cancel-mail').post(cancelMail);
router.route('/list-scheduled-mails').get(listScheduledMails);

export default router;
