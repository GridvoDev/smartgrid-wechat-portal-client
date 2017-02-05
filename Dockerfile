FROM node:latest
MAINTAINER linmadan <772181827@qq.com>
COPY ./package.json /home/smartgrid-wechat-portal-client/
WORKDIR /home/smartgrid-wechat-portal-client
RUN ["npm","config","set","registry","http://registry.npm.taobao.org"]
RUN ["npm","install","--save","co@4.6.0"]
RUN ["npm","install","--save","cookie-parser@1.4.3"]
RUN ["npm","install","--save","express@4.14.1"]
RUN ["npm","install","--save","underscore@1.8.3"]
RUN ["npm","install","--save","gridvo-common-js@0.0.17"]
COPY ./lib lib
ENTRYPOINT ["node"]
CMD ["app.js"]