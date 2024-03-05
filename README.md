# newsletter-flask

Simple demo for flask based newsletter subscription form.

# Setup
To set up the newsletter form follow these steps:

1. <b>Clone the Repository:</b> Clone the Newsletter Flask repository to your local machine.

```
git clone https://github.com/SourasishBasu/newsletter-flask.git
```

2. <b>Install Dependencies:</b> Navigate to the project directory and install the necessary dependencies with Poetry.

```
cd newsletter-flask
poetry install
python app.py
```

3. <b>Configure Credentials:</b> Add Mailgun credentials as environment variables to the project environment as `MAILGUN_API_KEY` and `MAILGUN_BASE_URL` for the Mailgun API key and Domain URL.

# Usage
Edit and run the `utils.py` file to send a test email to a recipient. 

### Sending custom emails
- Add the `html` attribute to the request if you wish to send a custom HTML based email template and add its local file path on the system.
- Change the name accordingly under `template` attribute if using a custom template from Mailgun Dashboard.
