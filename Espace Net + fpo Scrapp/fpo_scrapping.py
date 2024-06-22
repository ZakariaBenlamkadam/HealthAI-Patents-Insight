import os
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

# loading the path of my driver:
os.environ['PATH'] += r"C:/selenium_drivers"
driver = webdriver.Chrome()

# The name and location of the initial print shop that will go into the search URL
url_base = "https://www.freepatentsonline.com/result.html?sort=relevance&srch=top&query_txt=ai+in+health+and+medecine&submit=&patents_us=on"

# Function to extract patent information
# Function to extract patent information
def extract_patent_info(driver):
    patent_info = {}
    try:
        # Try different XPaths for the title
        patent_info['Title'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[2]/div[2]/font/b').text
    except NoSuchElementException:
        try:
            patent_info['Title'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[21]/div[2]/font/b').text
        except NoSuchElementException:
            patent_info['Title'] = None
    
    try:
        # Try different XPaths for the abstract
        patent_info['Abstract'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[6]/div[2]/div').text
    except NoSuchElementException:
        try:
            patent_info['Abstract'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[7]/div[2]/div').text
        except NoSuchElementException:
            patent_info['Abstract'] = None
    patent_info['Inventors'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[10]/div[2]').text
    patent_info['Application Number'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[11]/div[2]').text
    patent_info['Publication Date'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[12]/div[2]').text
    patent_info['Filing Date'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[13]/div[2]').text
    
    try:
        patent_info['Patent Images'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[18]/div[2]/a').get_attribute('href')
    except NoSuchElementException:
        try:
            patent_info['Patent Images'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[17]/div[2]/a').get_attribute('href')
        except NoSuchElementException:
            try :
                patent_info['Patent Images'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[19]/div[2]/a').get_attribute('href')
            except NoSuchElementException:
                try:
                    patent_info['Patent Images'] = driver.find_element(By.XPATH, '/html/body/div/div/div[3]/div[20]/div[2]/a').get_attribute('href')
                except NoSuchElementException:
                    patent_info['Patent Images'] = None       
               
    return patent_info

# Initialize a list to store patent information
patent_data = []

# Iterate through each page
for page_num in range(1, 4):  # Change range as per the number of pages
    url = f"{url_base}&p={page_num}"
    driver.get(url)
    
    # Wait for the patents to load
    WebDriverWait(driver, 60).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="results"]/div[2]/div/div/table/tbody/tr[2]/td[3]/a')))
    time.sleep(1)  # Adding a small delay for safety

    # Iterate through each patent on the page
    for patent_num in range(2, 52):  # Assuming 50 patents per page
        patent_xpath = f'//*[@id="results"]/div[2]/div/div/table/tbody/tr[{patent_num}]/td[3]/a'
        patent_link = WebDriverWait(driver, 60).until(EC.visibility_of_element_located((By.XPATH, patent_xpath)))
        time.sleep(1)  # Adding a small delay for safety
        patent_link.click()
        time.sleep(5)  # Adjust the waiting time as needed
        try:
            patent_info = extract_patent_info(driver)
            patent_data.append(patent_info)
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            driver.back()  # Go back to the previous page to extract the next patent

# Close the webdriver
driver.quit()

# Convert the list of dictionaries to a DataFrame
df = pd.DataFrame(patent_data)

# Save the DataFrame to a CSV file
df.to_csv('patent_data.csv', index=False)