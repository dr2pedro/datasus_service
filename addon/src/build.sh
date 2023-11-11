#!/bin/bash

g++ -o module ./blast/blast.cc ./blast/blast.h ./blast/struct/huffman.h \
./blast/struct/state.h ./blast/utils/bits.cc ./blast/utils/construct.cc \
./blast/utils/decode.cc ./blast/utils/decomp.cc ./dbc2dbf/dbc2dbf.cc \
./dbc2dbf/utils/cleanup.cc ./dbc2dbf/utils/inf.cc ./dbc2dbf/utils/outf.cc \
./dbc2dbf/utils/utils.h ./main.cc ## tem que criar o main.cc pra funcionar, aproveite e use para testes.