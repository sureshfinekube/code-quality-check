import express from 'express';
const router = express.Router();


/* IMPORTING MODULES */

import { addDomainController } from '../controllers/client/add-domain';
import getDomainController from '../controllers/client/get-domain';
import {updateDomainController} from '../controllers/client/update-domain'

/* END OF IMPORTING MODULES */

/* API HANDLERS */

router.post('/add-domain', addDomainController);
router.put('/domain', updateDomainController)
router.get('/get-base-domain', getDomainController);


/* END OF API HANDLERS */

const ClientApi = router;

export default ClientApi;


