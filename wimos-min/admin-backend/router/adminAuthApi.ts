import express from 'express';
import LoginMiddleware from '../middlewares/admin-auth/login-middleware';
import RegisterMiddleware from '../middlewares/admin-auth/register-middleware';
import verifyToken from '../middlewares/jwt/jwt-verify';
import ChangePasswordController from '../controllers/admin-auth/change-password-controller';
import LoginController from '../controllers/admin-auth/login-controller';
import LogoutController from '../controllers/admin-auth/logout-controller';
import RegisterController from '../controllers/admin-auth/register-controller';
import verifyAdmin from '../helpers/jwt/jwt-verify';
const router = express.Router();

/* END OF IMPORTING MODULES */

/* API HANDLERS */


router.post("/login", LoginMiddleware, LoginController);
router.post("/register", RegisterMiddleware, RegisterController);
router.get("/verify-login", verifyAdmin);
router.post("/logout", LogoutController);
router.post("/change-password", verifyToken, ChangePasswordController);



/* END OF API HANDLERS */

const AdminAuthApi = router;

export default AdminAuthApi;


