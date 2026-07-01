from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()

@app.api_route("/{path_name:path}", methods=["GET", "POST"])
async def catch_all(request: Request, path_name: str):
    body = await request.body()
    print("=== INCOMING ===")
    print(f"Path: /{path_name}")
    print(f"Headers: {dict(request.headers)}")
    print(f"Payload: {body}")
    return {"status": "roger"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
