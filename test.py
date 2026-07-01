import requests

# The Target: Change this to http://192.168.1.10:8080/API/AlarmEvent/EventPush if testing locally on the Jetson
TARGET_URL = "https://camera-api-a321.onrender.com/API/AlarmEvent/EventPush"

# The Bouncer: Matches your camera setup
CREDENTIALS = ('admin', 'admin')

# The Payload: What the camera actually sees and throws
payload = {
    "plateNumber": "STAY-HARD-1",
    "confidence": 0.99,
    "eventType": "LPR_DETECTION"
}

print(f"Firing payload at {TARGET_URL}...")

try:
    # Pull the trigger
    response = requests.post(
        TARGET_URL,
        auth=CREDENTIALS,
        json=payload,
        timeout=10 # Stop waiting if the server is dead
    )
    
    print("=== IMPACT REPORT ===")
    print(f"Status Code: {response.status_code}")
    print(f"Server Reply: {response.text}")
    
except requests.exceptions.RequestException as error:
    print(f"Misfire. Connection failed: {error}")
