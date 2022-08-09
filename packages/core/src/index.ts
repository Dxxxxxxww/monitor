export interface EventOption {
  type: 'error' | 'warn' | 'info';
  message: string | Event;
  lineNo: number;
  columnNo: number;
  stack: string;
  // 批量错误上报时需要分组
  priority: 3 | 2 | 1;
  created?: string;
}

export interface CoreOptions {
  projectId: string;
  hostname?: string;
  plugins?: Plugin[];
}

export abstract class Plugin {
  public options: object | undefined;
  constructor(options?: object) {
    this.options = options;
  }
  // config 和 options 的复杂冗余配置问题后续再优化
  abstract init(config: { onEvent: (event: EventOption) => void }): void;
}

export abstract class Core {
  public options: CoreOptions;
  public plugins: Plugin[] = [];
  public events: EventOption[] = [];

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

  handleEvent(event: EventOption) {
    if (this.events.length && event.priority > this.events[0].priority) {
      this.events.unshift(event);
    } else {
      this.events.push(event);
    }
    this.saveToCache(this.events);
    this.requestIdleCallback(this.checkQueue);
  }

  abstract saveToCache(events: EventOption[]): void;
  abstract requestIdleCallback(callback: () => void): void;
  abstract send(event: EventOption): void;
}
