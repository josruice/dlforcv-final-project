for i in `ls -1`; do identify $i/* > /dev/null; done
for i in `ls -1`; do identify $i/* | grep -v 'JPG\|JPEG\|PNG\|GIF'; done