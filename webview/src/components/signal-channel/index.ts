import Channel from "cs-channel";

export enum IActionType {
  HELLO = "hello",
  GENERATE_SNIPPETS = "generate-snippets",
  GENERATE_CODE = "generate-code",
}

export type IActionTypes =
  | IActionType.HELLO
  | IActionType.GENERATE_SNIPPETS
  | IActionType.GENERATE_CODE;

export type IDragMessage = {
  id: number;
  name: string;
  cover: string;
};

export type IFormMessage = {
  id: number;
  type: string;
};

export type ICodeMessage = {
  project: string;
  clientDir: string;
  nodeDir: string;
  dirname: string;
};

export interface IAction<T extends IActionTypes, U extends any> {
  type: T;
  data: U;
}

export type ISignalChannelAction =
  | IAction<IActionType.HELLO, Array<IDragMessage>>
  | IAction<IActionType.GENERATE_SNIPPETS, Array<IFormMessage>>
  | IAction<IActionType.GENERATE_CODE, ICodeMessage>;

/**
 * vscode & webview 通信（须为单例，acquireVsCodeApi仅可调用一次）
 * - https://ithelp.ithome.com.tw/articles/10247668
 */
class SignalChannel {
  channel?: Channel;

  constructor() {
    this.channel = this.establishSignalChannel();
  }

  establishSignalChannel() {
    if (!window.acquireVsCodeApi) return;
    const vscode = window.acquireVsCodeApi();
    const channel = new Channel({
      sender: (message) => void vscode.postMessage(message),
      receiver: (callback) => {
        window.addEventListener("message", (event: { data: any }) => {
          event && event.data && callback(event.data);
        });
      },
    });
    return channel;
  }

  postMessage(action: ISignalChannelAction) {
    if (!this.channel) return;
    this.channel.call(action.type, action.data);
  }
}

export default new SignalChannel();
