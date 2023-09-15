import express from 'express';

import { getPackageMiddleware } from "../middlewares/b2c-c2b/get-package-middleware";
import { getClientsController } from '../controllers/b2c-c2b/clients/get-clients-controller';
import { getPackageController } from '../controllers/b2c-c2b/packages/get-package-controller';
import { updateStoreStatusController } from '../controllers/b2c-c2b/store/update-store-status-controller';
import { verifyContractFeatures } from '../controllers/contract-feature/verify-contract-features'
import userRegistrationFormDataController from '../controllers/client/user-registration-form-details';

import { validateVerifyContractFeatures } from '../middlewares/contract-features/verify-contract-features';
import { getBasicSmartContractFee } from '../controllers/b2c-c2b/basic-smart-contract-fee/get-basic-smart-contract-fee';

import { getFreePackageController } from '../controllers/b2c-c2b/packages/get-free-package-controller';

const router = express.Router();


router.get('/package/:id', getPackageMiddleware, getPackageController);
router.get('/get-registration-data', userRegistrationFormDataController);
router.put('/update-store-status', updateStoreStatusController);
router.get('/get-clients', getClientsController);
router.post('/verify-contract-features', validateVerifyContractFeatures, verifyContractFeatures);
router.get('/basic-smart-contract-fee', getBasicSmartContractFee);
router.get('/free-package', getFreePackageController)

export { router as B2CC2BRouter }