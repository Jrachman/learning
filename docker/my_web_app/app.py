#https://medium.com/@kelvin_sp/docker-introduction-what-you-need-to-know-to-start-creating-containers-8ffaf064930a

from flask import Flask

app = Flask(__name__) #creates a Flask called app
@app.route("/") #defines where to route app to

def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0") #runs app in debug mode and localhost
