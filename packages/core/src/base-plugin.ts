import { ErrorMessage } from '@monitor-fe/types';
import { BasePluginsType } from '@monitor-fe/types/src';

export interface BasePluginInitConfig {
  onEvent: (event: ErrorMessage) => void;
  // 防止低版本浏览器如果 window.addEventListener 不能捕获 js 错误，
  // 需要使用 window.onerror 来捕获时，提供一个开关来防止两个错误收集插件收集相同报错
  isCatchJSError?: boolean;
}

export abstract class BasePlugin implements BasePluginsType {
  public options: object | undefined;
  constructor(options?: object) {
    this.options = options;
  }
  // config 和 options 的复杂冗余配置问题后续再优化
  abstract init(config: BasePluginInitConfig): void;

  abstract transform(e: any): ErrorMessage;
}
