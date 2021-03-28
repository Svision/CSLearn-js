"use strict";
(function (global, document, $) {
    const head = document.getElementsByTagName('HEAD')[0]
    const body = $('body')

    function getId(e, id) {
        return Number(e.target.id.slice(id.length, e.target.id.length))
    }

    function timeout(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const SSLink = document.createElement('link')
    SSLink.rel = 'stylesheet'
    SSLink.type = 'text/css'
    SSLink.href = './algorithms/csl.selectionSort/styles.css'
    head.appendChild(SSLink)

    function createSSIntro() {
        const SSIntroForm = document.createElement('form')
        const SSTitle = document.createElement('input')
        SSTitle.type = "submit"
        SSTitle.className = "SSTitle"
        SSTitle.value = "Selction Sort"

        const SS_INTRO = "The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. "

        SSIntroForm.addEventListener('submit', handleIntro)

        function handleIntro(e) {
            e.preventDefault();
            alert(SS_INTRO)
        }

        SSIntroForm.appendChild(SSTitle)

        body.append(SSIntroForm)
    }

    let numSS = 0
    let sss = []
    let ssState = []
    let beforeSS = []

    function isSorted(array){
        const sortedCopy = [...array]
        sortedCopy.sort((a, b) => a - b)
        for (let i=0; i<array.length; i++){
            if (sortedCopy[i] !== array[i]){
                return false
            }
        }
        return true
    }

    class CSL_SelectionSort {
        constructor(inputArray, showIntro = false) {
            beforeSS.push(inputArray)
            sss.push([])
            ssState.push([0, 0, inputArray.length - 1, -1, -1, -1, 0, 0])
            this.id = numSS
            numSS++
            if (showIntro) {
                createSSIntro()
            }
            renderSortStatus(this.id)
            renderGivenSSArray(this.id, inputArray)
            nextSSStepField(this.id)
            resetSSField(this.id)
        }

        next() {
            SSNextStep(this.id)
        }
    }

    function renderSortStatus(id) {
        const promt = `Unsorted !`
        const styleLength = 25 + ((promt.toString().length - 1) * 11)
        const sortStatus = document.createElement('li')
        sortStatus.id = `sortStatus${id}`
        sortStatus.className = 'node'
        sortStatus.style.width = `${styleLength}px`
        sortStatus.style.marginTop = '10px'
        sortStatus.style.backgroundColor = '#455763'
        sortStatus.innerHTML = promt

        body.append(sortStatus)
    }

    async function SSNextStep(id) {
        const nextButton = document.querySelector(`#nextSSButton${id}`)
        const resetButton = document.querySelector(`#resetSSButton${id}`)
        nextButton.type = 'button'
        resetButton.type = 'button'
        const queryDom = $(`ul#SSArray${id} li`)
        if (isSorted(sss[id])){
            ssState[id][7] = 1
            const sortStatus = document.querySelector(`#sortStatus${id}`)
            sortStatus.style.backgroundColor = "#008CBA"
            sortStatus.innerHTML = "SORTED !"
            for (let i=0; i<queryDom.length; i++){
                queryDom[i].style.backgroundColor = '#008CBA'
            }
            nextButton.type = 'submit'
            resetButton.type = 'reset'
            return;
        }
        let n = sss[id].length;
        let i = ssState[id][0]
        if (queryDom.length === 0) return;
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i+1; j < n; j++){
            if (sss[id][j] < sss[id][min]){
                min = j
            }
            queryDom[j].style.backgroundColor = 'green'
            await timeout(120)
            queryDom[j].style.backgroundColor = 'white'
        }
        const min_node = queryDom[min]
        min_node.style.backgroundColor = 'red'
        await timeout(200)
        min_node.style.backgroundColor = 'white'
        if (min != i) {
            // Swapping the elements
            let tmp = sss[id][i]; 
            sss[id][i] = sss[id][min];
            queryDom[i].innerHTML = sss[id][min]
            sss[id][min] = tmp;

            queryDom[i].style.width = `${25 + ((queryDom[i].innerHTML.toString().length - 1) * 11)}px`
            queryDom[min].innerHTML = tmp
            queryDom[min].style.width = `${25 + ((queryDom[min].innerHTML.toString().length - 1) * 11)}px`
        }
        nextButton.type = 'submit'
        resetButton.type = 'reset'
        queryDom[i].style.backgroundColor = '#008CBA'
        ssState[id][0]++;
    }

    function renderGivenSSArray(id, array) {
        const ssArray = document.createElement('ul')
        ssArray.id = `SSArray${id}`
        body.append(ssArray)

        for (let i = 0; i < array.length; i++) {
            const value = array[i]
            sss[id].push(value)
            renderSSNode(value, id)
        }
    }

    function renderSSNode(value, id) {
        const styleLength = 25 + ((value.toString().length - 1) * 11)
        const node = document.createElement('li');
        node.className = "node"
        node.style.width = `${styleLength}px`
        node.innerHTML = value

        const ss = document.querySelector(`#SSArray${id}`)
        ss.appendChild(node)
    }

    function renderSSNextStep(e) {
        e.preventDefault();

        const id = getId(e, "nextStepForm")
        SSNextStep(id)
    }

    function nextSSStepField(id) {
        const nextStepForm = document.createElement('form')
        nextStepForm.id = `nextStepForm${id}`
        const nextButton = document.createElement('input');
        nextButton.id = `nextSSButton${id}`
        nextButton.className = 'nextButton'
        nextButton.type = "submit"
        nextButton.value = "Next Step"

        nextStepForm.appendChild(nextButton)

        nextStepForm.addEventListener('submit', renderSSNextStep)

        body.append(nextStepForm)
    }

    function handleResetSelectionSort(e) {
        e.preventDefault();

        const id = getId(e, "autoSortSSForm")
        // reset state
        ssState[id][0] = 0
        ssState[id][1] = 0
        ssState[id][2] = sss[id].length - 1
        ssState[id][3] = -1
        ssState[id][4] = -1
        ssState[id][6] = 0
        const sortStatus = document.querySelector(`#sortStatus${id}`)
        sortStatus.style.backgroundColor = `#455763`
        sortStatus.style.marginTop = `10px`
        sortStatus.innerHTML = `Unsorted !`

        const arrayChilds = document.querySelector(`#SSArray${id}`).childNodes
        
        for (let i = 0; i < arrayChilds.length; i++) {
            sss[id][i] = beforeSS[id][i]
            arrayChilds[i].innerHTML = sss[id][i]
            arrayChilds[i].style.backgroundColor = '#fff'
            arrayChilds[i].style.width = `${25 + ((sss[id][i].toString().length - 1) * 11)}px`
        }
    }  

    function resetSSField(id) {
        const autoSortForm = document.createElement('form')
        autoSortForm.id = `autoSortSSForm${id}`
        const resetSSButton = document.createElement('input');
        resetSSButton.id = `resetSSButton${id}`
        resetSSButton.className = 'resetSSButton'
        resetSSButton.type = "reset"
        resetSSButton.value = "Reset"
        autoSortForm.appendChild(resetSSButton)
        autoSortForm.addEventListener('reset', handleResetSelectionSort)
        body.append(autoSortForm)
    }

    global.CSL_SelectionSort = global.CSL_SelectionSort || CSL_SelectionSort
})(window, window.document, $);