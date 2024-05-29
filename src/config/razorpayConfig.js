// razorpay.js

import Razorpay from "razorpay";

const key_id = "rzp_test_KNouXSjozBeQpO"
const key_secret = "aTVLWfzMrBZ7kOQvRd5axVul";

const razorpayConfig = new Razorpay({
  key_id,
  key_secret,
});

export default razorpayConfig;
