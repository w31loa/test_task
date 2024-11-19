import { body } from "express-validator";

export const validateHistoryAction = [
    body('action')
      .isIn(['CREATE', 'UPDATE'])
      .withMessage('Action must be either "CREATE" or "UPDATE"'),
    body('target')
      .isIn(['PRODUCT', 'STOCK'])
      .withMessage('Target must be either "PRODUCT" or "STOCK"'),
    body('productPlu')
      .isString()
      .withMessage('Product PLU must be a string'),
    body('shopId')
      .isInt({ min: 1 })
      .withMessage('Shop ID must be a positive integer'),
    body('payload')
      .isString()
      .withMessage('Payload must be a string'),
    // Дополнительно можно добавить валидацию на обязательность некоторых полей
    body('action').notEmpty().withMessage('Action is required'),
    body('target').notEmpty().withMessage('Target is required'),
    body('productPlu').notEmpty().withMessage('Product PLU is required'),
    body('shopId').notEmpty().withMessage('Shop ID is required'),
    body('payload').notEmpty().withMessage('Payload is required'),
  ];