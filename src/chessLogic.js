export const legalMoves = (piece, initialSquare, whiteTurn) => {
    let legalMoves = [];
    let initialPosition = initialSquare.id;
    let pieceType = piece.getAttribute('type');
    if (piece.white === whiteTurn) {
      //cum
    } else {
      //also cum
    }
    //should add pieceType arg and do a switch statement
    switch (pieceType) {
      case "pawn":

        break;
      case "rook":
        let validDir = [true, true, true, true];
        for (let i = 1; i < 8; i++) {
            let up = initialPosition + i*10;
            let right = initialPosition + i;
            let down = initialPosition - i*10;
            let left = initialPosition - i;
            let dir = [up, right, down, left];

            for (let j = 0; j < 4; j++) {
                if ( validDir[j] && isLegalMove(dir[j]) ) {
                    legalMoves.push(dir[j]);
                    if (capture(dir[j])) { //omfg
                        validDir[j] = false;
                    };
                } else {
                    validDir[j] = false;
                };
            };
        };
        return legalMoves;
      case "knight":
        if (isLegalMove(initialPosition + 19)) { legalMoves.push(initialPosition + 19) }; //feels hacky
        if (isLegalMove(initialPosition + 21)) { legalMoves.push(initialPosition + 21) };
        if (isLegalMove(initialPosition + 12)) { legalMoves.push(initialPosition + 12) };
        if (isLegalMove(initialPosition - 8)) { legalMoves.push(initialPosition - 8) };
        if (isLegalMove(initialPosition - 21)) { legalMoves.push(initialPosition - 21) };
        if (isLegalMove(initialPosition - 19)) { legalMoves.push(initialPosition - 19) };
        if (isLegalMove(initialPosition + 8)) { legalMoves.push(initialPosition + 8) };
        if (isLegalMove(initialPosition - 12)) { legalMoves.push(initialPosition - 12) };
        return legalMoves; //not sure if should display on board or return
    }
};

const isLegalMove = (square, whiteTurn) => {
    square = document.getElementById(square);
    let turn = whiteTurn === true ? "w" : "b"
    if (square.classList.contains(turn)) {
        return true;
    } else {
        return false;
    }
}

const capture = (square) => {
    square = document.getElementById(square);
    //if (whiteTurn) 
}