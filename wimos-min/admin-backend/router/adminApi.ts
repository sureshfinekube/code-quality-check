import express from 'express';
import DashboardController from '../controllers/admin-dashboard/dashboard-controller';
import GetBasicContractController from '../controllers/basic-contract/get-basic-contract';
import UpdateBasicContractController from '../controllers/basic-contract/update-basic-contract';
const router = express.Router();

/* API HANDLERS */

router.get("/show-statistics", DashboardController);
router.get('/basic-contract-fee', GetBasicContractController);
router.put('/basic-contract-fee', UpdateBasicContractController);

/* END OF API HANDLERS */

const AdminApi = router;

export default AdminApi;


