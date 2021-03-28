"use strict";

(function (global, document, $) {
    const head = document.getElementsByTagName('HEAD')[0]
    const body = $('body')

    function getId(e, id){
        return Number(e.target.id.slice(id.length, e.target.id.length))
    }

    const stackLink = document.createElement('link')
    stackLink.rel = 'stylesheet'
    stackLink.type = 'text/css'
    stackLink.href = './data_structures/csl.stack/styles.css'
    head.appendChild(stackLink)

    function createStackIntro() {
        const stackIntroForm = document.createElement('form')
        const stackTitle = document.createElement('input')
        stackTitle.type = "submit"
        stackTitle.id = "stackTitle"
        stackTitle.value = "Stack"

        const QUEUE_INTRO = "Stack is a linear data structure which follows a particular order in which the operations are performed. The order usually is LIFO(Last In First Out)."
        stackIntroForm.addEventListener('submit', handleIntro)

        function handleIntro(e) {
            e.preventDefault();
            alert(QUEUE_INTRO)
        }

        stackIntroForm.appendChild(stackTitle)

        body.append(stackIntroForm)
    }

    let numStack = 0

    class CSL_Stack {
        constructor(array=[], showTools=true, showIntro=false){
            if (showIntro) {
                createStackIntro()
            }
            this.id = numStack
            numStack++
            createEmptyStack(this.id);
            if (showTools) {
                renderPeekField(this.id)
                renderPushPopClearField(this.id)
            }
            if (array.length !== 0) {
                renderGivenStack(this.id, array)
            }
        }

        push(value){
            renderPushNode(this.id, value)
        }

        pop(){
            return renderPopStackNode(this.id)
        }

        peek(){
            return peekNode(this.id)
        }
    }

    function renderGivenStack(id, array){
        for (let i=0; i<array.length; i++){
            renderPushNode(id, array[i])
        }
    }

    function handlePeekNode(e){
        e.preventDefault();

        const id = getId(e, "stackPeekForm")
        const firstChild = document.querySelector(`#stack${id}`).firstChild
        firstChild.style.background = "green"
        setTimeout(() => {
            firstChild.style.background = "white"
        }, 700)
    }

    function peekNode(id){
        const firstChild = document.querySelector(`#stack${id}`).firstChild
        if (firstChild){
            return firstChild.innerHTML
        }
    }

    function renderPeekField(id){

        const peekForm = document.createElement('form')
        peekForm.id = `stackPeekForm${id}`
        const peekButton = document.createElement('input');
        peekButton.id = `peekButton${id}`
        peekButton.type = "submit"
        peekButton.value = "Peek"

        peekForm.appendChild(peekButton)
        peekForm.addEventListener('submit', handlePeekNode)
        body.append(peekForm)
    }


    function renderPushPopClearField(id){
        const pushForm = document.createElement('form');
        pushForm.id = `stackPushForm${id}`

        const valueField = document.createElement('input');
        valueField.id = `stackPushValue${id}`
        valueField.type = "text"
        valueField.placeholder = "value"

        const pushSubmit = document.createElement('input');
        pushSubmit.type = "submit"
        pushSubmit.value = "Push"

        pushForm.appendChild(valueField)
        pushForm.appendChild(pushSubmit)

        pushForm.addEventListener('submit', (e) => {
            e.preventDefault()
            renderPushNode(id, valueField.value)
        })

        body.append(pushForm)

        const popForm = document.createElement('form')
        popForm.id = `stackPopForm${id}`
        const stackPopButton = document.createElement('input');
        stackPopButton.id = `stackPopButton${id}`
        stackPopButton.type = "submit"
        stackPopButton.value = "Pop"
        const stackClearButton = document.createElement('input');
        stackClearButton.id = `stackClearButton${id}`
        stackClearButton.type = "reset"
        stackClearButton.value = "Clear"

        popForm.appendChild(stackPopButton)
        popForm.appendChild(stackClearButton)

        popForm.addEventListener('submit', (e) => {
            e.preventDefault();
            renderPopStackNode(id)
        })
        popForm.addEventListener('reset', (e) => {
            e.preventDefault();
            $(`#stack${id}`).empty()
        })

        body.append(popForm)
    }

    function renderPopStackNode(id){
        const stack = document.querySelector(`#stack${id}`)
        const popStackNode = stack.firstChild
        popStackNode.style.background = "grey"
        setTimeout(() => {
            $(`ul#stack${id} li:first-child`).remove();
        }, 500)
        return popStackNode.innerHTML
    }

    function renderPushNode(id, value){
        const node = document.createElement('li');
        node.className = "stackNode"
        node.style.width = `${25 + ((value.toString().length - 1) * 11)}px`
        node.innerHTML = value

        const stack = document.querySelector(`#stack${id}`)
        stack.insertBefore(node, stack.firstChild)

        setTimeout(() => {
            node.style.background = "white"
        }, 500)
    }
    
    function createEmptyStack(id){
        const stack = document.createElement('ul');
        stack.className = "stack"
        stack.id = `stack${id}`
        body.append(stack)
    }
    global.CSL_Stack = global.CSL_Stack || CSL_Stack
})(window, window.document, $);