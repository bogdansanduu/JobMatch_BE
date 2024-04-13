import { validate, ValidationError } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { InvalidException } from '../exceptions/invalid.exception';

export const validateBody = async <T extends Object>(body: any, schema: ClassConstructor<T>) => {
  const instance = plainToInstance(schema, body);

  const errors: ValidationError[] = await validate(instance);

  if (errors.length > 0) {
    throw new InvalidException(
      errors.reduce((acc: string, error: ValidationError) => {
        const constraints = error.constraints;

        if (!constraints) {
          return acc;
        }

        return acc + Object.values(constraints).join('; ') + '; ';
      }, '')
    );
  }
};
