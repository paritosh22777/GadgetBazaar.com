const express = require("express");
const {
  checkout,
  paymentVerification,
  getKey,
} = require("../controllers/paymentController");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/checkout").post(isAuthenticatedUser, checkout);
router
  .route("/paymentverification")
  .post(isAuthenticatedUser, paymentVerification);
router.route("/getkey").get(getKey);

module.exports = router;
