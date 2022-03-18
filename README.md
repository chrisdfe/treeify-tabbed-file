# treeify-tabbed-file

A simple command line utility wrapper around [object-treeify](https://www.npmjs.com/package/object-treeify) to convert a file like this:

```
input.txt

fruits
  oranges
    mandarin
      clementine
      tangerine
  apples
    gala
      pink lady
```

into this:

```
output.txt

└─ fruits
   ├─ oranges
   │  └─ mandarin
   │     ├─ clementine
   │     └─ tangerine
   └─ apples
      └─ gala
         └─ pink lady
```
