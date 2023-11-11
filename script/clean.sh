#!/bin/bash

rm -rf *.dbc
cat *.dbc.json > summary.json
rm -rf *.dbc.json