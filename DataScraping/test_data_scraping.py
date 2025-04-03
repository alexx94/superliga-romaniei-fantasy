##importing all required libraries
from bs4 import BeautifulSoup
import pandas as pd
import requests 
import time
import re

all_teams = [] ## list to store all teams

table_id = "results2024-2025471_overall"
url = "https://fbref.com/en/comps/47/Liga-I-Stats"

df = pd.read_html(url, attrs={"id":table_id})[0]


df = df.dropna(subset=['Rk'])


print(df)