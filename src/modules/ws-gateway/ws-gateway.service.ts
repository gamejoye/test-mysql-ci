import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { WebSocketEvent } from 'src/common/constants/websocketEvents';
import { IWebSocketMessage } from 'src/common/types/base.type';
import { Server, WebSocket } from 'ws';
import { USER_REPOSITORY } from 'src/common/constants/providers';
import { Repository } from 'typeorm';
import { AUTHORIZATION } from 'src/common/constants/websocketHeaders';
import * as jwt from 'jsonwebtoken';
import { EnvConfigService } from '../env-config/env-config.service';
import { websocketRetry } from 'src/common/utils';

@Injectable()
export class WsGatewayService implements OnModuleInit, OnModuleDestroy {
  private wss: Server;
  private onlineClients: Map<number, WebSocket>;
  constructor(protected readonly envConfigService: EnvConfigService) {}

  onModuleInit() {}

  onModuleDestroy() {
    this.wss.close(() => {});
  }
}
