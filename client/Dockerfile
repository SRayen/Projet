# Use the node:alpine image as the base image
FROM node:alpine


WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./


# Install the dependencies
RUN npm ci --quiet


COPY . .


RUN npm run build

# Expose the port that the application will listen on
EXPOSE 3000

# Set the command to run the application
CMD [ "npm", "run", "start" ]
