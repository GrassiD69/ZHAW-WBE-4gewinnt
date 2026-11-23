import { connect4Winner } from "./winner.js"

const STATE_URL = "api/data/c4state?api-key=c4game"

let state = createNewState()
let board = document.querySelector(".board")
let statusLabel = document.querySelector(".status")

document.querySelector(".new-game").addEventListener("click", newGame)
document.querySelector(".load").addEventListener("click", loadState)
document.querySelector(".save").addEventListener("click", saveState)

function createNewState() {
    let board = Array(6).fill('').map(el => Array(7).fill(''))
    let currentColor = 'r'
    return { board: board, currentColor: currentColor, winner: null }
}

function showBoard() {
    clearBoard()
    let stone
    let field
    let fieldState

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            fieldState = state.board[row][col]
            if (fieldState === 'r') {
                stone = elt("div", {class: "piece red"})
            } else if (fieldState === 'b') {
                stone = elt("div", {class: "piece blue"})
            } else {
                stone = null
            }
            field = elt("div", {class: "field"}, ...(stone ? [stone] : []))
            field.addEventListener("click", () => addStone(col))
            board.appendChild(field)
        }
    }
    const name = state.currentColor === 'r' ? "Rot" : "Blau"
    if (state.winner) {
        statusLabel.textContent = name + " hat gewonnen!"
    } else {
        statusLabel.textContent = "Am Zug: " + name
    }
}

function addStone(col) {
    if (state.winner) {
        return
    }
    const row = getFreeRow(col)
    if(row !== null ){
        state.board[row][col] = state.currentColor;
        checkWinner()
        if (!state.winner) {
            changeColor()
        }
        showBoard()
    }
}
function getFreeRow(col){
    for (let i = (state.board.length - 1) ; i >= 0; i--){
        if (state.board[i][col] === ''){
            return i
        }
    }
    return null

}

function changeColor() {
    state.currentColor = state.currentColor === 'r' ? 'b' : 'r'
}
function newGame(){
    state = createNewState()
    showBoard()
}

function loadState() {
    fetch(STATE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Laden fehlgeschlagen: " + response.status)
            return response.json()
        })
        .then(data => {
            state = data
            showBoard()
        })
        .catch(err => console.error(err))
}

function saveState() {
    fetch(STATE_URL, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(state)
    })
        .then(response => {
            if (!response.ok) throw new Error("Speichern fehlgeschlagen: " + response.status)
        })
        .catch(err => console.error(err))
}

function clearBoard() {
    board.innerHTML = ""
}

function checkWinner(){
    if (connect4Winner(state.currentColor, state.board)) {
        state.winner = state.currentColor
    }
}


function elt (type, attrs, ...children) {
    let node = document.createElement(type)
    Object.keys(attrs).forEach(key => {
        node.setAttribute(key, attrs[key])
    })
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

showBoard()
