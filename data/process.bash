#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# We don't commit the real index/dependency data into the repository. The user has
# to drop the data in this directory: if they don't we default to some stubbed data.
indices="$DIR/indices.csv"
dependencies="$DIR/dependencies.csv"
calcTimes="$DIR/calc-times.csv"

if [ ! -f "$indices" ]; then
  indices="$DIR/indices.stub.csv"
  dependencies="$DIR/dependencies.stub.csv"
  calcTimes="$DIR/calc-times.stub.csv"
fi

csvtojson --checkType=true "$indices" > "$DIR/../indices-dep/static/data/indices.json"
csvtojson --checkType=true "$dependencies" > "$DIR/../indices-dep/static/data/dependencies.json"
csvtojson --checkType=true "$calcTimes" > "$DIR/../indices-dep/static/data/calc-times.json"