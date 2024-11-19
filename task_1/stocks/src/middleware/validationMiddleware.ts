import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto(dtoClass: any, source: 'body' | 'query' | 'params' = 'body') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoObject = plainToClass(dtoClass, req[source], { enableImplicitConversion: true }); 
    
    const errors = await validate(dtoObject); 

    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', '));
      res.status(400).json({ message: 'Validation failed', errors: errorMessages });
      return
    }

    next(); 
  };
}
