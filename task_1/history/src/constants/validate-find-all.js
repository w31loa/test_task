import { query } from "express-validator";

export const validateFindAll = [
    query('plu').optional().isString().withMessage('PLU must be string'),

    query('shop_id')
      .optional()
      .isInt({ min: 0 })
      .withMessage('shop_id must be number and more than or equals 0'),

    query('date_from')
      .optional()
      .isISO8601()
      .withMessage('date_from format is YYYY-MM-DD'),

    query('date_to')
      .optional()
      .isISO8601()
      .withMessage('date_to format is YYYY-MM-DD') 
      .custom((value, { req }) => {
        if (
          req.query.date_from &&
          new Date(value) < new Date(req.query.date_from)
        ) {
          throw new Error('date_to cant be early than date_from');
        }
        return true;
      }),

    query('action')
      .optional()
      .isString()
      .withMessage('action must be ACTION_TYPE enum'),
  ]