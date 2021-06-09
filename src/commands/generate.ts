import { window } from "vscode";
import { copyTemplates, getCurrentFilePath } from "../utils";

export default function generate() {
  const currentFilePath = getCurrentFilePath();
  if (!currentFilePath) {
    window.showErrorMessage("🤔️ 请进入你的本地项目～");
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
