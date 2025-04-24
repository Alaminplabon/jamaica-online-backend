import express from 'express'
import { DoctorController } from './doctor.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorValidation } from './doctor.validation';

const router = express.Router();

router.get('/', DoctorController.getAllDoctors);

router.get('/:id', DoctorController.getByIdDoctor);

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    validateRequest(DoctorValidation.update),
    DoctorController.updateDoctor
);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    DoctorController.deleteDoctor
);

router.delete(
    '/soft/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    DoctorController.softDelete);


export const DoctorRoutes = router