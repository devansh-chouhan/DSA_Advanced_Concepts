class Deque {
    constructor() {
        this.items = {};
        this.front = 0;
        this.back = 0;
    }

    pushFront(val) {
        this.front -= 1;
        this.items[this.front] = val;
    }

    pushBack(val) {
        this.items[this.back] = val;
        this.back += 1;
    }

    popFront() {
        if (this.isEmpty()) return undefined;
        const element = this.items[this.front];
        delete this.items[this.front];
        this.front += 1;
        return element;
    }

    popBack() {
        if (this.isEmpty()) return undefined;
        this.back -= 1;
        const element = this.items[this.back];
        delete this.items[this.back];
        return element;
    }

    peekFront() {
        if (this.isEmpty()) return undefined;
        return this.items[this.front];
    }

    peekBack() {
        if (this.isEmpty()) return undefined;
        return this.items[this.back - 1];
    }

    size() {
        return this.back - this.front;
    }

    isEmpty() {
        return this.size() === 0;
    }
}


const deque = new Deque();
deque.pushFront(10);
deque.pushFront(20);
deque.pushBack(30);
console.log(deque.peekFront()); // 20
deque.popBack();
console.log(deque.peekBack()); // 10
console.log(deque.size()); // 2
console.log(deque.popFront()); // 20

