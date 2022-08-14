import { ErrorMessage } from '@monitor-fe/types';

export abstract class BasePlugin {
  public options: object | undefined;
  constructor(options?: object) {
    this.options = options;
  }
  // config 和 options 的复杂冗余配置问题后续再优化
  abstract init(config: { onEvent: (event: ErrorMessage) => void }): void;

  abstract transform(e: any): ErrorMessage;
}
