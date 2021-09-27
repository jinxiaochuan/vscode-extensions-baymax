declare type INodeEnv = 'test' | 'production' | 'development' | 'debug';

type doLog = (...message: (string | number)[]) => void;
declare interface Logger {
  info: doLog;
  debug: doLog;
  warn: doLog;
  error: doLog;
}
