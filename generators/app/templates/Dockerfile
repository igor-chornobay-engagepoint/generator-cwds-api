FROM cwds/javajdk
RUN mkdir /opt/<%=apiProjectName %>-api
RUN mkdir /opt/<%=apiProjectName %>-api/logs
ADD config/*.yml /opt/<%=apiProjectName %>-api/
ADD config/shiro.ini /opt/<%=apiProjectName %>-api/config/shiro.ini
ADD config/shiro_nosec.ini /opt/<%=apiProjectName %>-api/config/shiro_nosec.ini
ADD build/libs/<%=apiProjectName %>-api-dist.jar /opt/<%=apiProjectName %>-api/<%=apiProjectName %>-api.jar
ADD build/entrypoint.sh /opt/<%=apiProjectName %>-api/
EXPOSE 8080
RUN chmod +x /opt/<%=apiProjectName %>-api/entrypoint.sh
WORKDIR /opt/<%=apiProjectName %>-api
CMD ["/opt/<%=apiProjectName %>-api/entrypoint.sh"]
