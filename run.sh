docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v `(pwd)`/conf:/verdaccio/conf \
  -v `(pwd)`/storage:/verdaccio/storage \
  -v `(pwd)`/plugins:/verdaccio/plugins \
  verdaccio/verdaccio