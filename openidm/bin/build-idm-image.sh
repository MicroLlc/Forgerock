#!/bin/bash

if [ $# -lt 3 ]; then
  echo "$0 <source image> <new base image> <result image>"
  exit 0
fi

sourceImage="$1"
javaImage="$2"
resultImage="$3"

container_id=$(docker create $sourceImage)
docker export $container_id -o image.tar
docker rm $container_id

tar xvf image.tar opt/openidm
rm -f image.tar

cd opt/openidm
# use | separators because image names often have / and :
sed -i.bak 's|^FROM.*$|FROM '$javaImage'|' bin/Custom.Dockerfile
rm bin/Custom.Dockerfile.bak

docker build . --file bin/Custom.Dockerfile --tag "$resultImage"
rm -rf opt