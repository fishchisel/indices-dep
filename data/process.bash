#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# We don't commit the real index/dependency data into the repository. The user has
# to drop the data in this directory: if they don't we default to some stubbed data.
indices="$DIR/indices.csv"
dependencies="$DIR/dependencies.csv"

if [ ! -f "$indices" ]; then
  indices="$DIR/indices.stub.csv"
  dependencies="$DIR/dependencies.stub.csv"
fi

csvtojson --checkType=true "$indices" > "$DIR/../indices-dep/static/data/indices.json"
csvtojson --checkType=true "$dependencies" > "$DIR/../indices-dep/static/data/dependencies.json"