import { join } from "path";
import { existsSync } from "fs";
import { workspace, window } from "vscode";
import { copySync } from "fs-extra";

export function getVsCodeSnippets(): string | null {
  if (!workspace.workspaceFolders || workspace.workspaceFolders!.length <= 0) {
    return null;
  }
  const p = join(workspace.workspaceFolders[0].uri.path, ".vscode", `snippets`);
  return existsSync(p) ? p : null;
}

export function colorText(text: string): string {
  let output = "";
  let colorIndex = 1;
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (char === " " || char === "\r" || char === "\n") {
      output += char;
    } else {
      output += `\x1b[3${colorIndex++}m${text.charAt(i)}\x1b[0m`;
      if (colorIndex > 6) {
        colorIndex = 1;
      }
    }
  }
  return output;
}

/**
 * 获取当前项目根目录
 * @returns
 */
export function getWorkspaceRootPath() {
  if (!workspace.workspaceFolders || workspace.workspaceFolders!.length <= 0) {
    return null;
  }
  return workspace.workspaceFolders[0].uri.path;
}

export function getActiveTextEditor() {
  return window.activeTextEditor;
}

/**
 * 获取当前文件父级目录（当前项目根目录兜底）
 */
export function getCurrentFilePath() {
  const activeEditor = getActiveTextEditor();
  if (!activeEditor) {
    return getWorkspaceRootPath();
  }
  const currentOpenTabFilePath = activeEditor.document.fileName;
  const currentOpenTab = currentOpenTabFilePath.split("/");
  currentOpenTab.pop();
  return currentOpenTab.join("/");
}

/**
 * 拷贝模版文件至目标目录
 * @param dest 模版文件注入的目标目录
 * @param callback 模版文件注入「成功｜失败」回调
 */
export function copyTemplates(dest: string, callback: (...args: any[]) => any) {
  try {
    const src = join(__dirname, "templates");
    copySync(src, dest);
    callback(null);
  } catch (err) {
    callback(err);
  }
}
