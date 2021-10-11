// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  generate,
  terminalSampleCreate,
  terminalSampleClear,
  quickinputSample,
  createExamplePanel,
  createDragPanel,
  generateCode,
} from "./commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "samples.terminal.create",
      terminalSampleCreate
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "samples.terminal.clear",
      terminalSampleClear
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("BaymaxGenerate", generate)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("BaymaxGenerateCode", generateCode)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "samples.quickInput",
      quickinputSample(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("BaymaxExampleView", createExamplePanel(context))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("BaymaxDragView", createDragPanel(context))
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
