"use strict";

(function (global, document, $) {
    const head = document.getElementsByTagName('HEAD')[0]
    const body = $('body')

    function getId(e, id){
        return Number(e.target.id.slice(id.length, e.target.id.length))
    }
    const arrayLink = document.createElement('link')
    arrayLink.rel = 'stylesheet'
    arrayLink.type = 'text/css'
    arrayLink.href = './data_structures/csl.array/styles.css'
    head.appendChild(arrayLink)

    function createArrayIntro() {
        const arrayIntroForm = document.createElement('form')
        const arrayTitle = document.createElement('input')
        arrayTitle.type = "submit"
        arrayTitle.id = "arrayTitle"
        arrayTitle.value = "Array"

        const ARRAY_INTRO = "An array is a data structure that contains a group of elements. Typically these elements are all of the same data type, such as an integer or string. Arrays are commonly used in computer programs to organize data so that a related set of values can be easily sorted or searched."

        arrayIntroForm.addEventListener('submit', handleIntro)

        function handleIntro(e) {
            e.preventDefault();
            alert(ARRAY_INTRO)
        }

        arrayIntroForm.appendChild(arrayTitle)

        body.append(arrayIntroForm)
    }

    let numArray = 0
    let arrays = []

    let arrayState = {
        SqureStyle: 'height: 25px; width: 25px; background: #fff; border: 1px solid #000;color: #000;text-align: center;font: 20px Arial, sans-serif; display: inline-block',
    }

    class CSL_Array {
        constructor(array = [], showTools = true, showIntro = false) {
            if (showIntro) {
                createArrayIntro()
            }
            arrays.push([])
            this.id = numArray
            numArray++
            createEmptyArray(this.id);
            if (showTools) {
                addNodeInputField(this.id);
                byIndexField(this.id)
                popField(this.id);
            }
            if (array.length !== 0) {
                renderGivenArray(this.id, array)
            }
            console.log(`#${this.id} array created`)
        }

        append(value) {
            appendNode(value, this.id)
        }

        pop() {
            return popNode(this.id)
        }

        get(index) {
            return getNode(index, this.id)
        }

        set(index, value) {
            setNode(index, value, this.id)
        }
    }

    function popNode(id) {
        const popValue = arrays[id].pop()
        console.log(`${popValue} poped`)
        $(`ul#array${id} li:last-child`).remove();
        return popValue
    }

    function renderPopNode(e) {
        e.preventDefault();

        const id = getId(e, "popForm")
        popNode(id)
    }

    function renderGivenArray(id, array) {
        for (let i = 0; i < array.length; i++) {
            appendNode(array[i], id)
        }
    }

    function createEmptyArray(id) {
        const array = document.createElement('ul')
        array.id = `array${id}`

        const body = $('body')
        body.append(array)
    }

    function appendNode(value, id) {
        arrays[id].push(value)
        renderNode(arrayState.SqureStyle, value, id)
    }

    function getNodeValue(e) {
        e.preventDefault();

        const id = getId(e, "addNodeForm")
        const value = document.querySelector(`#inputValue${id}`).value
        if (value !== '') {
            console.log(`${value} appended`)
            appendNode(value, id)
        }
    }

    function nodeWidth(value) {
        const styleLength = 25 + ((value.toString().length - 1) * 11)
        return `${styleLength}px`
    }

    function renderNode(NodeStyle, value, id) {
        const node = document.createElement('li');
        node.style = NodeStyle
        node.style.width = nodeWidth(value)
        node.innerHTML = value


        const array = document.querySelector(`#array${id}`)
        array.appendChild(node)
    }

    function addNodeInputField(id) {
        const addNodeForm = document.createElement('form');
        addNodeForm.id = `addNodeForm${id}`

        const valueField = document.createElement('input');
        valueField.id = `inputValue${id}`
        valueField.type = "text"
        valueField.placeholder = "value"

        const addNodeSubmit = document.createElement('input');
        addNodeSubmit.type = "submit"
        addNodeSubmit.value = "Append"

        addNodeForm.appendChild(valueField)
        addNodeForm.appendChild(addNodeSubmit)

        addNodeForm.addEventListener('submit', getNodeValue)

        body.append(addNodeForm)

    }

    function popField(id) {
        const popForm = document.createElement('form')
        popForm.id = `popForm${id}`
        const popButton = document.createElement('input');
        popButton.id = `popButton${id}`
        popButton.type = "submit"
        popButton.value = "Pop"

        popForm.appendChild(popButton)

        popForm.addEventListener('submit', renderPopNode)

        body.append(popForm)
    }

    function inputIndexOutOfRange(id, index) {
        let outOfRange = true
        if (0 <= index && index < arrays[id].length) {
            outOfRange = false
        }
        if (outOfRange) {
            alert("Input index out of range")
        }
        return outOfRange
    }

    function getNode(index, id) {
        if (!inputIndexOutOfRange(id, index)) {
            const arrayChilds = document.querySelector(`#array${id}`).childNodes
            const target = arrayChilds[index]
            target.style.backgroundColor = "red";
            setTimeout(function () {
                target.style.backgroundColor = "#fff"
            }, 3000)
            return arrays[id][index]
        }
    }

    function renderGetNode(e) {
        e.preventDefault();

        const id = getId(e, "getForm")

        const index = document.querySelector(`#indexValue${id}`).value
        if (index !== '') {
            getNode(Number(index), id)
        }
    }

    function setNode(index, value, id) {
        if (value !== '' && !inputIndexOutOfRange(id, index)) {
            const arrayChilds = document.querySelector(`#array${id}`).childNodes
            const target = arrayChilds[index]
            arrays[id][index] = value
            target.innerHTML = value
            target.style.backgroundColor = "#4CAF50"
            setTimeout(function () {
                target.style.backgroundColor = "#fff", target.style.width = nodeWidth(value)
            }, 2000)
        }
    }

    function renderSetNode(e) {
        e.preventDefault();

        const id = getId(e, "setForm")
        console.log(id)
        const index = document.querySelector(`#setValueIndex${id}`).value
        const value = document.querySelector(`#setValue${id}`).value

        if (index === '') {
            alert("Please enter index first!")
        } else {
            setNode(Number(index), value, id)
        }
    }

    function byIndexField(id) {
        /* Get Form */
        const getForm = document.createElement('form')
        getForm.id = `getForm${id}`

        const indexField = document.createElement('input');
        indexField.id = `indexValue${id}`
        indexField.type = "number"
        indexField.placeholder = "index"

        const getNode = document.createElement('input');
        getNode.type = "submit"
        getNode.value = "Get"

        getForm.appendChild(indexField)
        getForm.appendChild(getNode)

        getForm.addEventListener('submit', renderGetNode)

        /* Set Form */

        const setForm = document.createElement('form')
        setForm.id = `setForm${id}`

        const setValueIndexFiled = document.createElement('input');
        setValueIndexFiled.id = `setValueIndex${id}`
        setValueIndexFiled.type = "number"
        setValueIndexFiled.placeholder = "index to set"

        const setValueField = document.createElement('input');
        setValueField.id = `setValue${id}`
        setValueField.type = "text"
        setValueField.placeholder = "value to set"

        const setNode = document.createElement('input');
        setNode.type = "submit"
        setNode.value = "Set"

        setForm.appendChild(setValueIndexFiled)
        setForm.appendChild(setValueField)
        setForm.appendChild(setNode)

        setForm.addEventListener('submit', renderSetNode)

        body.append(getForm)
        body.append(setForm)
    }
    global.CSL_Array = global.CSL_Array || CSL_Array
})(window, window.document, $);