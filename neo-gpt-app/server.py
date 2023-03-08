
import os
from fastapi import Request,FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

os.environ["HF_API_TOKEN"] = "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"
#Download and load you model
#sentiment_analysis_pipeline = pipeline("sentiment-analysis",model="siebert/sentiment-roberta-large-english")
generator = pipeline("text-generation", model="EleutherAI/gpt-neo-2.7B",max_length=150)
#create your API
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Set up your API and integrate your ML model
@app.post("/gptneo/")
async def get_body(request: Request):
    req = await request.json()
    result = generator(req['text'])
    return result
