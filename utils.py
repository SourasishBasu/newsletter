import requests
import os

r = requests.post(

        # Here goes your Base API URL
        f"https://api.mailgun.net/v3/{os.environ['MAILGUN_BASE_URL']}/messages",
        # Authentication part - A Tuple
        auth=("api", os.environ["MAILGUN_API_KEY"]),

        # mail data will be used to send emails
        data={"from": f"Basu <postmaster@{os.environ['MAILGUN_BASE_URL']}>",
              "to": "<INSERT VERIFIED EMAIL>",
              "subject": "Newsletter Test",
              "template": "newsletter",
              "h:X-Mailgun-Variables": "{'test': 'test'}"})

print(r.status_code)
