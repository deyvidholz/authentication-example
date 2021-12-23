import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { Server } from 'http';
import path from 'path';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { corsConfig } from './config/cors.config';
import { userRepository } from './modules/user/user.repository';
import router from './app/routes';

export class App {
  public express: express.Application;
  private server: Server;

  constructor() {
    this.setupExpress();
    this.setupPassport();
    this.setupDatabase();
  }

  private setupExpress() {
    this.express = express();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors(corsConfig));
    this.express.use(router);
    this.express.use('/', express.static(path.join(__dirname, '..', 'public')));
  }

  private setupPassport() {
    const extractJWT = passportJWT.ExtractJwt;
    const JWTStrategy = passportJWT.Strategy;

    const JWTOptions = {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    };

    let strategy = new JWTStrategy(JWTOptions, async function (
      JWTPayload,
      next
    ) {
      const id = JWTPayload.id;
      const user = await userRepository().findOne(id);

      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });

    passport.use(strategy);
    this.express.use(passport.initialize());
  }

  private setupDatabase() {
    createConnection().then();
  }

  listen(): Server {
    const port: number = +process.env.PORT || 3000;

    this.server = this.express.listen(port, () =>
      console.log(`Application running on ${port}`)
    );

    return this.server;
  }
}
