import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import { LemonSqueezyOrder } from "../../types/order";

class OrderService {
  create = async (data: any) => {
    return prisma.order.create({
      data,
    });
  }

  webhookCreateOder = async (lemonSqueezyOrder: LemonSqueezyOrder) => {
    const orderData: Prisma.OrderUncheckedCreateInput = {
      lemon_order_id: parseInt(lemonSqueezyOrder.data.id),
      lemon_customer_id: lemonSqueezyOrder.data.attributes.customer_id,
      lemon_receipt_link: lemonSqueezyOrder.data.attributes.urls.receipt,
      lemon_store_id: lemonSqueezyOrder.data.attributes.store_id,
      lemon_order_number: lemonSqueezyOrder.data.attributes.order_number,
      lemon_product_id: lemonSqueezyOrder.data.attributes.first_order_item.product_id,
      lemon_variant_id: lemonSqueezyOrder.data.attributes.first_order_item.variant_id,
      currency: lemonSqueezyOrder.data.attributes.currency,
      status: lemonSqueezyOrder.data.attributes.status,
      refunded_at: lemonSqueezyOrder.data.attributes.refunded_at ? new Date(lemonSqueezyOrder.data.attributes.refunded_at) : null,
      total_price: lemonSqueezyOrder.data.attributes.total, 
      user_id: parseInt(lemonSqueezyOrder.meta.custom_data.userid), 
    }

    return prisma.order.create({ data: orderData });
  }

  webhookRefundOrder = async (lemonSqueezyOrder: LemonSqueezyOrder) => {
    return prisma.order.update({
      where: {
        lemon_order_id: parseInt(lemonSqueezyOrder.data.id),
      },
      data: {
        status: 'refunded',
        refunded_at: lemonSqueezyOrder.data.attributes.refunded_at ? new Date(lemonSqueezyOrder.data.attributes.refunded_at) : null,
      }
    });
  }
}

export default new OrderService();