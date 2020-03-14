
#!/bin/bash
for i in "$@"
do
case $i in
    -e=*|--env=*)
    ENVIRONMENT="${i#*=}"
    shift # past argument=value
    ;;
    --default)
    DEFAULT=YES
    shift # past argument with no value
    ;;
    *)
          # unknown option
    ;;
esac
done
echo "${ENVIRONMENT}"
DATE=$(date +"%m-%d-%y %k:%M")
#NODE_ENV=${ENVIRONMENT} /usr/bin/node ../worker/index.js > "/var/log/tally//log $DATE.txt"
NODE_ENV=${ENVIRONMENT} "\Program Files\nodejs\node.exe" ../worker/index.js > "\var\log\tally\log.txt"