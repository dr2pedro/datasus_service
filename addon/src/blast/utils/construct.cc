#include "../struct/huffman.h"

#define MAXBITS 13

int construct(struct Huffman *huffman, const unsigned char *rep, int n) {
    
    int symbol;
    int len;
    int left;
    short offs[MAXBITS+1];
    short length[256];

    symbol = 0;

    do {
        len = *rep++;
        left = (len >> 4) + 1;
        len &= 15;
        do {
            length[symbol++] = len;
        } while (--left);
    } while (--n);
    n = symbol;

    for (len = 0; len <= MAXBITS; len++)
        huffman->count[len] = 0;
    for (symbol = 0; symbol < n; symbol++)
        (huffman->count[length[symbol]])++;
    if (huffman->count[0] == n)
        return 0;

    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
        left <<= 1;
        left -= huffman->count[len];
        if (left < 0) return left;
    }

    offs[1] = 0;

    for (len = 1; len < MAXBITS; len++)
        offs[len + 1] = offs[len] + huffman->count[len];

    for (symbol = 0; symbol < n; symbol++)
        if (length[symbol] != 0)
            huffman->symbol[offs[length[symbol]]++] = symbol;

    return left;
}
