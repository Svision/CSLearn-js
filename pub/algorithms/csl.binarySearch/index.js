"use strict";
(function (global, document, $) {
    const head = document.getElementsByTagName('HEAD')[0]
    const body = $('body')

    function getId(e, id) {
        return Number(e.target.id.slice(id.length, e.target.id.length))
    }

    const BSLink = document.createElement('link')
    BSLink.rel = 'stylesheet'
    BSLink.type = 'text/css'
    BSLink.href = './algorithms/csl.binarySearch/styles.css'
    head.appendChild(BSLink)

    function createBSIntro() {
        const BSIntroForm = document.createElement('form')
        const BSTitle = document.createElement('input')
        BSTitle.type = "submit"
        BSTitle.className = "BSTitle"
        BSTitle.value = "Binary Search"

        const BS_INTRO = "Search a sorted array by repeatedly dividing the search interval in half. Begin with an interval covering the whole array. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise narrow it to the upper half. Repeatedly check until the value is found or the interval is empty."

        BSIntroForm.addEventListener('submit', handleIntro)

        function handleIntro(e) {
            e.preventDefault();
            alert(BS_INTRO)
        }

        BSIntroForm.appendChild(BSTitle)

        body.append(BSIntroForm)
    }

    let numBS = 0
    let bss = []
    let bssState = []

    let bsState = {
        SqureStyle: 'height: 25px; width: 25px; background: #fff; border: 1px solid #000;color: #000;text-align: center;font: 20px Arial, sans-serif; display: inline-block',
        nextStyle: ''
    }

    class CSL_BinarySearch {
        constructor(inputArray, valueToSearch, speed = 500, showIntro = false) {
            bss.push([])
            bssState.push([valueToSearch, 0, inputArray.length - 1, -1, -1, speed, 0])
            this.id = numBS
            numBS++
            if (showIntro) {
                createBSIntro()
            }
            renderValueNode(this.id, valueToSearch)
            renderGivenBSArray(this.id, inputArray.sort(function (a, b) {
                return a - b
            }))
            nextBSStepField(this.id)
            autoSearchBSField(this.id)
            console.log(`#${this.id} Binary Search created`)
        }

        next() {
            BSNextStep(this.id)
        }

        autoSearch() {
            autoBinarySearch(this.id)
        }
    }

    function renderValueNode(id, value) {
        const promt = `Value to be search: ${value}`
        const styleLength = 25 + ((promt.toString().length - 1) * 11)
        const valueNode = document.createElement('li')
        valueNode.id = `valueNode${id}`
        valueNode.style = bsState.SqureStyle
        valueNode.style.width = `${styleLength}px`
        valueNode.style.marginTop = '10px'
        valueNode.innerHTML = promt

        body.append(valueNode)
    }

    function renderGivenBSArray(id, array) {
        const bsArray = document.createElement('ul')
        bsArray.id = `BSArray${id}`
        body.append(bsArray)

        for (let i = 0; i < array.length; i++) {
            const value = array[i]
            bss[id].push(value)
            renderBSNode(bsState.SqureStyle, value, id)
        }
    }

    function renderBSNode(NodeStyle, value, id) {
        const styleLength = 25 + ((value.toString().length - 1) * 11)
        const node = document.createElement('li');
        node.style = NodeStyle
        node.style.width = `${styleLength}px`
        node.innerHTML = value

        const bs = document.querySelector(`#BSArray${id}`)
        bs.appendChild(node)
    }

    function autoBinarySearch(id) {
        const speed = bssState[id][5]
        const nextButton = document.querySelector(`#nextButton${id}`)
        const autoSearchButton = document.querySelector(`#autoSearchBSButton${id}`)
        const resetBSButton = document.querySelector(`#resetBSButton${id}`)

        nextButton.style.display = "none"
        resetBSButton.style.display = "none"
        autoSearchButton.value = "Searching..."
        autoSearchButton.type = "button"

        let i = 0
        for (i; i < Math.ceil(Math.log2(bss[id].length)) + 1; i++) {
            delayBS(id, i * speed)
        }

        setTimeout(() => {
            nextButton.style.display = "initial"
            resetBSButton.style.display = "initial"
            autoSearchButton.value = `Auto Search@Speed: ${bssState[id][5]}ms`
            autoSearchButton.type = "submit"
        }, (i - 2) * speed)
    }

    function delayBS(id, speed) {
        setTimeout(() => {
            BSNextStep(id)
        }, speed)
    }

    function renderAutoBinarySearch(e) {
        e.preventDefault();

        const id = getId(e, "autoSearchBSForm")
        autoBinarySearch(id)
    }

    function BSNextStep(id) {
        const value = bssState[id][0]
        const arrayChilds = document.querySelector(`#BSArray${id}`).childNodes
        const array = bss[id]

        // Check previous node
        if (bssState[id][4] !== -1) {
            // Modify previous node
            const prev = arrayChilds[bssState[id][4]]
            prev.style.backgroundColor = "#fff"
        }

        // Check end
        const valueNode = document.querySelector(`#valueNode${id}`)
        if (bssState[id][1] <= bssState[id][2]) {
            const mid = (bssState[id][1] + bssState[id][2]) >> 1
            const curr = arrayChilds[mid]
            curr.style.backgroundColor = "#4CAF50"
            bssState[id][4] = mid

            if (array[mid] === value) {
                // Found value
                curr.style.backgroundColor = "red"
                bssState[id][3] = mid
                const success = `${value} is founded at index ${bssState[id][3]} in ${bssState[id][6] + 1} steps !`
                valueNode.style.width = `${25 + (success.length) * 11}px`
                valueNode.innerHTML = success
                valueNode.style.backgroundColor = "#4CAF50"
            } else if (array[mid] < value) {
                // Ignore left half
                for (let i = 0; i < mid; i++) {
                    arrayChilds[i].style.backgroundColor = `grey`
                }
                bssState[id][1] = mid + 1
                bssState[id][6] += 1
            } else {
                // Ignore right half
                for (let i = mid + 1; i < arrayChilds.length; i++) {
                    arrayChilds[i].style.backgroundColor = `grey`
                }
                bssState[id][2] = mid - 1
                bssState[id][6] += 1
            }
        }

        if (bssState[id][3] === -1 && bssState[id][1] > bssState[id][2]) {
            valueNode.innerHTML = "No Given Value Founded!"
            valueNode.style.backgroundColor = "grey"
            for (let i = 0; i < arrayChilds.length; i++) {
                arrayChilds[i].style.backgroundColor = `grey`
            }
        }

    }

    function renderBSNextStep(e) {
        e.preventDefault();

        const id = getId(e, "nextStepForm")
        BSNextStep(id)
    }

    function nextBSStepField(id) {
        const nextStepForm = document.createElement('form')
        nextStepForm.id = `nextStepForm${id}`
        const nextButton = document.createElement('input');
        nextButton.id = `nextButton${id}`
        nextButton.className = 'nextButton'
        nextButton.type = "submit"
        nextButton.value = "Next Step"

        nextStepForm.appendChild(nextButton)

        nextStepForm.addEventListener('submit', renderBSNextStep)

        body.append(nextStepForm)
    }

    function renderResetBinarySearch(e) {
        e.preventDefault();


        const id = getId(e, "autoSearchBSForm")
        // reset state
        bssState[id][1] = 0
        bssState[id][2] = bss[id].length - 1
        bssState[id][3] = -1
        bssState[id][4] = -1
        bssState[id][6] = 0
        const valueNode = document.querySelector(`#valueNode${id}`)
        const promt = `Value to be search: ${bssState[id][0]}`
        const styleLength = 25 + ((promt.toString().length - 1) * 11)
        valueNode.id = `valueNode${id}`
        valueNode.style = bsState.SqureStyle
        valueNode.style.width = `${styleLength}px`
        valueNode.style.marginTop = `10px`
        valueNode.innerHTML = promt
        const arrayChilds = document.querySelector(`#BSArray${id}`).childNodes
        for (let i = 0; i < arrayChilds.length; i++) {
            arrayChilds[i].style.backgroundColor = '#fff'
        }
    }

    function autoSearchBSField(id) {
        const autoSearchForm = document.createElement('form')
        autoSearchForm.id = `autoSearchBSForm${id}`
        const autoSearchButton = document.createElement('input');
        autoSearchButton.id = `autoSearchBSButton${id}`
        autoSearchButton.className = 'autoSearchBSButton'
        autoSearchButton.type = "submit"
        autoSearchButton.value = `Auto Search@Speed: ${bssState[id][5]}ms`

        const resetBSButton = document.createElement('input');
        resetBSButton.id = `resetBSButton${id}`
        resetBSButton.className = 'resetBSButton'
        resetBSButton.type = "reset"
        resetBSButton.value = "Reset"

        autoSearchForm.appendChild(autoSearchButton)
        autoSearchForm.appendChild(resetBSButton)

        autoSearchForm.addEventListener('submit', renderAutoBinarySearch)
        autoSearchForm.addEventListener('reset', renderResetBinarySearch)

        body.append(autoSearchForm)
    }

    global.CSL_BinarySearch = global.CSL_BinarySearch || CSL_BinarySearch
})(window, window.document, $);