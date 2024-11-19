import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
export function validateDto(dtoClass, source = 'body') {
    return async (req, res, next) => {
        const dtoObject = plainToClass(dtoClass, req[source], { enableImplicitConversion: true });
        const errors = await validate(dtoObject);
        if (errors.length > 0) {
            const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', '));
            res.status(400).json({ message: 'Validation failed', errors: errorMessages });
            return;
        }
        next();
    };
}
