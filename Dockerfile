# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/python:4-python3.8-appservice
FROM mcr.microsoft.com/azure-functions/python:4-python3.8

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY ./nlp-app nlp-app
WORKDIR /nlp-app
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker","--bind", "0.0.0.0:8000", "server:app"]
EXPOSE 8000
