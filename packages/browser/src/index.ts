import { Core, Plugin, ErrorOption, ErrorParameters } from '@monitor-fe/core';
import type { CoreOptions } from '@monitor-fe/core';
import { localStore } from '../utils/storage';

// @ts-ignore
export const SDK_VERSION = __VERSION__;

// @ts-ignore
if (window.__FRONTEND_CONFIG__) {
  // @ts-ignore
  init(window.__FRONTEND_CONFIG__.id, window.__FRONTEND_CONFIG__.options);
}

const requestIdleCallback =
  window.requestIdleCallback ||
  window.requestAnimationFrame ||
  ((callback) => {
    setTimeout(callback, 1000 / 30);
  });

export class BrowserCore extends Core {
  requestIdleCallback(callback: () => void): void {
    requestIdleCallback(callback);
  }
  // 页面恢复过来后，还需要结合当前需要上送的数据进行优先级排布上送
  saveToCache(events: ErrorOption[]): void {
    localStore.set('trackQueue', events);
  }

  send(event: ErrorOption): void {
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/event', JSON.stringify(event));
    } else {
    }
  }
}

export class JSErrorPlugin extends Plugin {
  init(config: { onEvent: (event: ErrorParameters) => void }): void {
    // config.onEvent();
    // 资源加载错误 js/css/img
    // type target(加载资源的标签) 有用，target.src target.href 可以使用target 的标签类型/标签名来判断是啥标签。src表示资源地址
    window.addEventListener(
      'error',
      (e) => {
        config.onEvent({
          type: 'error',
          message: resErr,
        });
      },
      true
    );

    // 常规js运行错误 异步错误
    window.onerror = (message, _, lineNo, columnNo, error) => {
      config.onEvent({
        message,
        lineNo: lineNo ?? 0,
        columnNo: columnNo ?? 0,
        stack: error?.stack ?? '',
        type: 'error',
      });
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
}

export function init(options: CoreOptions) {
  const bc = new BrowserCore({
    projectId: options.projectId,
    hostname: options.hostname,
    plugins: [new JSErrorPlugin()],
  });
  bc.init();
}

// 排队优化
// 缓存优化
// 发送优化
// 聚合优化，数据大小限制优化=》sendBeacon 有数据大小的限制
// redis 消息队列，redis 的问题，重启数据就没了，数据积压

// 数据分页加载时，在翻页的时候正好加了新数据，这时候怎么解决第二页有第一页数据的问题？
// 解决方法：用当前页的最后一条数据id为基准，而不是用页码为基准，翻页的时候按照当前页最后一条数据的id后20条来翻页。

// 设计库，架构的两个重点
// 增加约束点，扩展点

// 了解 wasm   pm2=》后台保活执行
// pm2 1.线上预警：报错日志，服务器cpu 内存 磁盘
// 2. 线上日志
// 日志切割，按年月日等等。

// 试下开启 sourcemap

// 查看 E组的 webpack 的sourcemap 上传插件

// node 监控报错  onerror
// process.on('uncaughtException', (err) => {
//   console.err('发未知错误', err);
//   // 钉钉推送
//   // DingDing.send('');
//   // 记录日志
//   // logger.info(error)
// });

// 抓性能数据，使用 performance api  window.performance

// FMP 首次有意义的绘制内容  first meaning paint，这个根据业务不同而不同，比如说电商就是商品。

// rrweb 性能优化
