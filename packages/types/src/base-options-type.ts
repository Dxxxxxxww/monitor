// 总的错误信息
export interface ErrorMessage {
  // 错误类型
  type: 'error' | 'warn' | 'info';
  // 错误信息
  message: string | Event;
  // 行号
  lineNo?: number;
  // 列号
  columnNo?: number;
  // 堆栈信息
  stack?: string;
  // 批量错误上报时需要分组
  priority?: 3 | 2 | 1;
  // 创建时间
  created: string | Date;
}

export type ErrorParameters = Pick<
  ErrorMessage,
  'type' | 'message' | 'lineNo' | 'columnNo' | 'stack'
>;

export interface CoreOptions {
  projectId: string;
  hostname?: string;
  plugins?: BasePluginsType[];
}

export interface BasePluginsType {
  init(config: { onEvent: (event: ErrorMessage) => void }): void;
  transform(e: Event | ErrorEvent): ErrorParameters;
}
