"use strict";

(function (global, document, $) {
    const head = document.getElementsByTagName('HEAD')[0]
    const body = $('body')

    const queueLink = document.createElement('link')
    queueLink.rel = 'stylesheet'
    queueLink.type = 'text/css'
    queueLink.href = './data_structures/csl.queue/styles.css'
    head.appendChild(queueLink)

    function createQueueIntro() {
        const queueIntroForm = document.createElement('form')
        const queueTitle = document.createElement('input')
        queueTitle.type = "submit"
        queueTitle.id = "queueTitle"
        queueTitle.value = "Queue"

        const QUEUE_INTRO = "A Queue is a linear structure which follows a particular order in which the operations are performed. The order is First In First Out (FIFO)."
        queueIntroForm.addEventListener('submit', handleIntro)

        function handleIntro(e) {
            e.preventDefault();
            alert(QUEUE_INTRO)
        }

        queueIntroForm.appendChild(queueTitle)

        body.append(queueIntroForm)
    }

    let numQueue = 0

    class CSL_Queue {
        constructor(array=[], showTools=true, showIntro=false){
            if (showIntro) {
                createQueueIntro()
            }
            this.id = numQueue
            numQueue++
            createEmptyQueue(this.id);
            if (showTools) {
                renderEnqueueDequeueField(this.id)
            }
            if (array.length !== 0) {
                renderGivenQueue(this.id, array)
            }
        }

        enqueue(value){
            renderEnqueueNode(this.id, value)
        }

        dequeue(){
            return renderDequeueNode(this.id)
        }
    }

    function renderGivenQueue(id, array){
        for (let i=0; i<array.length; i++){
            renderEnqueueNode(id, array[i])
        }
    }

    function renderEnqueueDequeueField(id){
        const EnqueueForm = document.createElement('form');
        EnqueueForm.id = `EnqueueForm${id}`

        const valueField = document.createElement('input');
        valueField.id = `EnqueueValue${id}`
        valueField.type = "text"
        valueField.placeholder = "value"

        const EnqueueSubmit = document.createElement('input');
        EnqueueSubmit.type = "submit"
        EnqueueSubmit.value = "Enqueue"

        EnqueueForm.appendChild(valueField)
        EnqueueForm.appendChild(EnqueueSubmit)

        EnqueueForm.addEventListener('submit', (e) => {
            e.preventDefault()
            renderEnqueueNode(id, valueField.value)
        })

        body.append(EnqueueForm)

        const DequeueForm = document.createElement('form')
        DequeueForm.id = `DequeueForm${id}`
        const DequeueButton = document.createElement('input');
        DequeueButton.id = `DequeueButton${id}`
        DequeueButton.type = "submit"
        DequeueButton.value = "Dequeue"

        DequeueForm.appendChild(DequeueButton)

        DequeueForm.addEventListener('submit', (e) => {
            e.preventDefault();
            renderDequeueNode(id)
        })

        body.append(DequeueForm)
    }

    function renderDequeueNode(id){
        const queue = document.querySelector(`#queue${id}`)
        const dequeueNode = queue.lastChild
        dequeueNode.style.background = "grey"
        setTimeout(() => {
            $(`ul#queue${id} li:last-child`).remove();
        }, 500)
        return dequeueNode.innerHTML
    }

    function renderEnqueueNode(id, value){
        const node = document.createElement('li');
        node.className = "queueNode"
        node.style.width = `${25 + ((value.toString().length - 1) * 11)}px`
        node.innerHTML = value

        const queue = document.querySelector(`#queue${id}`)
        queue.insertBefore(node, queue.firstChild)

        setTimeout(() => {
            node.style.background = "white"
        }, 500)
    }
    
    function createEmptyQueue(id){
        const queue = document.createElement('ul');
        queue.id = `queue${id}`
        body.append(queue)
    }
    global.CSL_Queue = global.CSL_Queue || CSL_Queue
})(window, window.document, $);