import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import router from "./router/router";
import cookieParser from "cookie-parser";
import Csrf from "./utils/csrf-protection";
import BaseError from "./errors/BaseError";
import webHookRouter from "./bundles/lemon/webhook/lemon-webhook.router";
dotenv.config();

const app: Express = express();
const csrf = new Csrf(process.env.CSRF_SECRET as string);

app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
));

app.use(helmet());

/**
 * WEBHOOK ROUTE
 */
app.use('/api/lemon/webhook', express.raw({ type: '*/*' }), webHookRouter );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: '*/*' }));

app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(csrf.setCsrfCookie);
app.use(csrf.csrfProtection);


app.use(router);

app.use((err: Error | BaseError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  let error;
  let status = 500;

  if (err instanceof BaseError) {
    error = process.env.NODE_ENV === 'development' ? err.message : "Internal Server Error";
    status = err.httpCode;
  }
  else {
    error = "Internal Server Error";
  }

  res.status(status).send({ error });
});

app.use((req: Request, res: Response) => {
  const requrl = req.url;
  console.log('requrl: ', requrl);
  res.status(404).send("404: Page not Found");
});

export default app;



