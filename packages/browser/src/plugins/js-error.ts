import { BasePlugin } from '@monitor-fe/core';
import { ErrorMessage } from '@monitor-fe/types';
import { formatDate } from '@monitor-fe/share';

// 获取 window.onerror 的参数类型
type OnErrorParameters = Parameters<OnErrorEventHandlerNonNull>;

export class JSErrorPlugin extends BasePlugin {
  init(config: { onEvent: (event: ErrorMessage) => void }): void {
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
    const [event, _, lineno, colno, error] = args;

    return {
      type: 'error',
      message: ((event as string) || error?.message) ?? '',
      lineno,
      colno,
      stack: error?.stack,
      priority: 3,
      created: formatDate(new Date()),
    };
  }
}
