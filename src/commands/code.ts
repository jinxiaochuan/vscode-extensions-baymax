import { window } from "vscode";
import { readJson } from "fs-extra";
import { ICodeMessage } from "../types";
import { copyCode, getCurrentFilePath } from "../utils";

async function check(
  project: string = "baymax-manager"
): Promise<{ pass: boolean; message: string }> {
  const currentFilePath = getCurrentFilePath();
  if (!currentFilePath) {
    return {
      pass: false,
      message: "🤔️ 请进入你的本地项目～",
    };
  }

  try {
    const packageObj = await readJson(`${currentFilePath}/package.json`);

    if (packageObj.name !== project) {
      return {
        pass: false,
        message: `🤔️ 请确认当前项目为${project}～`,
      };
    }

    return {
      pass: true,
      message: "成功",
    };
  } catch (err) {
    return {
      pass: false,
      message: `请确认处于${project}项目根目录下～`,
    };
  }
}

function copyTemplateCodes(
  currentFilePath: string,
  dirname: string,
  srcDirs?: {
    clientDir: string;
    nodeDir: string;
  }
) {
  const { clientDir, nodeDir } = srcDirs || {
    clientDir: "client/js/pages",
    nodeDir: "app",
  };
  copyCode(
    {
      clientDir: `${currentFilePath}/${clientDir}`,
      nodeDir: `${currentFilePath}/${nodeDir}`,
    },
    dirname,
    (err) => {
      if (err && err.message) {
        window.showErrorMessage(`😭 ${err.message}`);
        return;
      }
      window.showInformationMessage("😁 模板代码注入成功～");
    }
  );
}

export async function generateCode() {
  // 根据用户输入目录名称生成对应目录
  const dirname = await window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: "请输入创建的目录名称",
    validateInput: (v) => {
      if (!v.trim()) {
        return "目录名称不能为空";
      }
      if (!/^[A-Za-z0-9_\-]+$/.test(v)) {
        return "目录名称不合法";
      }
    },
  });

  const res = await check();
  if (!res.pass) {
    window.showErrorMessage(res.message);
    return;
  }

  const currentFilePath = getCurrentFilePath();
  copyTemplateCodes(currentFilePath as string, dirname as string);
}

export async function webviewGenerateCode(data: ICodeMessage) {
  if (!data.dirname || !data.nodeDir || !data.clientDir) {
    window.showErrorMessage("🤔️ 请检查表单数据是否异常～");
    return;
  }

  const res = await check(data.project);
  if (!res.pass) {
    window.showErrorMessage(res.message);
    return;
  }

  const currentFilePath = getCurrentFilePath();
  copyTemplateCodes(currentFilePath as string, data.dirname, {
    clientDir: data.clientDir,
    nodeDir: data.nodeDir,
  });
}
