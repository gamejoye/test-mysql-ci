import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EnvConfigModule } from './modules/env-config/env-config.module';
import { WsGatewayModule } from './modules/ws-gateway/ws-gateway.module';
import { LoggerMiddleWare } from './common/middlewares/logger.middleware';

@Module({
  imports: [EnvConfigModule, WsGatewayModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
