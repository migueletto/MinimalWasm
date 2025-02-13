test.wasm: test.c
	emcc -o test.wasm -s IMPORTED_MEMORY -s EXPORTED_FUNCTIONS=_main test.c
