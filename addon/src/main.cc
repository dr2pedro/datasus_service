// index.cc

#include <stdio.h>
#include <stdlib.h>
#include "./dbc2dbf/dbc2dbf.h"

int main(int argc, char* argv[]) {
    if (argc != 3) {
        printf("Usage: %s <input_path> <output_path>\n", argv[0]);
        return 1;
    }

    char* inputPathStr = argv[1];
    char* outputPathStr = argv[2];

    dbc2dbf(&inputPathStr, &outputPathStr);

    printf("Decompressed successful.\n");

    return 0;
}


