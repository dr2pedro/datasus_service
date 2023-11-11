#include <stdio.h>

int outf(void *how, unsigned char *buf, unsigned len) {
    return fwrite(buf, 1, len, (FILE *)how) != len;
}

