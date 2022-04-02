class Graph:
    def __init__(self, nodes, children):
        self.nodes = nodes
        self.children = children
        for i in len(nodes):
            self.nodes.append(Node(i, i*25, i*
class Node:
    def __init__(self, id, x, y, color):
        self.id = id
        self.x = x
        self.y = y
        self.color = color
        self.children = []

    def add_child(n):
        self.children.append(n)
