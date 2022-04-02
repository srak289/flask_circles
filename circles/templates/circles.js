var mousePosition;
var isMouseDown;

var c = document.getElementById("myCanvas");

var ctx = c.getContext("2d");

document.addEventListener("mousemove", move, false);
document.addEventListener("mousedown", setDraggable, false);
document.addEventListener("mouseup", setDraggable, false);

{% for node in nodes %}
var p{{ node.id }} = new Point({{ node.x }}, {{ node.y }});
{% endfor %}

{% for node in nodes %}
var c{{ node.id }} = new Circle(p{{ node.id }}, {{ node.r }}, "{{ node.color }}", "black");
{% endfor %}

{% for node in nodes %}
var l{{ node.id }} = new Line(p{{ node.id }}, p{% if node.id < total %}{{ node.id+1 }}{% else %}{{1}}{% endif %}, "black");
{% endfor %}

var circles = [
{% for node in nodes %}
    c{{ node.id }},
{% endfor %}
];
var lines = [
{% for node in nodes %}
    l{{ node.id }},
{% endfor %}
];
var nodes = [
{% for node in nodes %}
    p{{ node.id }},
{% endfor %}
];

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawLines();
    drawCircles();
}

function drawLines() {
    for(var i = lines.length - 1; i >= 0; i--) {
        lines[i].draw();
    }
}
function drawCircles() {
    for (var i = circles.length - 1; i >= 0; i--) {
        circles[i].draw();
    }
}

var focused = {
    key: 0,
    state: false
}

function Circle(p, r, fill, stroke) {
    this.startingAngle = 0;
    this.endAngle = 2*Math.PI;
    this.p = p;
    this.r = r;
    
    this.fill = fill;
    this.stroke = stroke;
    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.p.x, this.p.y, this.r, this.startingAngle, this.endAngle);
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 3;
        ctx.fill()
        ctx.strokeStyle = this.stroke;
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "12px Times New Roman";
        var xoset = ctx.measureText('( '+this.p.x+', '+this.p.y+' )').width;
        
        ctx.fillText('( '+this.p.x+', '+this.p.y+' )', this.p.x-Math.round(xoset/2), this.p.y);
    }
    this.getLoc = function() {
        var loc = {
            x: this.p.x,
            y: this.p.y
        }
        return loc;
    }

}
function Line(p1, p2, stroke) {
    this.p1 = p1;
    this.p2 = p2;
    this.stroke = stroke;

    this.draw = function() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.strokeStyle = this.stroke;
        ctx.stroke();
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function move(e) {
    if(!isMouseDown) {
        return;
    }
    getMousePosition(e);
    if(focused.state) {
        circles[focused.key].p.x = mousePosition.x;
        circles[focused.key].p.y = mousePosition.y;
        console.log(circles[focused.key].p.x);
        console.log(circles[focused.key].p.y);
        draw();
        return;
    }
    for (var i = 0; i < circles.length; i++) {
        if (intersects(circles[i])) {
            circles.move(i, 0)
            focused.state = true;
            break;
        }
    }
    draw();
}

function setDraggable(e) {
    var t = e.type;
    if (t === "mousedown") {
        isMouseDown = true;
    } else if (t === "mouseup") {
        isMouseDown = false;
        releaseFocus();
    }
}

function releaseFocus() {
    focused.state = false;
}

function getMousePosition (e) {
    var rect = c.getBoundingClientRect();
    mousePosition = {
        x: Math.round(e.x - rect.left),
        y: Math.round(e.y - rect.top),
    }
}

function intersects(circle) {
    var areaX = mousePosition.x - circle.p.x;
    var areaY = mousePosition.y - circle.p.y;
    return areaX*areaX+areaY*areaY <= circle.r*circle.r;
}
Array.prototype.move = function(old_index, new_index) {
    if(new_index >= this.length) {
        var k = new_index = this.length;
        while((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};
draw();
