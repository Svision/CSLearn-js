/* JS Library usage examples */
"use strict";
log('----------')
log('SCRIPT: Examples of using CSLearn.js')

const SHOW_INTRO_BUTTON = true
const SHOW_TOOLS = true

function code(code) {
    const body = $('body')
    const pre = document.createElement('pre')
    const node = document.createElement("code")
    node.innerHTML = `${code}\nBelow ⬇️`
    node.appendChild(document.createElement('br'))
    node.style.backgroundColor = 'grey'
    node.style.display = 'block'
    node.style.fontSize = '15px'
    pre.appendChild(node)

    body.append(pre)
}

function examples() {
    //Array
    code("const a1 = new CSL_Array([1], SHOW_TOOLS, SHOW_INTRO_BUTTON ) \na1.get(0)")
    const a1 = new CSL_Array([1], SHOW_TOOLS, SHOW_INTRO_BUTTON)
    code("const a2 = new CSL_Array()\na2.append(2)\na2.set(0, 10)")
    const a2 = new CSL_Array()
    a2.append(2)
    code("const a3 = new CSL_Array([3, 4])\na3.pop()")
    const a3 = new CSL_Array([3, 4])
    code("const a4 = new CSL_Array([123, 234, 345, 4, 5], !SHOW_TOOLS)")
    const a4 = new CSL_Array([123, 234, 345, 4, 5], !SHOW_TOOLS)

    setTimeout(function () {
        a3.pop();
    }, 3000)
    setTimeout(function () {
        a1.get(0)
    }, 4000)
    setTimeout(function () {
        a2.set(0, 10)
    }, 5000)

    // Binary Search
    code("const binarySearch1 = new CSL_BinarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 500, SHOW_INTRO_BUTTON )")
    const binarySearch1 = new CSL_BinarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 500, SHOW_INTRO_BUTTON)
    code("const binarySearch2 = new CSL_BinarySearch([5, 1, 10, 2, 6, 4, 8, 7, 9, 12, 41, 23, 30, 79], 41) // AUTO SORTED")
    const binarySearch2 = new CSL_BinarySearch([5, 1, 10, 2, 6, 4, 8, 7, 9, 12, 41, 23, 30, 79], 41)
    code("const binarySearch3 = new CSL_BinarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, 1000)")
    const binarySearch3 = new CSL_BinarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, 1000)

    // Linked List
    code("const ll1 = new CSL_LinkedList([0, 1, 2], SHOW_TOOLS, SHOW_INTRO_BUTTON)")
    const ll1 = new CSL_LinkedList([0, 1, 2], SHOW_TOOLS, SHOW_INTRO_BUTTON)

    code("const ll2 = new CSL_LinkedList()\nll2.add(1)\nll2.add(2)\nll2.delete()")
    const ll2 = new CSL_LinkedList()
    ll2.add(1)
    ll2.add(2)
    ll2.delete()

    // Queue
    code("const queue1 = new CSL_Queue(['Person3', 'Person2', 'Person1'], SHOW_TOOLS, SHOW_INTRO_BUTTON)")
    const queue1 = new CSL_Queue(['Person3', 'Person2', 'Person1'], SHOW_TOOLS, SHOW_INTRO_BUTTON)
    code("const queue2 = new CSL_Queue()\nqueue2.enqueue(1)\nqueue2.enqueue(2)\nqueue2.dequeue()")
    const queue2 = new CSL_Queue()
    queue2.enqueue(1)
    queue2.enqueue(2)
    queue2.dequeue()

    // Stack
    code("const stack1 = new CSL_Stack([1, 2, 3], SHOW_TOOLS, SHOW_INTRO_BUTTON)")
    const stack1 = new CSL_Stack([1, 2, 3], SHOW_TOOLS, SHOW_INTRO_BUTTON)
    code("const stack2 = new CSL_Stack()\nstack2.push(1)\nstack2.push(2)\nstack2.pop()")
    const stack2 = new CSL_Stack()
    stack2.push(1)
    stack2.push(2)
    stack2.pop()

    // Selection Sort
    code("const selctionSort1 = new CSL_SelectionSort([3, 4, 1, 17, 22, 5, 36, 9], 500, SHOW_INTRO_BUTTON)")
    const selctionSort1 = new CSL_SelectionSort([3, 4, 1, 17, 22, 5, 36, 9], SHOW_INTRO_BUTTON)
    code("const selctionSort2 = new CSL_SelectionSort([31, 21, 12, 11, 1, 3, 65, 134, 61, 1])")
    const selctionSort2 = new CSL_SelectionSort([31, 21, 12, 11, 1, 3, 65, 134, 61, 1])
}

examples()