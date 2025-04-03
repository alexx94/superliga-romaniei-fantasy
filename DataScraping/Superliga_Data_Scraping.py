from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import pandas as pd
import random
import os
from tqdm import tqdm

def scrape_team_urls(url, table_id):
    # Set up Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    
    # Initialize the driver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    team_urls = []
    
    try:
        # Navigate to the URL
        driver.get(url)
        
        # Wait for the page to load
        time.sleep(5)
        
        # Find the table
        table = driver.find_element(By.ID, table_id)
        
        # Get all rows
        rows = table.find_elements(By.TAG_NAME, "tr")
        
        # Process each row
        for row in rows:
            try:
                # Find team cells
                team_cells = row.find_elements(By.CSS_SELECTOR, "td[data-stat='team']")
                
                for cell in team_cells:
                    # Find anchor tags
                    links = cell.find_elements(By.TAG_NAME, "a")
                    
                    for link in links:
                        href = link.get_attribute("href")
                        if href:
                            team_urls.append(href)
            except Exception as e:
                continue
    
    except Exception as e:
        print(f"Error scraping team URLs: {e}")
    
    finally:
        # Close the browser
        driver.quit()
    
    return team_urls

def scrape_team_stats(team_url, stats_table_id="div_stats_standard_47"):
    # Set up Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    
    # Initialize the driver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    try:
        # Navigate to the team URL
        driver.get(team_url)
        
        # Add a random delay to avoid being blocked
        time.sleep(random.uniform(3, 6))
        
        # Extract team name for reference
        try:
            team_name = driver.find_element(By.CSS_SELECTOR, "h1[itemprop='name']").text.strip()
        except:
            team_name = team_url.split("/")[-1].replace("-Stats", "")
        
        print(f"Scraping stats for: {team_name}")
        
        # Find the stats table
        try:
            stats_table = driver.find_element(By.ID, stats_table_id)
        except Exception as e:
            print(f"Stats table not found for {team_name}. Error: {e}")
            return pd.DataFrame()  # Return empty DataFrame if table not found
        
        # Extract the table headers
        headers = []
        header_rows = stats_table.find_elements(By.CSS_SELECTOR, "thead tr")
        
        if header_rows:
            # Get the last header row which usually contains the column names
            header_cells = header_rows[-1].find_elements(By.TAG_NAME, "th")
            for cell in header_cells:
                # Get the data-stat attribute as it's more reliable than text content
                stat_name = cell.get_attribute("data-stat")
                if stat_name:
                    headers.append(stat_name)
        
        # Extract the table data
        rows_data = []
        data_rows = stats_table.find_elements(By.CSS_SELECTOR, "tbody tr")
        
        for row in data_rows:
            # Skip rows with the class "thead" or "over_header" which are secondary headers
            row_class = row.get_attribute("class")
            if row_class and ("thead" in row_class or "over_header" in row_class):
                continue
                
            # Get all cells in the row
            row_cells = row.find_elements(By.TAG_NAME, "td") + row.find_elements(By.TAG_NAME, "th")
            
            # Extract data from each cell
            row_data = {}
            for i, cell in enumerate(row_cells):
                if i < len(headers):
                    data_stat = cell.get_attribute("data-stat")
                    # Use the data-stat attribute if available, otherwise use header index
                    column_name = data_stat if data_stat else headers[i]
                    
                    # Get text content
                    value = cell.text.strip()
                    row_data[column_name] = value
            
            # Add team name to the row data
            row_data["team_name"] = team_name
            row_data["team_url"] = team_url
            
            rows_data.append(row_data)
        
        # Create DataFrame
        df = pd.DataFrame(rows_data)
        
        return df
    
    except Exception as e:
        print(f"Error scraping team stats: {e}")
        return pd.DataFrame()  # Return empty DataFrame on error
    
    finally:
        # Close the browser
        driver.quit()

def scrape_all_team_stats(league_url, league_table_id, stats_table_id="div_stats_standard_47", output_file="all_team_stats.csv"):
    # Step 1: Get all team URLs
    print("Step 1: Scraping team URLs...")
    team_urls = scrape_team_urls(league_url, league_table_id)
    
    if not team_urls:
        print("No team URLs found. Exiting.")
        return None
    
    print(f"Found {len(team_urls)} team URLs.")
    
    # Step 2: Scrape stats for each team
    print("\nStep 2: Scraping stats for each team...")
    all_teams_stats = []
    
    for i, team_url in enumerate(tqdm(team_urls), 1):
        print(f"\nProcessing team {i}/{len(team_urls)}")
        team_stats = scrape_team_stats(team_url, stats_table_id)
        
        if not team_stats.empty:
            all_teams_stats.append(team_stats)
            print(f"Successfully scraped stats. Found {len(team_stats)} player records.")
        else:
            print(f"Failed to scrape stats for {team_url}.")
        
        # Add a delay between requests to be respectful
        if i < len(team_urls):
            delay = random.uniform(5, 10)
            print(f"Waiting {delay:.1f} seconds before next request...")
            time.sleep(delay)
    
    # Step 3: Combine all stats and save to CSV
    if all_teams_stats:
        print("\nStep 3: Combining all stats and saving to CSV...")
        combined_stats = pd.concat(all_teams_stats, ignore_index=True)
        
        # Save to CSV
        combined_stats.to_csv(output_file, index=False, encoding="utf-8")
        print(f"Stats successfully saved to {output_file}")
        print(f"Total records: {len(combined_stats)}")
        
        return combined_stats
    else:
        print("No stats were scraped. Nothing to save.")
        return None

# Example usage
if __name__ == "__main__":
    league_url = "https://fbref.com/en/comps/47/Liga-I-Stats"
    league_table_id = "results2024-2025471_overall"
    stats_table_id = "div_stats_standard_47"
    output_file = "romanian_league_player_stats.csv"
    
    all_stats = scrape_all_team_stats(league_url, league_table_id, stats_table_id, output_file)
    
    if all_stats is not None:
        # Display a sample of the data
        print("\nSample of the scraped data:")
        print(all_stats.head())
        
        # Print some basic stats
        print(f"\nTotal number of players: {len(all_stats)}")
        print(f"Number of teams: {all_stats['team_name'].nunique()}")
        print(f"Number of columns: {len(all_stats.columns)}")
        print("\nColumns in the dataset:")
        for col in all_stats.columns:
            print(f"- {col}")