import { Core, Plugin, PluginEvent } from '@monitor-fe/core';
import { localStore } from '../utils/storage';

export const SDK_VERSION = __VERSION__;

if (window.__FRONTEND_CONFIG__) {
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
  saveToCache(events: PluginEvent[]): void {
    localStore.set('trackQueue', events);
  }

  send(event: PluginEvent): void {
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/event', JSON.stringify(event));
    } else {
    }
  }
}

export class JSErrorPlugin extends Plugin {
  init(config: { onEvent: (event: PluginEvent) => void }): void {}
}

export function init(options) {
  const bc = new BrowserCore({
    projectId: 'browser1',
    config: {},
    hostname: '0.0.0.0',
    plugins: [new JSErrorPlugin()],
  });
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
