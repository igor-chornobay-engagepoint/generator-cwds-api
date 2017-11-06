#!/bin/bash

#The file should have UNIX-style EOL

if [ -z "$<%=apiCaps %>_API_CONFIG" ]
then
  <%=apiCaps %>_API_CONFIG="<%=apiProjectName %>-api.yml"
fi

echo "config file: $<%=apiCaps %>_API_CONFIG"


if [ -f /opt/newrelic/newrelic.yml ]; then
    java -javaagent:/opt/newrelic/newrelic.jar  ${JAVA_OPTS} -jar <%=apiProjectName %>-api.jar server $<%=apiCaps %>_API_CONFIG
else
    java  ${JAVA_OPTS} -jar <%=apiProjectName %>-api.jar server $<%=apiCaps %>_API_CONFIG
fi
