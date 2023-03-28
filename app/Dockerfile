#Note: There are a couple of things we need to install 
#globally before this script will work on an EC2 instance
#npm install -g create-react-app@7.3.0
#npm init react-app sample --use-npm
#cd sample

# pull official base image
FROM node:16-alpine3.16

# set working directory
WORKDIR /app

# add app
COPY . ./

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install 

RUN npm install react-scripts@4.0.1 -g  

EXPOSE 3000 

# start app
CMD ["npm", "start"]
