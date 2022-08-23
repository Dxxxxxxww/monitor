import { BasePlugin, BasePluginInitConfig } from '@monitor-fe/core';
import { ErrorMessage } from '@monitor-fe/types';
import { formatDate } from '@monitor-fe/share';

/**
 * window.addEventListener('error',() => {}) 可以接收到 js 错误以及资源加载错误。
 * 查阅资料都说 js 错误使用 window.onerror 来接收。我这里可以，可能是 chrome 版本高的原因。
 * 没有尝试过低版本情况，如果低版本不行，则可以创建一个 window.onerror 的 plugin 来进行接收错误。
 */

// 资源加载错误 js/css/img 携带以下三个参数，故声明一个类型
interface ResourceTarget {
  href?: string;
  src?: string;
  localName?: string;
}

export class ResErrorPlugin extends BasePlugin {
  init(
    config: BasePluginInitConfig = {
      onEvent: () => undefined,
      isCatchJSError: true
    }
  ): void {
    // addEventListener error js 报错， resource 报错都能捕获
    window.addEventListener(
      'error',
      (e: ErrorEvent) => {
        const params = this.transform(e);
        config.onEvent(params);
      },
      true
    );
  }

  transform(e: ErrorEvent): ErrorMessage {
    const { error } = e;
    if (error) {
      return ResErrorPlugin.jsErrorTransform(e);
    }
    return ResErrorPlugin.resourceErrorTransform(e);
  }

  private static jsErrorTransform(e: ErrorEvent): ErrorMessage {
    const { message, lineno, colno, error } = e;

    return {
      type: 'error',
      message,
      lineno,
      colno,
      stack: error?.stack,
      priority: 3,
      created: formatDate(new Date())
    };
  }
  // type target(加载资源的标签) 有用，target.src target.href 可以使用target 的标签类型/标签名来判断是啥标签。src表示资源地址
  private static resourceErrorTransform(e: ErrorEvent): ErrorMessage {
    const target = e.target as ResourceTarget;
    const message = `${target.localName} get resource error: ${
      target.src || target.href
    }`;

    return {
      type: 'error',
      message,
      lineno: 0,
      colno: 0,
      stack: '',
      priority: 3,
      created: formatDate(new Date())
    };
  }
}
