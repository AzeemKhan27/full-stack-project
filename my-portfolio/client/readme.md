# Docker setup

Setting up Docker for a React.js application on Zorin OS (which is based on Ubuntu) involves similar steps as on other Linux distributions. Below is a step-by-step guide tailored for Zorin OS:
## Step 1: Install Docker

    Update Your Package Index: Open a terminal and run the following command to update your package index:

    bash

sudo apt update

Install Required Packages: Install the necessary packages to allow apt to use packages over HTTPS:

bash

sudo apt install apt-transport-https ca-certificates curl software-properties-common

Add Docker’s Official GPG Key: Run the following command to add Docker’s official GPG key:

bash

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

Add Docker’s Official Repository: Add the Docker repository to your system:

bash

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

Update Your Package Index Again: After adding the Docker repository, update your package index again:

bash

sudo apt update

Install Docker: Now, install Docker:

bash

sudo apt install docker-ce

Start and Enable Docker: Start the Docker service and enable it to run on boot:

bash

sudo systemctl start docker

sudo systemctl enable docker

Verify Docker Installation: Check if Docker is installed correctly by running:

bash

    sudo docker --version

## Step 2: Install Docker Compose (Optional)

If you want to use Docker Compose, you can install it as follows:

    Download the Latest Version of Docker Compose:

    bash

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

Apply Executable Permissions:

bash

sudo chmod +x /usr/local/bin/docker-compose

Verify Docker Compose Installation:

bash

    docker-compose --version

## Step 3: Create or Use an Existing React App

If you already have a React app, navigate to its directory. If you need to create a new one, you can do so with Create React App:

bash

npx create-react-app my-app

cd my-app

## Step 4: Create a Dockerfile

    Create a Dockerfile: In the root of your React project (where package.json is located), create a file named Dockerfile (without any extension).

    Add the following content to the Dockerfile:

    dockerfile

# Use the official Node.js image as a base

FROM node:14


# Set the working directory

WORKDIR /app


# Copy package.json and package-lock.json

COPY package*.json ./


# Install dependencies

RUN npm install


# Copy the rest of the application code

COPY . .


# Build the React app

RUN npm run build


# Install serve to serve the build folder

RUN npm install -g serve


# Expose the port the app runs on

EXPOSE 3000


# Command to run the app

    CMD ["serve", "-s", "build"]

## Step 5: Create a .dockerignore File

    Create a .dockerignore file in the root of your project to prevent unnecessary files from being copied into the Docker image. Add the following content:

    node_modules
    build
    .git
    .gitignore
    Dockerfile
    docker-compose.yml

Step 6: Build the Docker Image

    Open a terminal in the root of your React project and run the following command to build the Docker image:

    bash

    sudo docker build -t my-react-app .

    Replace my-react-app with your desired image name.

Step 7: Run the Docker Container

    Run the Docker container using the following command:

    bash

    sudo docker run -p 3000:3000 my-react-app

    This command maps port 3000 of the container to port 3000 on your host machine.

Step 8: Access Your React App

    Open your web browser and go to http://localhost:3000.