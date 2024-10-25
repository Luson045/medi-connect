const express = require("express");
const router = express.Router();
const { subscribeNewsletter } = require("../../controllers/othercontrollers/othercontroller");
const { sendNewsletterUpdate } = require("../../controllers/othercontrollers/othercontroller");
const {adminMiddleware} = require("../../middlewares/adminMiddleware");

router.post('/subscribe', subscribeNewsletter);
router.post("/admin/send-mail",adminMiddleware, sendNewsletterUpdate);

module.exports = router;
