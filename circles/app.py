from flask import Flask, render_template

app = Flask(__name__)

class Node:
    def __init__(self, id, x, y, r, color):
        self.x = x
        self.y = y
        self.r = r
        self.color = color
        self.id = id

nodes = [
    Node(1, 50, 50, 50, "blue"),
    Node(2, 150, 50, 50, "red"),
    Node(3, 250, 50, 50, "yellow"),
    Node(4, 350, 50, 50, "green"),
    Node(5, 450, 50, 50, "purple"),
    Node(6, 550, 50, 50, "pink")
]

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/circles.js')
def circles():
    return render_template('circles.js', nodes=nodes, total=len(nodes))

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
