#!/bin/bash

if node-gyp -v &> /dev/null; then
    echo
else
    echo "[Error]: Instale o node-gyp globalmente para executar a aplicação."
    exit 1
fi

if [ "$1" != "test" ] && [ "$1" != "main" ]; then
    echo "[Error]: O primeiro argumento deve ser 'test' ou 'main'."
    exit 1
fi


VERSION=$(node-gyp -v)

cd addon
node-gyp clean
node-gyp remove "$VERSION"
node-gyp configure
node-gyp build
cd ..

npm run "$1"