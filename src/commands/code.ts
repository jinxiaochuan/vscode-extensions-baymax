import { window } from "vscode";
import { copyCode, getCurrentFilePath } from "../utils";

export function generateCode() {
  const currentFilePath = getCurrentFilePath();
  if (!currentFilePath) {
    window.showErrorMessage("🤔️ 请进入你的本地项目～");
    return;
  }
  copyCode(
    {
      clientDir: `${currentFilePath}/client/js/pages`,
      nodeDir: `${currentFilePath}/app`,
    },
    "vscode-snippets",
    (err) => {
      if (err) {
        window.showErrorMessage("😭 模版文件注入失败～");
        return;
      }
      window.showInformationMessage("😁 模版文件注入成功～");
    }
  );
}
