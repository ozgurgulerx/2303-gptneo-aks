FROM python:3.9-slim-buster

# Step 2: Update OS packages and install additional software
RUN apt -y update

# Step 3: Install additional dependencies (ML framework libraries and required python packages)
COPY requirements.txt /
RUN pip install -r /requirements.txt

# STEP 4: Configure work directory
COPY ./neo-gpt-app neo-gpt-app
WORKDIR /neo-gpt-app

# STEP 5: Serve the Model!
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker","--bind", "0.0.0.0:8000","--timeout", "500 ", "server:app"]
