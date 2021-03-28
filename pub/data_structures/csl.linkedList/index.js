"use strict";

(function (global, document, $) {
    const head = document.getElementsByTagName('HEAD')[0]
    const body = $('body')

    function getId(e, id){
        return Number(e.target.id.slice(id.length, e.target.id.length))
    }

    function timeout(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    const LLLink = document.createElement('link')
    LLLink.rel = 'stylesheet'
    LLLink.type = 'text/css'
    LLLink.href = './data_structures/csl.linkedList/styles.css'
    head.appendChild(LLLink)

    function createLLIntro() {
        const LLIntroForm = document.createElement('form')
        const LLTitle = document.createElement('input')
        LLTitle.type = "submit"
        LLTitle.id = "LLTitle"
        LLTitle.value = "Linked List"

        const LL_INTRO = "a linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence."
        LLIntroForm.addEventListener('submit', handleIntro)

        function handleIntro(e) {
            e.preventDefault();
            alert(LL_INTRO)
        }

        LLIntroForm.appendChild(LLTitle)

        body.append(LLIntroForm)
    }

    let numLL = 0
    let LLs = []


    class LLNode {
        constructor(value) {
            this.value = value
            this.next = null
        }
    }

    class CSL_LinkedList {
        constructor(LL = [], showTools = true, showIntro = false) {
            if (showIntro) {
                createLLIntro()
            }
            const head = new LLNode(null)
            LLs.push([head, 0])
            this.id = numLL
            numLL++;
            renderLinkedList(this.id, head)
            if (LL.length !== 0) {
                for (let i = 0; i < LL.length; i++) {
                    renderLLNode(this.id, LL[i])
                }
            }
            if (showTools) {
                addLLNodeField(this.id)
                deleteLLNodeField(this.id)
            }
        }

        add(value) {
            addValueToLL(this.id, value)
        }

        delete() {
            deleteLLNode(this.id)
        }
    }

    function addValueToLL(id, value) {
        const node = new LLNode(value)
        var curr;
        let head = LLs[id][0]
        if (head.value == null) {
            LLs[id][0] = node
        } else {
            curr = head;
            while (curr.next) {
                curr = curr.next;
            }
            curr.next = node
        }
        LLs[id][1]++;
        renderLLNode(id, value)
    }

    async function handleAddLLnode(e) {
        e.preventDefault()

        const id = getId(e, "addLLNodeForm")
        const value = document.querySelector(`#LLinputValue${id}`).value
        if (value !== '') {
            await renderTraverseLinkedList(id, 'yellow')
            renderLLNode(id, value)
        }

    }

    function addLLNodeField(id) {
        const addLLNodeForm = document.createElement('form');
        addLLNodeForm.id = `addLLNodeForm${id}`

        const valueField = document.createElement('input');
        valueField.id = `LLinputValue${id}`
        valueField.type = "text"
        valueField.placeholder = "value"

        const addNodeSubmit = document.createElement('input');
        addNodeSubmit.type = "submit"
        addNodeSubmit.value = "Add Last"

        addLLNodeForm.appendChild(valueField)
        addLLNodeForm.appendChild(addNodeSubmit)

        addLLNodeForm.addEventListener('submit', handleAddLLnode)

        body.append(addLLNodeForm)

    }

    async function renderTraverseLinkedList(id, lastNodeColor) {
        let i = 0;
        const queryDOM = $(`ul#linkedlist${id} div`)
        if (queryDOM.length === 0) return;
        for (i; i < queryDOM.length - 1; i++) {
            queryDOM[i].children[0].style.backgroundColor = 'green'
            queryDOM[i].children[1].style.backgroundColor = 'green'
            await timeout(500)
            queryDOM[i].children[0].style.backgroundColor = 'white'
            queryDOM[i].children[1].style.backgroundColor = 'white'
        }
        queryDOM[i].children[0].style.backgroundColor = lastNodeColor
        queryDOM[i].children[1].style.backgroundColor = lastNodeColor
        await timeout(500)
        setTimeout(() => {
            queryDOM[i].children[0].style.backgroundColor = 'white'
            queryDOM[i].children[1].style.backgroundColor = 'white'
        }, 500)
    }

    async function deleteLLNode(id) {
        await renderTraverseLinkedList(id, 'red')
        $(`ul#linkedlist${id} div:nth-last-child(2)`).remove()
    }

    function handleDeleteLLNode(e) {
        e.preventDefault()

        const id = getId(e, "deleteForm")
        deleteLLNode(id)
    }

    function deleteLLNodeField(id) {
        const deleteForm = document.createElement('form')
        deleteForm.id = `deleteForm${id}`
        const deleteButton = document.createElement('input');
        deleteButton.id = `deleteButton${id}`
        deleteButton.type = "submit"
        deleteButton.value = "Delete Last"

        deleteForm.appendChild(deleteButton)

        deleteForm.addEventListener('submit', handleDeleteLLNode)

        body.append(deleteForm)
    }

    function renderLinkedList(id, head) {
        const linkedList = document.createElement('ul')
        linkedList.className = "linkedlist"
        linkedList.id = `linkedlist${id}`
        body.append(linkedList)
        const headNode = document.createElement('li');
        headNode.className = "node"
        headNode.style.width = "55px"
        if (head.value == null) {
            headNode.innerHTML = "NULL"
        } else {
            headNode.innerHTML = head.value
        }
        linkedList.appendChild(headNode)
    }

    function renderLLNode(id, value) {
        const LLnodeContainer = document.createElement('div');
        LLnodeContainer.id = `LLnodeContainer${id}`
        LLnodeContainer.style.display = "inline-block"

        const LLnode = document.createElement('li');
        LLnode.className = "node"
        LLnode.style.width = `${25 + ((value.toString().length - 1) * 11)}px`
        LLnode.innerHTML = value

        const nextNode = document.createElement('span');
        nextNode.className = "emptyNode"
        nextNode.style.width = "15px"

        const nextArrow = document.createElement('span');
        nextArrow.id = `arrow-right${id}`
        nextArrow.className = "arrow-right"

        LLnodeContainer.appendChild(LLnode)
        LLnodeContainer.appendChild(nextNode)
        LLnodeContainer.appendChild(nextArrow)

        const linkedlist = document.querySelector(`#linkedlist${id}`)
        linkedlist.insertBefore(LLnodeContainer, linkedlist.lastChild)
    }
    global.CSL_LinkedList = global.CSL_LinkedList || CSL_LinkedList
})(window, window.document, $);