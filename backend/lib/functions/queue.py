class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class Queue:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0
        self.max_length = 5

    def is_empty(self):
        return self.head is None 
    
    def peek(self):
        if self.is_empty():
            return None
        return self.head.val

    def dequeue(self):
        if self.is_empty():
            return
        self.head = self.head.next
        self.length -= 1
        if self.head is None: 
            self.tail = None

    def enqueue(self, val):
        new_node = Node(val)
        if self.is_empty(): 
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node 
            self.tail = new_node       
        self.length += 1

        if self.is_max_length(): 
            self.dequeue()

    def get_length(self):
        return self.length
    
    def is_max_length(self):
        return self.length > self.max_length 
    
    def get_nodes(self):
        arr = []
        cur = self.head
        while cur:
            arr.append(cur.val)
            cur = cur.next
        return arr