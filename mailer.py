import requests
import os

# Sends a message from the mailing template on MAILGUN
resp = requests.post(f"https://api.mailgun.net/v3/{os.environ['MAILGUN_BASE_URL']}/messages",
                     auth=("api", f"{os.environ['MAILGUN_API_KEY']}"),

                     # specify the mailing list as both sender and receiver in the email data params
                     data={"from": f"MLSA Newsletter <mlsa.newsletter@{os.environ['MAILGUN_BASE_URL']}>",
                           "to": f"MLSA Newsletter <mlsa.newsletter@{os.environ['MAILGUN_BASE_URL']}>",
                           "subject": "Testing Mailing List",
                           "template": "newsletter",
                           "h:X-Mailgun-Variables": "{'test': 'test'}"})

print(resp.text)
