#ifndef UTILS_H


#define UTILS_H

#include <stdio.h>


void cleanup(FILE* input, FILE* output);
unsigned inf(void *how, unsigned char **buf);
int outf(void *how, unsigned char *buf, unsigned len);

#endif // UTILS_H