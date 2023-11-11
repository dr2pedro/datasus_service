{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ 
        "addon.cc", 
        "./src/dbc2dbf/dbc2dbf.cc", 
        "./src/dbc2dbf/utils/cleanup.cc", 
        "./src/dbc2dbf/utils/inf.cc", 
        "./src/dbc2dbf/utils/outf.cc",
        "./src/blast/blast.cc",
        "./src/blast/utils/bits.cc",
        "./src/blast/utils/construct.cc",
        "./src/blast/utils/decode.cc",
        "./src/blast/utils/decomp.cc"
      ],
      "include_dirs": ["./src/dbc2dbf", "./src/blast"]
    }
  ]
}