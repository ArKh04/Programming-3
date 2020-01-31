
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 50;

    var matrix = [];
    var rel;
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        rel = data.rel;
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side);
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                if (matrix[y][x] == 1) {
                    fill("green");
                }
                else if (matrix[y][x] == 2) {
                    fill("#F9F22B");
                }
                else if (matrix[y][x] == 3) {
                    fill("#C20808");
                }
                else if (matrix[y][x] == 5) {
                    if (rel.isGameEnded) 
                        fill("#0068FF")
                    else
                        fill("#000000")
    
                }
                else if (matrix[y][x] == 4) {
                    fill("#07FF00");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                /*else if (matrix[y][x] == 6) {
                    fill("#000000");
                }
                else if (matrix[y][x] == 7) {
                    fill("#F9F22B");
                }*/
                rect(x * side, y * side, side, side);
            }
        }
    }
}