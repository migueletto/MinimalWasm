var wasmMemory = new WebAssembly.Memory({
  "initial": 256,
  "maximum": 256
});

HEAP32 = new Int32Array(wasmMemory.buffer);
HEAPU8 = new Uint8Array(wasmMemory.buffer);

var decoder = new TextDecoder("utf-8");

function _fd_write(fd, iov, iovcnt, pnum) {
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAP32[iov + i * 8 >> 2];
    var len = HEAP32[iov + (i * 8 + 4) >> 2];
    var str = HEAPU8.slice(ptr, ptr + len);
    console.log(decoder.decode(str));
  }
}

function _proc_exit(status) {
}

var env = {
  "memory": wasmMemory,
  "fd_write": _fd_write,
  "proc_exit": _proc_exit
}

WebAssembly.instantiateStreaming(
    fetch("test.wasm"),
    { env: env, wasi_snapshot_preview1: env }
  ).then(
  (obj) => {
    try {
      obj.instance.exports.main();
    } catch (e) {
    }
  }
);
