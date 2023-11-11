#ifndef STATE_H

#define STATE_H
#define MAXWIN 4096

#include <setjmp.h>
#include "huffman.h"
#include "../blast.h"

struct State {
    blast_in infun;
    void *inhow;
    unsigned char *in;
    unsigned left;
    int bitbuf;
    int bitcnt;

    jmp_buf env;

    blast_out outfun;
    void *outhow;
    unsigned next;
    int first;
    unsigned char out[MAXWIN];
};

int decode(struct State *state, struct Huffman *huffman);
int bits(struct State *state, int need);
int decomp(struct State *state);

#endif // STATE_H
