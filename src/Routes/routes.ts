import express from 'express';
import * as controllers from '../Controllers/MembersController';

const router = express.Router();

router.post('/members', controllers.registerMember);
router.put('/members/:id', controllers.updateMember);
router.get('/members/:id', controllers.fetchOneMember);
router.delete('/members/:id', controllers.deleteMember);

export default router;
