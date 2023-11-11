#ifndef BLAST_H

#define BLAST_H

#include <vector>
#include <functional>

using blast_in = std::function<unsigned(void*, unsigned char**)>;
using blast_out = std::function<int(void*, unsigned char*, unsigned)>;


int blast(blast_in infun, void* inhow, blast_out outfun, void* outhow);

#endif // BLAST_H
