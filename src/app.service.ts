import { Inject, Injectable, Scope } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG') private config: { port: string },
  ) {}
  getHello(): string {
    return `Hello World Bos! ${this.devConfigService.getDBHOST()} PORT: ${this.config.port}`;
  }
}
