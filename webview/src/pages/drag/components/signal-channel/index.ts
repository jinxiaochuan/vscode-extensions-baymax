import Channel from "cs-channel";

class SignalChannel {
  channel?: Channel;

  constructor() {
    this.channel = this.establishSignalChannel();
  }

  establishSignalChannel() {
    if (!window.acquireVsCodeApi) return;
    const vscode = window.acquireVsCodeApi();
    const channel = new Channel({
      sender: (message) => void vscode.postMessage(message),
      receiver: (callback) => {
        window.addEventListener("message", (event: { data: any }) => {
          event && event.data && callback(event.data);
        });
      },
    });
    return channel;
  }

  postMessage(message: any) {
    if (!this.channel) return;
    this.channel.call("hello", { type: "hello", data: message });
  }
}

export default new SignalChannel();
