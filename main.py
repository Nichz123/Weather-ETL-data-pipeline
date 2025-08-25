#ETL data pipeline for weather API data

import os
import requests
import pandas as pd
from dotenv import load_dotenv

#Load creds from .env file
load_dotenv()
api_key = os.getenv("API_KEY")

#Define the base URL for Openweather API
# location = "http://api.openweathermap.org/geo/1.0/direct?q={city_name},{state_code},{country_code}&appid={api_key}"
# base_url = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={api_key}"

#Create the ETL pipeline

#1. Extract
def extract_data(city_name, state_code, country_code):

    location = requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q={city_name},{state_code},{country_code}&limit=1&appid={api_key}").json()
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={location[0]['lat']}&lon={location[0]['lon']}&appid={api_key}"

    response = requests.get(url)

    return response.json()

#2. Transform
def transform_data(data):
    transformed_data = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"]
    }

    return transformed_data

#3. Load
def load_data(data, filename):
    df = pd.DataFrame([data])
    df.to_csv(filename, index=False)

#Run the data pipeline

def run_etl_pipeline(city_name, state_code, country_code):
    data = extract_data(city_name, state_code, country_code)
    transformed_data = transform_data(data)
    load_data(transformed_data, "weather_data.csv")

city_name = "Dallas"
state_code = "TX"
country_code = "US"
run_etl_pipeline(city_name, state_code, country_code)