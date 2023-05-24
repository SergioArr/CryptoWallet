import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MaxDecimals(maxDecimals: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'maxDecimals',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxDecimals],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number') {
            return false;
          }

          const [maxDecimals] = args.constraints;
          const decimalCount = value.toString().split('.')[1]?.length || 0;
          return decimalCount <= maxDecimals;
        },
        defaultMessage(args: ValidationArguments) {
          const [maxDecimals] = args.constraints;
          return `The amount must have up to ${maxDecimals} decimal places`;
        },
      },
    });
  };
}