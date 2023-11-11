#include "../struct/state.h"

int bits(struct State *state, int need) {
    
    int val;

    val = state->bitbuf;
    while (state->bitcnt < need) {
        if (state->left == 0) {
            state->left = state->infun(state->inhow, &(state->in));
            if (state->left == 0) longjmp(state->env, 1);
        }
        val |= (int)(*(state->in)++) << state->bitcnt;
        state->left--;
        state->bitcnt += 8;
    }

    state->bitbuf = val >> need;
    state->bitcnt -= need;

    return val & ((1 << need) - 1);
}