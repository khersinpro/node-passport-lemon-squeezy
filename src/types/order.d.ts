export type LemonSqueezyOrder = {
  data: {
      id: string;
      type: string;
      links: {
          self: string;
      };
      attributes: {
          tax: number;
          urls: {
              receipt: string;
          };
          total: number;
          status: string;
          tax_usd: number;
          currency: Currency;
          refunded: boolean;
          store_id: number;
          subtotal: number;
          tax_name: string;
          tax_rate: number;
          setup_fee: number;
          test_mode: boolean;
          total_usd: number;
          user_name: string;
          created_at: string;
          identifier: string;
          updated_at: string;
          user_email: string;
          customer_id: number;
          refunded_at: string | null;
          order_number: number;
          subtotal_usd: number;
          currency_rate: string;
          setup_fee_usd: number;
          tax_formatted: string;
          tax_inclusive: boolean;
          discount_total: number;
          total_formatted: string;
          first_order_item: {
              id: number;
              price: number;
              order_id: number;
              price_id: number;
              quantity: number;
              test_mode: boolean;
              created_at: string;
              product_id: number;
              updated_at: string;
              variant_id: number;
              product_name: string;
              variant_name: string;
          };
          status_formatted: string;
          discount_total_usd: number;
          subtotal_formatted: string;
          setup_fee_formatted: string;
          discount_total_formatted: string;
      };
      relationships: {
          store: {
              links: {
                  self: string;
                  related: string;
              };
          };
          customer: {
              links: {
                  self: string;
                  related: string;
              };
          };
          "order-items": {
              links: {
                  self: string;
                  related: string;
              };
          };
          "license-keys": {
              links: {
                  self: string;
                  related: string;
              };
          };
          subscriptions: {
              links: {
                  self: string;
                  related: string;
              };
          };
          "discount-redemptions": {
              links: {
                  self: string;
                  related: string;
              };
          };
      };
  };
  meta: {
      test_mode: boolean;
      event_name: string;
      webhook_id: string;
      custom_data: {
          userid: string;
      };
  };
}

export interface CreateOrderInput {
  lemon_order_id?: number | null;
  lemon_customer_id?: number | null;
  lemon_receipt_link?: string | null;
  lemon_store_id?: number | null;
  lemon_order_number?: number | null;
  lemon_product_id?: number | null;
  lemon_variant_id?: number | null;
  currency?: string | null;
  status?: string | null;
  refunded_at?: Date | null;
  total_price?: number | null;
  user_id: number;
}

export interface Order extends CreateOrderInput {
  id: number;
}