import baseUrl from "./baseUrl";

// Auth
export const Fast2SMSURL = "https://www.fast2sms.com/dev/bulkV2";
export const SendSMSToUserURL = baseUrl + "api/SendOTP";
export const signInUserURL = baseUrl + "api/SignInUser";
export const checkUserExistURL = baseUrl + "api/CheckUserExists";
export const RegisterUserURL = baseUrl + "api/Register";
export const checkUserURL = baseUrl + "api/CheckLogin";
export const getUsersURL = baseUrl + "api/Register";
export const getUserRole = baseUrl + "api/CheckUserRole";

//Products
export const ProductsURL = baseUrl + "api/products";
export const getSingleProductURL = baseUrl + "api/products/Product/";


// Payment
export const createOrderURL = baseUrl + "api/PaymentGateway/CreateOrder";
export const downloadProductURL = baseUrl + "api/ProductDown";
export const getOrderURL = baseUrl + "api/PaymentGateway/GetOrder";
export const getUserOrderURL = baseUrl + "api/GetUserOrders";


//Send Email
export const sendEmailURL = baseUrl + "api/SendEmail";


//Conatct URL
export const contactURL = baseUrl + "api/ContactUs";


//Subscribe URL
export const subscribeURL= baseUrl + "api/Subscribe";
