let state = createState()
let board = document.querySelector(".board")

setInterval(() => {
    fillField()
    showBoard()
}, 1000)
function createState() {
    let board = Array(6).fill('').map(el => Array(7).fill(''))
    return { board: board }
}

function showBoard() {
    clearBoard(board)

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
            board.appendChild(field)
        }
    }
}
function fillField(){
    let [col, row] = randomField()
    state.board[row][col] = randomState()
}

function randomField() {
    const row = Math.floor(Math.random() * 6);
    const col = Math.floor(Math.random() * 7);
    return [col, row]
}

function randomState() {
    let state = Math.floor(Math.random() * 3);
    switch (state) {
        case 0:
            return 'r'
        case 1 :
            return 'b'
        case 2:
            return ''
    }
}


function clearBoard(board) {
    board.innerHTML = ""
    return board
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

