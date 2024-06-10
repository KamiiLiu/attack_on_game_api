import { OrderController } from '@/controllers/orderController';
// import { jwtAuthenticator } from '../middlewares/auth';
import { handleValidationErrors } from '@/middlewares/handleValidationErrors';
import { OrderValidator } from '@/validators/orderValidator';
import { BaseRouter } from '@/routers/baseRouter';

class OrderRouter extends BaseRouter {
  protected controller!: OrderController;
  constructor() {
    super();
    this.initializeRoutes();
  }
  protected initializeRoutes(): void {
    this.controller = new OrderController();
    this.setRouters();
  }
  protected setRouters(): void {
    this.router.post(
      '/',
      OrderValidator.validateOrder(),
      handleValidationErrors,
      this.handleRequest(this.controller.create),
    );
  }
}
export default new OrderRouter().router;