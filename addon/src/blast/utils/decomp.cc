
#define MAXBITS 13
#define MAXWIN 4096

#include "../struct/state.h"
#include "../struct/huffman.h"

int decomp(struct State *state) {
    
    int lit;
    int dict;
    int symbol;
    int len;
    unsigned dist;
    int copy;
    unsigned char *from, *to;
    static int virgin = 1;
    static short litcnt[MAXBITS+1], litsym[256];
    static short lencnt[MAXBITS+1], lensym[16];
    static short distcnt[MAXBITS+1], distsym[64];
    static struct Huffman litcode = {litcnt, litsym}; 
    static struct Huffman lencode = {lencnt, lensym};
    static struct Huffman distcode = {distcnt, distsym};

    static const unsigned char litlen[] = {
        11, 124, 8, 7, 28, 7, 188, 13, 76, 4, 10, 8, 12, 10, 12, 10, 8, 23, 8,
        9, 7, 6, 7, 8, 7, 6, 55, 8, 23, 24, 12, 11, 7, 9, 11, 12, 6, 7, 22, 5,
        7, 24, 6, 11, 9, 6, 7, 22, 7, 11, 38, 7, 9, 8, 25, 11, 8, 11, 9, 12,
        8, 12, 5, 38, 5, 38, 5, 11, 7, 5, 6, 21, 6, 10, 53, 8, 7, 24, 10, 27,
        44, 253, 253, 253, 252, 252, 252, 13, 12, 45, 12, 45, 12, 61, 12, 45,
        44, 173};

    static const unsigned char lenlen[] = {2, 35, 36, 53, 38, 23};

    static const unsigned char distlen[] = {2, 20, 53, 230, 247, 151, 248};
    static const short base[16] = {3, 2, 4, 5, 6, 7, 8, 9, 10, 12, 16, 24, 40, 72, 136, 264};
    static const char extra[16] = {0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8};

    if (virgin) {
        construct(&litcode, litlen, sizeof(litlen));
        construct(&lencode, lenlen, sizeof(lenlen));
        construct(&distcode, distlen, sizeof(distlen));
        virgin = 0;
    }

    lit = bits(state, 8);
    if (lit > 1) return -1;

    dict = bits(state, 8);
    if (dict < 4 || dict > 6) return -2;

    do {
        if (bits(state, 1)) {
            
            symbol = decode(state, &lencode);
            len = base[symbol] + bits(state, extra[symbol]);
            if (len == 519) break;

            symbol = len == 2 ? 2 : dict;
            dist = decode(state, &distcode) << symbol;
            dist += bits(state, symbol);
            dist++;
            if (state->first && dist > state->next)
                return -3;

            do {
                to = state->out + state->next;
                from = to - dist;
                copy = MAXWIN;
                if (state->next < dist) {
                    from += copy;
                    copy = dist;
                }

                copy -= state->next;
                if (copy > len) copy = len;

                len -= copy;
                state->next += copy;

                do {
                    *to++ = *from++;
                } while (--copy);

                if (state->next == MAXWIN) {
                    if (state->outfun(state->outhow, state->out, state->next)) return 1;
                    state->next = 0;
                    state->first = 0;
                }
            } while (len != 0);
        }
        else {
            symbol = lit ? decode(state, &litcode) : bits(state, 8);
            state->out[state->next++] = symbol;
            if (state->next == MAXWIN) {
                if (state->outfun(state->outhow, state->out, state->next)) return 1;
                state->next = 0;
                state->first = 0;
            }
        }
    } while (1);
    return 0;
}