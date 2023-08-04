import requests
import json
import pandas as pd
from dotenv import load_dotenv
from .config import settings
from datetime import datetime, timedelta


def tidepool_loader() -> None:

    starting_date = datetime.now() - timedelta(days=1)
    start_date_str = starting_date.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    url = "https://api.tidepool.org/auth/login"

    payload = {}
    headers = {
        'Authorization': settings.base64_auth
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    datasets = ["physicalActivity", "cbg",
                "food", "bolus", "basal", "deviceEvent"]
    token = response.headers['x-tidepool-session-token']
    userid = response.json()['userid']
    for dataset_type in datasets:
        # special case for physical activity because we might not do this daily.
        # we can get the latest, but we need to latest running data only.
        # the api only has an option for the latest so we can recursively get latest until running is found
        if dataset_type == "physicalActivity":
            activityName = ""
            activityDate = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            while not activityName.startswith("Running"):
                url = f"https://api.tidepool.org/data/{userid}?endDate={activityDate}&latest=true&type={dataset_type}"
                payload = {}
                headers = {
                    'X-Tidepool-Session-Token': token,
                }

                response = requests.request("GET", url, headers=headers, data=payload)

                data = json.dumps(response.json())
                data_json = response.json()
                activityName = data_json[0]['name']
                try:
                    activityDate = datetime.strptime(data_json[0]['time'], "%Y-%m-%dT%H:%M:%S.%fZ") - timedelta(minutes=1)
                    activityDate = activityDate.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
                except ValueError:
                    activityDate = datetime.strptime(data_json[0]['time'], "%Y-%m-%dT%H:%M:%SZ") - timedelta(minutes=1)
                    activityDate = activityDate.strftime("%Y-%m-%dT%H:%M:%S.000Z")

            with open(f"{dataset_type}.json", "w") as f:
                f.write(data)
        else:
            url = f"https://api.tidepool.org/data/{userid}?{'startDate='+start_date_str}&type={dataset_type}"
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
