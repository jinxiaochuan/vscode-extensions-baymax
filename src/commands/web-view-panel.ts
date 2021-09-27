import {
  ExtensionContext,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
} from "vscode";
import fetch from "node-fetch";
import { DEV_WEBVIEW_PATH, WEBVIEW_PATH } from "../constants";

interface IGetWebViewHTMLParams {
  port: number;
  path: string;
  webviewPath: Uri;
  panel: WebviewPanel;
}

type GetWebViewHTML = (params: IGetWebViewHTMLParams) => Promise<string>;

const getWebViewHTML: GetWebViewHTML = ({ port, path, webviewPath, panel }) => {
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
};

export const createAppPanel = (context: ExtensionContext) => () => {
  createPanel("baymax-webview", "/index.html", context);
};
