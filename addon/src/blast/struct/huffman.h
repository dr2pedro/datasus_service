#ifndef HUFFMAN_H

#define HUFFMAN_H

#include <vector>

struct Huffman {
    short *count;
    short *symbol;
};

int construct(Huffman* huffman, const unsigned char *rep, int n);

#endif // HUFFMAN_H
