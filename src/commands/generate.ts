import { window } from "vscode";
import { join } from "path";
import { getCurrentFilePath, streamMerge } from "../utils";

export function generate() {
  const currentFilePath = getCurrentFilePath();
  if (!currentFilePath) {
    window.showErrorMessage("🤔️ 请进入你的本地项目～");
    return;
  }
  try {
    streamMerge("./templates", join(currentFilePath, "snippets.jsx"));
    window.showInformationMessage("😁 🐂生成snippets数据模版啦～😄");
  } catch (error) {
    window.showErrorMessage("😭 生成snippets数据模版失败～");
  }
}
