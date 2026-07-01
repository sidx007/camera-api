from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()

@app.post("/API/AlarmEvent/EventPush")
async def handle_anpr(request: Request):
    body = await request.body()
    print("=== INCOMING EVENT ===")
    print(f"Payload: {body}")
    return {"status": "roger"}
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
