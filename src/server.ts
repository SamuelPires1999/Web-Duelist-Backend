import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { graphqlHTTP } from 'koa-graphql';
import KoaLogger from 'koa-logger';
import Router from 'koa-router';
import { connectDatabase } from './database';
import { graphqlSettingsPerReq } from './utils/graphqlSettingsPerReq';
import { config } from './config';

export const setupServer = () => {
  const app = new Koa();
  const router = new Router();

  // database setup
  try {
    connectDatabase();
  } catch (err) {
    console.log('error connecting with database', err);
  }

  app.use(cors());
  app.use(KoaLogger());
  app.use(bodyParser());

  const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);
  router.all('/healthCheck', ctx => {
    ctx.body = 'API WORKING';
  });
  router.all('/graphql', graphqlServer);
  router.all(
    '/graphiql',
  );

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(config.PORT);

  return app;
};