#include <csetjmp>
#include "./struct/huffman.h"
#include "blast.h"
#include "./struct/state.h"

int blast(blast_in infun, void* inhow, blast_out outfun, void* outhow) {
    
    struct State state;
    int err;

    state.infun = infun;
    state.inhow = inhow;
    state.left = 0;
    state.bitbuf = 0;
    state.bitcnt = 0;

    state.outfun = outfun;
    state.outhow = outhow;
    state.next = 0;
    state.first = 1;

    if (_setjmp(state.env) != 0)
        err = 2;
    else
        err = decomp(&state);

    if (err != 1 && state.next && state.outfun(state.outhow, state.out, state.next) && err == 0)
        err = 1;
        
    return err;
}
