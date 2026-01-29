FROM ubuntu:20.04

# Setup working directory
WORKDIR /root

# update the ubuntu machine
RUN apt update && apt upgrade -y

# Install nano and curl
RUN apt install nano curl -y 

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs

# configuring terminal to display current working directory
RUN echo "PS1='\w # '" >> /root/.bashrc

# Setup final working directory
WORKDIR /app