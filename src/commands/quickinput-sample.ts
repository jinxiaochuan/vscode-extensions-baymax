import { ExtensionContext, window } from "vscode";
import {
  showQuickPick,
  showInputBox,
  quickOpen,
  multiStepInput,
} from "../utils";

export function quickinputSample(context: ExtensionContext) {
  return async () => {
    const options: {
      [key: string]: (context: ExtensionContext) => Promise<void>;
    } = {
      showQuickPick,
      showInputBox,
      quickOpen,
      multiStepInput,
    };

    const quickPick = window.createQuickPick();
    quickPick.items = Object.keys(options).map((label) => ({ label }));
    quickPick.onDidChangeSelection((selection) => {
      if (selection[0]) {
        options[selection[0].label](context).catch(console.error);
      }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  };
}
