import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

# Set up Chrome WebDriver
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
# Remove headless mode
# options.add_argument('--headless')

driver = webdriver.Chrome(options=options)

# Open the URL and click the next page button 6 times
start_page_url = "https://worldwide.espacenet.com/searchResults?ST=singleline&locale=fr_EP&submitted=true&DB=&query=medicine+artificial+intelligence+"
driver.get(start_page_url)

for _ in range(5):
    try:
        next_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="nextPageLinkTop"]')))
        next_button.click()
        time.sleep(3)  # Adding a delay to ensure the next page loads properly
    except TimeoutException:
        print("TimeoutException: Failed to click next page button")

# Function to scrape patent information
def scrape_patent_info(driver, patent_number, writer):
    # Construct XPath for the patent link
    patent_xpath = f'//*[@id="titleRow_{patent_number}"]'
    
    attempt = 1
    while attempt <= 3:  # Try clicking the link for a maximum of 3 attempts
        try:
            # Click on the patent link
            patent_link = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, patent_xpath)))
            patent_link.click()
            break  # If click successful, exit the retry loop
        except TimeoutException:
            print(f"Attempt {attempt}: TimeoutException - Failed to click patent link")
            print("Retrying after a delay...")
            attempt += 1
            time.sleep(5)  # Wait for 5 seconds before retrying

    if attempt > 3:  # If all attempts fail, skip this patent
        print("Max attempts reached. Skipping this patent.")
        return
    
    try:
        # Wait for patent details to load
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="bookmarkTitle"]')))
    except TimeoutException:
        print("TimeoutException: Patent details did not load properly")
        return

    try:
        # Scraping patent information
        title = driver.find_element(By.XPATH, '//*[@id="bookmarkTitle"]').text
        inventors = driver.find_element(By.XPATH, '//*[@id="applicants"]').text
        applicants = driver.find_element(By.XPATH, '//*[@id="applicants"]').text
        abstract = driver.find_element(By.XPATH, '//*[@id="body"]/div[2]/p[1]').text

        # Click on the patent image URL
        image_url_button = driver.find_element(By.XPATH, '//*[@id="epoContentLeft"]/ul/li/ul/li[5]/a')
        image_url_button.click()
        time.sleep(1)  # Adding a delay to ensure the URL loads properly
        patent_image_url = driver.current_url

        # Display the scraped data in the terminal
        print("Title:", title)
        print("Inventor(s):", inventors.encode('latin1', 'ignore').decode('utf-8'))
        print("Applicant(s):", applicants.encode('latin1', 'ignore').decode('utf-8'))
        print("Abstract:", abstract)
        print("Patent Image URL:", patent_image_url)
        print("--------------------------------------------------")

        # Write the scraped data to CSV
        writer.writerow([title, inventors, applicants, abstract, patent_image_url])
        
    except NoSuchElementException:
        print("NoSuchElementException: Failed to locate patent information elements")
    
    # Go back to search results
    driver.get(start_page_url)
    time.sleep(3)  # Adding a longer delay to ensure the page reloads properly

# Open CSV file for writing
with open('patent_data11.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Title', 'Inventors', 'Applicants', 'Abstract', 'Patent Image URL'])
    
    # Start scraping from the specified patent on the sixth page
    start_patent_number = 126  # The first patent on the sixth page
    for patent_number in range(start_patent_number, start_patent_number + 24):
        scrape_patent_info(driver, patent_number, writer)
        
        # Check if there's a next page after scraping each patent on the current page
        try:
            next_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="nextPageLinkTop"]')))
            next_button.click()
            time.sleep(3)  # Adding a delay to ensure the next page loads properly
        except TimeoutException:
            print("TimeoutException: Failed to click next page button")

# Close the WebDriver
driver.quit()
