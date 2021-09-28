declare global {
  interface VsCodeApi {
    postMessage: (message: any) => void;
  }

  interface Window {
    acquireVsCodeApi: () => VsCodeApi;
  }
}

export {};
