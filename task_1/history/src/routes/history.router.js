import { Router } from 'express';
import { HistoryController } from '../controllers/history.controller.js';
import { validateFindAll } from '../constants/validate-find-all.js';
import { handleValidationErrors } from '../middlewares/handle-validation.meddleware.js';
import { validateHistoryAction } from '../constants/validate-create-history.js';

const router = Router();
const historyController = new HistoryController();

router.get(
  '/find-all',
  validateFindAll,
  handleValidationErrors,
  historyController.findAll.bind(historyController),
);
router.post(
  '/create',
  validateHistoryAction,
  handleValidationErrors,
  historyController.create.bind(historyController),
);

export default router;
 