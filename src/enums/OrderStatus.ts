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
export enum Status {
  USED = '已使用',
  UNUSED = '即將開始',
  CANCEL = '已取消',
}
export enum DefaultStatus {
  Payment_Status = PaymentStatus.PENDING,
  Payment_Method = PaymentMethod.CREDIT_CARD,
  STATUS = Status.UNUSED,
}
