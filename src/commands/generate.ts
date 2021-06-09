import { window } from "vscode";
import { copyTemplates, getCurrentFilePath } from "../utils";

export default function generate() {
  const currentFilePath = getCurrentFilePath();
  if (!currentFilePath) {
    return;
  }
  copyTemplates(currentFilePath, (err) => {
    if (err) {
      window.showErrorMessage("😭 模版文件注入失败～");
      return;
    }
    window.showInformationMessage("😁 模版文件注入成功～");
  });
}
