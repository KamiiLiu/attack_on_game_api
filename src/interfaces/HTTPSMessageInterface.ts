export interface IHTTPSMessage {
  SUCCESS_CREATED: string;
  SUCCESS_REQUEST: string;
  SUCCESS_UPDATE: string;
  [key: string]: string;
  FAILED_VALIDATION: string;
  FAILED_FOUND: string;
  FAILED_AUTHORIZATION: string;
  FAILED_CREATION: string;
  FAILED_UPDATE: string;
  FAILED_DELETION: string;
  FAILED_OPERATION: string;
  SYSTEM_ERROR: string;
  UNKNOWN_ERROR: string;
}
