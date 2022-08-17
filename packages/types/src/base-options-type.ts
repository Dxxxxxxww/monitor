// 避免 enum 枚举
// 避免名字空间 namespace
// 避免装饰器，尽量等到这个语法标准化完成。如果你需要一个库用装饰器，要考虑它的标准化状态。
// 尽量用 #somePrivateField而不是private somePrivateField.（译者注：此条个人持保留态度）

export const Priority = {
  Error: 3,
  Warn: 2,
  Info: 1,
} as const;

export type ValueOf<T> = T[keyof T];

export type PriorityType = ValueOf<typeof Priority>;

// 总的错误信息
export interface ErrorMessage {
  // 错误类型
  type: 'error' | 'warn' | 'info';
  // 错误信息
  message: string | Event;
  // 行号
  lineno?: number;
  // 列号
  colno?: number;
  // 堆栈信息
  stack?: string;
  // 批量错误上报时需要分组
  // 禁用枚举 https://www.zhihu.com/question/60168510/answer/2320750226
  priority?: PriorityType;
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
