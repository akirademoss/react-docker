#Note: There are a couple of things we need to install 
#globally before this script will work on an EC2 instance
#npm install -g create-react-app@7.3.0
#npm init react-app sample --use-npm
#cd sample

# pull official base image
FROM node:slim-15.5

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install 

RUN npm install react-scripts@7.3.0 -g 

# add app
COPY . ./

# start app
CMD ["npm", "start"]
