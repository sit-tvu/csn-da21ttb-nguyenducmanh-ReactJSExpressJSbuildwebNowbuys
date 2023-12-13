

import { Router } from 'express';
const router = Router();
 
import {AddressController} from '../../controllers/index.js'; 

router.post('/add', AddressController.addAddress)
router.post('/update', AddressController.updateAddress)
router.post('/for-user/get', AddressController.getAddressForUser)

router.post('/search/get', AddressController.searchAddress)
router.post('/provinces/all', AddressController.getAllProvinces)
router.post('/districts/dependent', AddressController.getDistrictsDependent)
router.post('/wards/dependent', AddressController.getWardsDependent)

export default router