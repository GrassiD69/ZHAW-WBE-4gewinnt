const connect4Winner = (el, board) => {
    if (!isValidBoard(board)) return false

    return (
        loopLines(board, el) ||
        loopLines(getVertical(board), el) ||
        loopLines(getDiagonal(board), el)
    )
};

function isValidBoard(board) {
    if (!Array.isArray(board) || board.length === 0) return false

    const cols = board[0]?.length
    if (!cols) return false

    return board.every(row => Array.isArray(row) && row.length === cols)
}


function loopLines(lines, el) {
    for (const line of lines) {
        if (hasWinner(line, el)) {
            return true
        }
    }
    return false
}
function getVertical(board) {
    const verticalLines = []
    for (let col = 0; col < board[0].length; col++) {
        const line = []
        for (let row = 0; row < board.length; row++) {
            line.push(board[row][col])
        }
        verticalLines.push(line)
    }
    return verticalLines
}

function getDiagonal(board) {
    const rows = board.length
    const cols = board[0].length
    const lines = []

    function walk(row, col, dCol) {
        const line = []
        while (row < rows && col >= 0 && col < cols) {
            line.push(board[row][col])
            row++
            col += dCol
        }
        return line
    }

    for (let col = 0; col < cols; col++) lines.push(walk(0, col, 1))
    for (let row = 1; row < rows; row++) lines.push(walk(row, 0, 1))

    for (let col = 0; col < cols; col++) lines.push(walk(0, col, -1))
    for (let row = 1; row < rows; row++) lines.push(walk(row, cols - 1, -1))

    return lines
}

function hasWinner(line, el) {
    let counter = 0
    for (const slot of line) {
        if (slot === el) {
            counter++
            if (counter >= 4) {
                return true
            }
        } else {
            counter = 0
        }
    }
    return false
}

export { connect4Winner };
