import { BasePlugin } from '@monitor-fe/core';
import { ErrorMessage } from '@monitor-fe/types';

// 获取 window.onerror 的参数类型
type OnErrorParameters = Parameters<OnErrorEventHandlerNonNull>;

export class JSErrorPlugin extends BasePlugin {
  init(config: { onEvent: (event: ErrorMessage) => void }): void {
    // config.onEvent();
    // 资源加载错误 js/css/img
    // type target(加载资源的标签) 有用，target.src target.href 可以使用target 的标签类型/标签名来判断是啥标签。src表示资源地址
    window.addEventListener(
      'error',
      (e) => {
        const params = this.transform(e);
        config.onEvent(params);
      },
      true
    );

    // 常规js运行错误 异步错误
    window.onerror = (...args) => {
      const formattedData = this.transform(...args);
      config.onEvent(formattedData);
    };

    // Promise错误
    // promise 报错只有 type 和 reason 有用
    // reason 就是 reject 出来的东西，any类型
    window.addEventListener('unhandledrejection', (e) => {
      let message: string;
      if (typeof e.reason === 'string') {
        message = e.reason;
      } else if (typeof e.reason === 'object' && e.reason.stack) {
        message = e.reason.stack;
      }
      const prErr: BrowserPrErrType = {
        message,
      };
      this.processer.trackEvent({
        type: 'promiseError',
        msg: prErr,
        time: getTimestamp(),
      });
    });
  }

  transform(...args: OnErrorParameters): ErrorMessage {
    return {};
  }
}
