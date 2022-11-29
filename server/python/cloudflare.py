from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import sys
from time import sleep


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--window-size=1420,1080')
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
driver = webdriver.Chrome(options=chrome_options)



# s = Service(r'chromedriver.exe')        # <--- ENTER THE PATH OF CHROMEDRIVER.EXE HERE
BASE_URL = 'https://abuse.cloudflare.com/phishing'


# variables to access website's elements
NAME_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[1]/label/div/div[2]/div/input'
EMAIL_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[2]/label/div/div[2]/div/input'
CONFIRM_EMAIL_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[3]/label/div/div[2]/div/input'
TITLE_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[4]/label/div/div[2]/div/input'
COMPANY_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[5]/label/div/div[2]/div/input'
EVIDENCE_URLS_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[7]/label/div/div[2]/div/textarea'
LOGS_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[8]/label/div/div[2]/div/textarea'
SUBMIT_XPATH = '/html/body/div[1]/main/div/div[2]/form/div[12]/div/button'


# data
NAME = 'csgoreport'
EMAIL = 'csgoautoreport@proton.me'
TITLE = 'CSGOReport Phishing Website'
COMPANY = 'csgoreport'
# evidence_url = sys.argv[1]
evidence_url = 'http://testing.com'
LOGS = 'This domain is used for phishing purposes. \
Site contain phishing Steam login page stealing users credentials. \
If a victim clicks the “Sign in via Steam” button, it will pretend to open the login form from Steam, \
but will display a fake Steam login form, any login credentials that are entered will be sent to the attackers. \
They are getting full access to victims account with virtual items worth sometimes over thousands of dollars.\n\
Please take appropriate actions and take this domain down. \
This report was generated automatically from csgoreport.net , helping users from phishing websites!'


# start chrome
# driver = webdriver.Chrome(service=s)
driver.maximize_window()
driver.get(BASE_URL)
driver.implicitly_wait(10)

# code to insert data
try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, NAME_XPATH))).send_keys(NAME)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, EMAIL_XPATH))).send_keys(EMAIL)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, CONFIRM_EMAIL_XPATH))).send_keys(EMAIL)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, TITLE_XPATH))).send_keys(TITLE)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, COMPANY_XPATH))).send_keys(COMPANY)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, EVIDENCE_URLS_XPATH))).send_keys(evidence_url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, LOGS_XPATH))).send_keys(LOGS)
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, SUBMIT_XPATH))).click()
    print('Script COMPLETED...!')
except:
    print('Script FAILED...!')

sleep(3)
driver.quit()