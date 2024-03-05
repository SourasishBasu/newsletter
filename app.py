import os
from flask import Flask, render_template, url_for, request
import requests

app = Flask(__name__)


def subscribe_user(email):
    resp = requests.post(f"https://api.mailgun.net/v3/lists/mlsa.newsletter@{os.environ['MAILING_BASE_URL']}/members",
                         auth=("api", f"{os.environ['MAILGUN_API_KEY']}"),
                         data={"subscribed": True,
                               "address": email}
                         )

    print(resp.status_code)

    return resp

# route to handle POST request containing email addresses
@app.route("/", methods=["GET", "POST"])
def index():

    # if user submits the form
    if request.method == "POST":

        email = request.form.get('email')

        subscribe_user(email=email)

    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True, port=5001)