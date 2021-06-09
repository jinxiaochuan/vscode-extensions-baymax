import { window, EventEmitter } from "vscode";
import { colorText } from "../utils";

const writeEmitter = new EventEmitter<string>();

export function terminalSampleCreate() {
  let line = "";
  const pty = {
    onDidWrite: writeEmitter.event,
    open: () =>
      writeEmitter.fire("Type and press enter to echo the text\r\n\r\n"),
    close: () => {
      /* noop*/
    },
    handleInput: (data: string) => {
      if (data === "\r") {
        // Enter
        writeEmitter.fire(`\r\necho: "${colorText(line)}"\r\n\n`);
        line = "";
        return;
      }
      if (data === "\x7f") {
        // Backspace
        if (line.length === 0) {
          return;
        }
        line = line.substr(0, line.length - 1);
        // Move cursor backward
        writeEmitter.fire("\x1b[D");
        // Delete character
        writeEmitter.fire("\x1b[P");
        return;
      }
      line += data;
      writeEmitter.fire(data);
    },
  };
  const terminal = window.createTerminal({
    name: `My Extension REPL`,
    pty,
  });
  terminal.show();
}

export function terminalSampleClear() {
  writeEmitter.fire("\x1b[2J\x1b[3J\x1b[;H");
}