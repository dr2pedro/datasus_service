#define MAXBITS 13

#include "../struct/huffman.h"
#include "../struct/state.h"

int decode(struct State *state, struct Huffman *huffman) {
    
    int len;
    int code;
    int first;
    int count;
    int index;
    int bitbuf;
    int left;
    short *next;

    bitbuf = state->bitbuf;
    left = state->bitcnt;
    code = first = index = 0;
    len = 1;
    next = huffman->count + 1;
    
    while (1) {
        while (left--) {
            code |= (bitbuf & 1) ^ 1;
            bitbuf >>= 1;
            count = *next++;
            if (code < first + count) {
                state->bitbuf = bitbuf;
                state->bitcnt = (state->bitcnt - len) & 7;
                return huffman->symbol[index + (code - first)];
            }
            index += count;
            first += count;
            first <<= 1;
            code <<= 1;
            len++;
        }

        left = (MAXBITS+1) - len;

        if (left == 0) break;

        if (state->left == 0) {
            state->left = state->infun(state->inhow, &(state->in));
            if (state->left == 0) longjmp(state->env, 1);
        }
        bitbuf = *(state->in)++;
        state->left--;
        if (left > 8) left = 8;
    }
    return -9;
}
