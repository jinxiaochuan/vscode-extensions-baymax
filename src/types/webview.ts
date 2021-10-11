import { WebviewPanel } from "vscode";

export enum IActionType {
  HELLO = "hello",
  GENERATE_SNIPPETS = "generate-snippets",
  GENERATE_CODE = "generate-code",
}

export type ICodeMessage = {
  project: string;
  clientDir: string;
  nodeDir: string;
  dirname: string;
};

export interface IGetWebViewHTMLParams {
  path: string;
  webviewUrl: string;
  panel: WebviewPanel;
}

export type IGetWebViewHTML = (
  params: IGetWebViewHTMLParams
) => Promise<string>;
