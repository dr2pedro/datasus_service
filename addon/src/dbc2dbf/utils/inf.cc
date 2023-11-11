#include <stdio.h>

#define CHUNK 4096

unsigned inf(void *how, unsigned char **buf) {
    static unsigned char hold[CHUNK];
    *buf = hold;
    return fread(hold, 1, CHUNK, (FILE *)how);
}