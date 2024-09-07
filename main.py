import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/explore_open_mats")
def explore_open_mats():
    return render_template("explore_open_mats.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
