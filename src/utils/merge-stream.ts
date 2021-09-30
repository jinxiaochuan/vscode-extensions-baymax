import {
  createReadStream,
  createWriteStream,
  readdirSync,
  WriteStream,
} from "fs";
import { resolve } from "path";

/**
 * Stream 合并的递归调用
 * @param { Array } scripts
 * @param { Stream } fileWriteStream
 */
function streamMergeRecursive(
  snippetsFile: string[] = [],
  fileWriteStream: WriteStream
) {
  // 递归到尾部情况判断
  if (!snippetsFile.length) {
    return fileWriteStream.end(); // 最后关闭可写流，防止内存泄漏
  }

  const currentFile = snippetsFile.shift()!;
  const currentReadStream = createReadStream(currentFile); // 获取当前的可读流

  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on("end", function () {
    streamMergeRecursive(snippetsFile, fileWriteStream);
  });

  currentReadStream.on("error", function (error) {
    // 监听错误事件，关闭可写流，防止内存泄漏
    console.error(error);
    fileWriteStream.close();
  });
}

/**
 * Stream 合并
 * @param { String } sourceFiles 源文件目录名
 * @param { String } targetFile 目标文件
 */
export function streamMerge(sourceFiles: string, targetFile: string) {
  const commonHeaderSnippets = resolve(
    __dirname,
    "templates/common/header.jsx"
  );
  const commonFooterSnippets = resolve(
    __dirname,
    "templates/common/footer.jsx"
  );
  const snippetsFiles = readdirSync(resolve(__dirname, "./templates/snippets"));
  const snippets = snippetsFiles.map((filename) =>
    resolve(__dirname, "templates/snippets", filename)
  );
  const fileWriteStream = createWriteStream(resolve(__dirname, targetFile)); // 创建一个可写流

  streamMergeRecursive(
    [commonHeaderSnippets, ...snippets, commonFooterSnippets],
    fileWriteStream
  );
}
