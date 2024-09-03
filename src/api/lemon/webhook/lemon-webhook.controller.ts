import { NextFunction, Request, Response } from "express";
import { LemonSqueezyOrder } from "../../../types/order";
import orderService from "../../order/order.service";
import DatabaseError from "../../../errors/DatabaseError";

class LemonWebHookController {
  async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      const lemonSqueezyOrder : LemonSqueezyOrder = JSON.parse(req.body);
      
      const responseStatus = {status: 200, message: 'Order refunded' };

      switch (lemonSqueezyOrder.meta.event_name) {
        case 'order_created':
          const order = await orderService.webhookCreateOder(lemonSqueezyOrder);
          if (!order) throw new DatabaseError('Order not created');
          responseStatus.status = 201;
          responseStatus.message = 'Order created';
          break;
        case 'order_refunded':
          await orderService.webhookRefundOrder(lemonSqueezyOrder);
          break;
      }

      res.status(responseStatus.status).json(responseStatus);
    } catch (e) {
      next(e);
    }
  }
}

export default new LemonWebHookController();