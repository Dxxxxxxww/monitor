import { CoreOptions, ErrorMessage } from '@monitor-fe/types';

export abstract class Core {
  public options: CoreOptions;
  public plugins: Plugin[] = [];
  public events: ErrorMessage[] = [];

  constructor(options: CoreOptions) {
    this.options = options;
    if (options.plugins) {
      this.plugins = [...this.plugins, ...options.plugins];
    }
  }

  init() {
    for (const plugin of this.plugins) {
      plugin.init({
        onEvent: this.handleEvent,
      });
    }
  }

  checkQueue() {
    // 报错优化，错误立即上报，性能监控积累上报
    const event = this.events.shift();
    if (event) {
      this.send(event);
      this.saveToCache(this.events);
    }
  }

  handleEvent(event: ErrorMessage) {
    if (this.events.length && event.priority > this.events[0].priority) {
      this.events.unshift(event);
    } else {
      this.events.push(event);
    }
    this.saveToCache(this.events);
    this.requestIdleCallback(this.checkQueue);
  }

  abstract saveToCache(events: ErrorMessage[]): void;
  abstract requestIdleCallback(callback: () => void): void;
  abstract send(event: ErrorMessage): void;
}
