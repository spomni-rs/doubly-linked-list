const Node = require('./node');

class LinkedList {
    constructor() {
   
      this._length = 0;
      this._head = null;
      this._tail = null;
    }
    
    get length(){
      return this._length;
    }

    append(data) {
      let node = new Node(data);
      
      if (!this._length){
        this._head = node;
        this._tail = node;
      } else {
        this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;
      }
      
      this._length++;

      return this;
    }

    head(){
      return this._head
        ? this._head.data
        : null;
    }

    tail(){
      return this._tail 
        ? this._tail.data 
        : null;
    }
    
    _at(index){
      let node = this._head;

      while (index > 0){
        node = node.next;
        index--;
      }
      
      return node;
    }

    at(index){
      return this._at(index).data;
    }

    insertAt(index, data){
    
      if (this.isEmpty()){
        return this.append(data)
      }

      let right = this._at(index);
      let left = right.prev;
      let node = new Node(data);
      
      left.next = node;
      node.prev = left;
    
      right.prev = node;
      node.next = right;
      
      this._length++;
      
      return this;
    }

    isEmpty(){
      return this._length === 0;
    }

    clear(){
      this._tail = null;
      this._head = null;
      this._length = 0;
      
      return this;
    }

    deleteAt(index){

      if (this.isEmpty()){
        return this;
      }
      
      this._length--;
      
      if (this._tail === this._head){
        this.head = null;
        this.head = null;
        
        return this;
      }
    
      let node = this._at(index);
      
      if (node === this._head){
      
        this._head = node.next;
        this._head.prev = null;
        
      } else if (node === this._tail){
      
        this._tail = node.prev;
        this._tail.next = null;

      } else {
      
        let left = node.prev;
        let right = node.next;
      
        left.next = right;
        right.prev = left;
      }
      
      return this;
    }

    reverse(){
    
      let node = this._head;
      this._head = this._tail;
      this._tail = node;
      
      let pairs = [];
      
      for (let i=1; i<this._length; i++){
        pairs.push([node, node.next]);
        node = node.next;
      }
      
      pairs.forEach((currPair) => {
        let [left, right] = currPair;
        
        left.prev = right;
        right.next = left;
      })
      
      return this;
    }

    indexOf(data){
      let node = this._head;
      
      for (let i=0; i<this._length; i++){
        if (node.data === data){
          return i;
        }
        
        if (!node.next){
          return -1;
        }
        
        node = node.next
      }
    }
}

module.exports = LinkedList;