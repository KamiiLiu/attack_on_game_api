export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
}
export enum DefaultQuery {
  Payment_Status = PaymentStatus.PENDING,
  Payment_Method = PaymentMethod.CREDIT_CARD,
}
