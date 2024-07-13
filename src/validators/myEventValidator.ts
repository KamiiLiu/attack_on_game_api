import { validationConfig } from '@/config/validators/myEventConfig';
export class EventValidator {
  static validateEventBody(parameters: string) {
    return validationConfig.body[parameters];
  }

  static validateEventQuery() {
    return Object.values(validationConfig.query).flat();
  }

  static validateEventParam(parameters: string) {
    return validationConfig.param[parameters];
  }
}
