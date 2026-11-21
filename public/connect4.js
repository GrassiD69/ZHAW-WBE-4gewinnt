function elt (type, attrs, ...children){
    let node= document.createElement(type)
    Object.keys(attrs).forEach(key=>{
        node.setAttribute(key, attrs[key])
    })
    for (let child of children){
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

function showBoard() {
    let board = document.querySelector(".board")
    let stoneSelector
    let stone
    let field;

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            stoneSelector = Math.random()
            if (stoneSelector < 0.33) {
                stone = elt("div", {class: "piece red"})
            } else if (stoneSelector < 0.66) {
                stone = elt("div", {class: "piece blue"})
            } else {
                stone = null
            }
            field = elt("div", {class: "field"}, ...(stone ? [stone] : []))
            board.appendChild(field)
        }
    }


}
