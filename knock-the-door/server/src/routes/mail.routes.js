import { Router } from "express";
import mailController from '../controllers/mail.controller.js';

const router = Router();

router.route('/schedule-mail').post(mailController.uploadFile, mailController.scheduleMail);
router.route('/cancel-mail').post(mailController.cancelMail);
router.route('/list-scheduled-mails').get(mailController.listScheduledMails);

export default router;
