#include <stdio.h>

void cleanup(FILE* input, FILE* output) {
    if (input) fclose(input);
    if (output) fclose(output);
}