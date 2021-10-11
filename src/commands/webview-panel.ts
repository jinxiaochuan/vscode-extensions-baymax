import {
  ExtensionContext,
  ViewColumn,
  WebviewPanel,
  window,
  commands,
} from "vscode";
import fetch from "node-fetch";
import Channel from "cs-channel";
import {
  DEV_WEBVIEW_PORT,
  DEV_WEBVIEW_URL,
  WEBVIEW_PORT,
  WEBVIEW_URL,
} from "../constants";
import { IActionType, IGetWebViewHTML } from "../types";

const getWebViewHTML: IGetWebViewHTML = ({ path, webviewUrl, panel }) => {
  return new Promise((resolve) => {
    fetch(`${webviewUrl}/${path}`).then(
      async (res) => {
        let text = await res.text();
        resolve(text);
      },
      (error) => {
        window.showErrorMessage("加载WebView异常");
      }
    );
  });
};

const establishSignalChannel = (
  panel: WebviewPanel,
  context: ExtensionContext
) => {
  const channel = new Channel({
    receiver: (callback) => {
      panel.webview.onDidReceiveMessage(
        (message) => {
          message.api && callback(message);
        },
        undefined,
        context.subscriptions
      );
    },
    sender: (message) => void panel.webview.postMessage(message),
  });

  channel.on(IActionType.HELLO, async (data) => {
    console.log(IActionType.HELLO, data);
  });

  channel.on(IActionType.GENERATE_SNIPPETS, async (data) => {
    await commands.executeCommand("BaymaxGenerate");
  });

  channel.on(IActionType.GENERATE_CODE, async (data) => {
    await commands.executeCommand("BaymaxWebviewGenerateCode", data);
  });

  return channel;
};

const createPanel = async (
  title: string,
  path: string,
  context: ExtensionContext
) => {
  const port =
    process.env.DEBUG_ENV === "debug" ? DEV_WEBVIEW_PORT : WEBVIEW_PORT;
  const webviewUrl =
    process.env.DEBUG_ENV === "debug" ? DEV_WEBVIEW_URL : WEBVIEW_URL;

  const panel = window.createWebviewPanel(
    `BAYMAX-${title}`,
    title,
    {
      viewColumn: ViewColumn.Active,
      preserveFocus: false,
    },
    {
      enableCommandUris: true,
      enableFindWidget: true,
      localResourceRoots: [],
      enableScripts: true,
      retainContextWhenHidden: true,
      portMapping: [{ webviewPort: port, extensionHostPort: port }],
    }
  );

  const html = await getWebViewHTML({ path, webviewUrl, panel });
  panel.webview.html = html;

  // 建立与webview通信通道
  establishSignalChannel(panel, context);
};

export const createExamplePanel = (context: ExtensionContext) => () => {
  createPanel("baymax: 拖拽小示例", "/drag", context);
};

export const createDragPanel = (context: ExtensionContext) => () => {
  createPanel("baymax: 拖拽生成代码", "/antd", context);
};

export const createCodePanel = (context: ExtensionContext) => () => {
  createPanel("baymax: 模板代码", "/code", context);
};
