import requests
import json
import pandas as pd
from dotenv import load_dotenv
from .config import settings
from datetime import datetime, timedelta


def tidepool_loader() -> None:

    url = "https://api.tidepool.org/auth/login"
    starting_date = datetime.now() - timedelta(days=1)
    start_date_str = starting_date.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    payload = {}
    headers = {
        'Authorization': settings.base64_auth}

    response = requests.request("POST", url, headers=headers, data=payload)
    datasets = ["physicalActivity", "cbg",
                "food", "bolus", "basal", "deviceEvent"]
    token = response.headers['x-tidepool-session-token']
    userid = response.json()['userid']
    for dataset_type in datasets:

        url = f"https://api.tidepool.org/data/{userid}?{'startDate='+start_date_str if dataset_type != 'physicalActivity' else 'latest=true'}&type={dataset_type}"
        print(url)
        payload = {}
        headers = {
            'X-Tidepool-Session-Token': token,
        }

        response = requests.request("GET", url, headers=headers, data=payload)

        data = json.dumps(response.json())
        with open(f"{dataset_type}.json", "w") as f:
            f.write(data)


if __name__ == "__main__":
    tidepool_loader()
