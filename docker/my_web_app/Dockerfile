# Inherit from the Python Docker image
FROM python:3.7-slim

# Install the Flask package via pip
RUN pip install flask==1.0.2

# Copy the source code to app folder
COPY ./app.py /app/

# Change the working directory
WORKDIR /app/

# Set "python" as the entry point
ENTRYPOINT ["python"]

# Set the command as the script name
CMD ["app.py"]

#=================================HOW-TO DOCKER=================================
# how to build image for Dockerfile
#   - docker build -t <name>:<tag .
#     - the tag can be a version number
#     - docker images
#       - use to check which images where successfully created
#     - . at the end tells where to build the image
# how to run a container
#   - docker run -d -p 5000:5000 flask_app:0.1
#     - -d means detached which is used so that the terminal does not get stuck
#     - -p maps the port of the container
#     - docker ps
#       - use to check if a container is currently running
#       - adding -a as an option show the history of past continuous containers
#     - go to localhost:5000 to check out the web app from the container
# how to stop a container
#   - docker stop <name>
