import { Test, TestingModule } from '@nestjs/testing';
import { WsGatewayService } from './ws-gateway.service';
import { wsGatewayProviders } from './ws-gateway.providers';
import { DatabaseModule } from '../database/database.module';
import { EnvConfigModule } from '../env-config/env-config.module';
import * as path from 'path';
import { exec } from 'child_process';
import { EnvConfigService } from '../env-config/env-config.service';
import { Repository } from 'typeorm';
import {
  CHATROOM_REPOSITORY,
  USER_REPOSITORY,
} from 'src/common/constants/providers';
import { ChatroomType } from 'src/common/constants/chatroom';
import { getCurrentDatetime, mockJwt } from 'src/common/utils';
import { WebSocket } from 'ws';
import { AUTHORIZATION } from 'src/common/constants/websocketHeaders';
import { IWebSocketMessage } from 'src/common/types/base.type';
import { WebSocketEvent } from 'src/common/constants/websocketEvents';
import { Logger } from 'src/common/utils';

describe('WsGatewayService', () => {
  let wsGatewayService: WsGatewayService;
  let envConfigService: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, EnvConfigModule],
      providers: [...wsGatewayProviders, WsGatewayService],
      exports: [WsGatewayService],
    }).compile();

    wsGatewayService = module.get<WsGatewayService>(WsGatewayService);
    envConfigService = module.get<EnvConfigService>(EnvConfigService);

    wsGatewayService.onModuleInit();

    const sqlFilePath = path.join(__dirname, '../../../test/testdb.sql');
    await new Promise<void>((resolve, reject) => {
      const databaseConfig = envConfigService.getDatabaseConfig();
      Logger.test(databaseConfig);
      Logger.test(
        `mysql -h ${databaseConfig.host} --port ${databaseConfig.port} -u ${databaseConfig.username} -p${databaseConfig.password} ${databaseConfig.database} < ${sqlFilePath};`,
      );
      exec(
        `mysql -h ${databaseConfig.host} --port ${databaseConfig.port} -u ${databaseConfig.username} -p${databaseConfig.password} ${databaseConfig.database} < ${sqlFilePath};`,
        (error) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return reject(error);
          }
          resolve();
        },
      );
    });
  });

  afterEach(async () => {
    wsGatewayService.onModuleDestroy();
  });

  it('should be defined', () => {
    expect(wsGatewayService).toBeDefined();
    expect(envConfigService).toBeDefined();
  });

  it('notifyChat should work correctly', async () => {});
});
