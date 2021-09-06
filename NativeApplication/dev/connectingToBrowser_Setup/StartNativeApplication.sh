#!/bin/sh
set -e
DIR="$( cd "$( dirname "$0" )" && pwd )"
NEWROOT="$DIR/.."
echo "here: $NEWROOT"
cd "$NEWROOT"
java -Dfile.encoding=UTF-8 -jar "./NativeApplication.jar" --verbose
