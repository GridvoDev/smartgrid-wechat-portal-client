FROM node:latest
MAINTAINER linmadan <772181827@qq.com>
COPY ./package.json /home/smartgrid-wechat-portal-client/
WORKDIR /home/smartgrid-wechat-portal-client
RUN ["npm","config","set","registry","http://registry.npm.taobao.org"]
RUN ["npm","install","--save","co@4.6.0"]
RUN ["npm","install","--save","cookie-parser@1.4.3"]
RUN ["npm","install","--save","echarts@3.4.0"]
RUN ["npm","install","--save","express@4.14.1"]
RUN ["npm","install","--save","pomelo-cocos2d-js@0.1.4"]
RUN ["npm","install","--save","underscore@1.8.3"]
RUN ["npm","install","--save","gridvo-common-js@0.0.17"]
RUN ["npm","install","--save","react@15.4.2"]
RUN ["npm","install","--save","react-dom@15.4.2"]
RUN ["npm","install","--save-dev","webpack"]
RUN ["npm","install","--save-dev","babel-core"]
RUN ["npm","install","--save-dev","babel-loader"]
RUN ["npm","install","--save-dev","babel-preset-react"]
RUN ["npm","install","--save-dev","babel-preset-es2015"]
COPY ./webpack.config.js webpack.config.js
RUN ["npm","run","build"]
COPY ./app.js app.js
COPY ./lib lib
ENTRYPOINT ["node"]
CMD ["app.js"]