#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include "./utils/utils.h"
#include "../blast/blast.h"

void dbc2dbf(char** input_file, char** output_file) {
    FILE* input = NULL;
    FILE* output = NULL;
    int ret = 0;
    unsigned char rawHeader[2];
    uint16_t header = 0;

    input = fopen(input_file[0], "rb");
    if (input == NULL) {
        perror("Error reading input file");
        exit(EXIT_FAILURE);
    }

    /* Open output file */
    output = fopen(output_file[0], "wb");
    if (output == NULL) {
        perror("Error reading output file");
        cleanup(input, output);
        exit(EXIT_FAILURE);
    }

    /* Process file header - skip 8 bytes */
    if (fseek(input, 8, SEEK_SET)) {
        perror("Error processing input file");
        cleanup(input, output);
        exit(EXIT_FAILURE);
    }

    /* Reads two bytes from the header = header size */
    ret = fread(rawHeader, 2, 1, input);
    if (ferror(input)) {
        perror("Error reading input file");
        cleanup(input, output);
        exit(EXIT_FAILURE);
    }

    /* Platform independent code (header is stored in little endian format) */
    header = rawHeader[0] + (rawHeader[1] << 8);

    /* Reset file pointer */
    rewind(input);

    /* Copy file header from input to output */
    /*  TEM QUE FICAR DE OLHO NESSE 9999!!!! FOI GAMBIARRA */
    unsigned char buf[9999];

    ret = fread(buf, 1, header, input);
    if (ferror(input)) {
        perror("Error reading input file");
        cleanup(input, output);
        exit(EXIT_FAILURE);
    }

    ret = fwrite(buf, 1, header, output);
    if (ferror(output)) {
        perror("Error writing output file");
        cleanup(input, output);
        exit(EXIT_FAILURE);
    }

    /* Jump to the data (Skip CRC32) */
    if (fseek(input, header + 4, SEEK_SET)) {
        perror("Error processing input file");
        cleanup(input, output);
        exit(EXIT_FAILURE);
    }

    /* decompress */
    ret = blast(inf, input, outf, output);
    if (ret) {
        perror("Error decompressing file");
        cleanup(input, output);
        exit(EXIT_FAILURE);
    }

    /* see if there are any leftover bytes */
    int n = 0;
    while (fgetc(input) != EOF) n++;
    if (n) {
        fprintf(stderr, "Blast warning: %d unused bytes of input\n", n);
    }

    cleanup(input, output);
}

