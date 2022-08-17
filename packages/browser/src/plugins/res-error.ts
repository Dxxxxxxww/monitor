import { BasePlugin } from '@monitor-fe/core';
import { ErrorMessage } from '@monitor-fe/types';
import { formatDate } from '@monitor-fe/share';
// 资源加载错误 js/css/img
// type target(加载资源的标签) 有用，target.src target.href 可以使用target 的标签类型/标签名来判断是啥标签。src表示资源地址
export class ResErrorPlugin extends BasePlugin {
  init(config: { onEvent: (event: ErrorMessage) => void }): void {
    window.addEventListener(
      'error',
      (e: ErrorEvent) => {
        const params = this.transform(e);
        config.onEvent(params);
      },
      true
    );
  }
  transform(e: Event): ErrorMessage {
    const { type, target } = e;
    return {
      type: 'error',
      message: ((event as string) || error?.message) ?? '',
      lineno: 0,
      colno: 0,
      stack: '',
      priority: 3,
      created: formatDate(new Date()),
    };
  }
}
