const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const { dirname } = require("path");

exports.checkout = catchAsyncErrors(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  const options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
    // receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({ success: true, order });
});

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `${req.protocol}://${req.get(
        "host"
      )}/success?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({ success: false });
  }
});

exports.getKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});
