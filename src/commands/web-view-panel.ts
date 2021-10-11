import {
  ExtensionContext,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  commands,
} from "vscode";
import fetch from "node-fetch";
import Channel from "cs-channel";
import { DEV_WEBVIEW_PATH, WEBVIEW_PATH } from "../constants";

export enum IActionType {
  HELLO = "hello",
  GENERATE_SNIPPETS = "generate-snippets",
}

interface IGetWebViewHTMLParams {
  port: number;
  path: string;
  webviewPath: Uri;
  panel: WebviewPanel;
}

type IGetWebViewHTML = (params: IGetWebViewHTMLParams) => Promise<string>;

const getWebViewHTML: IGetWebViewHTML = ({
  port,
  path,
  webviewPath,
  panel,
}) => {
  const webviewUrl = `http://localhost:${port}${path}`;

  return new Promise((resolve) => {
    fetch(webviewUrl).then(
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
    console.log(IActionType.GENERATE_SNIPPETS, data);
    await commands.executeCommand("BaymaxGenerateCode");
  });

  return channel;
};

const createPanel = async (
  title: string,
  path: string,
  context: ExtensionContext
) => {
  const port = 3000;
  const webviewPath = Uri.joinPath(
    context.extensionUri,
    process.env.DEBUG_ENV === "debug" ? DEV_WEBVIEW_PATH : WEBVIEW_PATH
  );

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

  const html = await getWebViewHTML({ port, path, webviewPath, panel });
  panel.webview.html = html;

  // 建立与webview通信通道
  establishSignalChannel(panel, context);
};

export const createExamplePanel = (context: ExtensionContext) => () => {
  createPanel("Baymax: Example", "/drag", context);
};

export const createDragPanel = (context: ExtensionContext) => () => {
  createPanel("Baymax: Drag", "/antd", context);
};
