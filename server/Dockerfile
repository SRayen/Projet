# Use the node:alpine image as the base image
FROM node:alpine


WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
COPY prisma ./prisma

# Install the dependencies
RUN npm ci --quiet


COPY . .

# Generate Prisma client files
RUN npx prisma generate


RUN npm run build

# Expose the port that the application will listen on
EXPOSE 5000

# Set the command to run the application
CMD [ "npm", "run", "start:migrate" ]
