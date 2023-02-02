import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

export class ValidationBodyPipe implements PipeTransform {
  constructor (private schema: ObjectSchema) {}

  transform(value : any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value)
    if (error) {
      throw new BadRequestException('Validation failed');
    } 

    return value;
  }
}