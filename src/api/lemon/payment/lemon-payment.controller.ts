import { Request, Response, NextFunction } from 'express';
import { lemonSqueezyApiInstance } from './lemon-axios.instance';

class PaymentController {
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await lemonSqueezyApiInstance.post('/checkouts', {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data : {
              custom : {
                userid: req.user ? req.user.id.toString() : null,
              },
              billing_address: {
                country: "FR",
              },
              email: req.user ? req.user.email : "",
            },     
            checkout_options: {
              "embed": true
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEEZY_STORE_ID
              }
            },
            variant: {
              data: {
                type: "variants",
                id: req.body.variantId
              }
            }
          }
        }
      })
      
      const url = response.data.data.attributes.url

      res.status(200).json(url);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
}

export default new PaymentController();