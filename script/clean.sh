#!/bin/bash


,rm -rf *.dbc *.DBC
cat *.dbc.json > summary.json
cat *.DBC.json >> summary.json
rm -rf *.dbc.json 
rm -rf *.DBC.json