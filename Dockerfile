# Use a Node.js base image
FROM node:18-alpine

# Set Arg for github token
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

# Set the working directory inside the container
WORKDIR /app

# Install pnpm and serve globally
RUN npm install -g pnpm serve

# Copy the alca-app directory contents to the working directory in the container
COPY . /app

# Install dependencies at root
RUN pnpm i
RUN pnpm build-alca

# Expose the port that serve will use
EXPOSE 3000

# Command to run the serve command, serving the build directory
CMD ["serve", "-s", "./build", "-l", "3000"]