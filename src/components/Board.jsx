import { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { IconContext } from 'react-icons';
import { FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing } from 'react-icons/fa'
import LegalMoveDot from './legalMoveDot';
//import * as chess from './chessLogic.js';
import '../App.css'
//import { legalMoves } from './chessLogic';

function Board() {
  const [whiteTurn, setWhiteTurn] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialSquare, setInitialSquare] = useState(null);
  const pieceSet = [<FaChessPawn key={["10","11","12","13","14","15","16","17"]} white={true} type={"pawn"} className='piece w pawn'/>, <FaChessRook key={["00","07"]} white={true} type={"rook"} className='piece w rook'/>, <FaChessKnight key={["01","06"]} white={true} type={"knight"} className='piece w knight'/>, <FaChessBishop key={["02","05"]} white={true} type={"bishop"} className='piece w bishop'/>, <FaChessQueen key={["03"]} white={true} type={"queen"} className='piece w queen'/>, <FaChessKing key={["04"]} white={true} type={"king"} className='piece w king'/>, <FaChessPawn key={["60","61","62","63","64","65","66","67"]} white={false} piece={"pawn"} className='pawn b pawn'/>, <FaChessRook key={["70","77"]} white={false} type={"rook"} className='piece b rook'/>, <FaChessKnight key={["71","76"]} white={false} type={"knight"} className='piece b knight'/>, <FaChessBishop key={["72","75"]} white={false} type={"bishop"} className='piece b bishop'/>, <FaChessQueen key={["73"]} white={false} type={"queen"} className='piece b queen'/>, <FaChessKing key={["74"]} white={false} type={"king"} className='piece b king'/>];
  //pieceSet.forEach(e => e.addEventListener("click", selectPiece));
  function changeTurn() {
    setWhiteTurn(!whiteTurn);
  }
  const handleMouseDown = (e) => {
    let piece = e.currentTarget;
    setInitialSquare(piece.parentElement);
    setSelectedPiece(piece);
  };
  const handleMouseUp = (e) => {
    let firstChild = e.target.firstChild;
    if (firstChild && firstChild.classList.contains("legal-move-dot") && !(firstChild.classList.contains("piece"))) {
      setSelectedPiece(null);
      let possibleSquares = document.getElementsByClassName("possible");
      Array.from(possibleSquares).forEach(square => {
        square.innerHTML = "";
      });
      e.currentTarget.appendChild(selectedPiece);
    } else {
      initialSquare.appendChild(selectedPiece);
      setSelectedPiece(null);}
  };
  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };
  window.addEventListener('mousemove', handleMouseMove);
  useEffect(() => {
    if (selectedPiece) {
      document.getElementById("dragged-piece").appendChild(selectedPiece);
    } else {
      document.getElementById("dragged-piece").innerHTML = "";
    }
  }, [selectedPiece, position]);
  useEffect(() => {
    if (initialSquare) {
      console.log("initialSquare inside useEffect:", initialSquare);
      let legalMoves = getLegalMoves(selectedPiece); //figure out how to do initialSquare 
      console.log(legalMoves);
      /*
      legalMoves.forEach(square => { //this can be reduced like in the original chess app i know it to be true
        console.log(square);
        square => document.getElementById(square);
        if (square) {
          square.classList.add("possible");
        }
      })
      */
      for (let i = 0; i < legalMoves.length; i++) {
        console.log(legalMoves[i]);
        if (document.getElementById(legalMoves[i]) && !(document.getElementById(legalMoves[i]).innerHTML) ) {
          document.getElementById(legalMoves[i]).classList.add("possible");
          const domNode = document.getElementById(legalMoves[i]);
          const root = createRoot(domNode);
          root.render(<LegalMoveDot />);
        }
      }
    }
    console.log("we did it!");
  }, [initialSquare]);

  const getLegalMoves = (piece) => {
    let legalMoves = [];
    let initialPosition = initialSquare.id;
    let rank = Number(initialPosition[0]);
    let file = Number(initialPosition[1]);
    let pieceType = piece.getAttribute('type');
    switch (pieceType) {
      case "pawn":
        
        break;
      case "rook":
        legalMoves = rookMoves(rank, file);
        break;
      case "knight":
        legalMoves = knightMoves(rank, file);
        break;
      case "bishop":
        legalMoves = bishopMoves(rank, file);
        break;
      case "queen":
        legalMoves = rookMoves(rank, file);
        legalMoves = legalMoves.concat(bishopMoves(rank, file));
        break;
      case "king":
        legalMoves = kingMoves(rank, file);
        break;
    }
    return legalMoves;
  }

  const rookMoves = (rank, file) => {
    let legalMoves = [];
    let validDir = [true, true, true, true];
    for (let i = 1; i < 8; i++) {
      let up = "" + (rank+i) + file;
      let right = "" + rank + (file+i);
      let down = "" + (rank-i) + file;
      let left = "" + rank + (file-i);
      let dir = [up, right, down, left];

      for (let j = 0; j < 4; j++) {
          if ( validDir[j] && isLegalMove(dir[j]) ) {
              legalMoves.push(dir[j]);
              if (capture(dir[j])) { //omfg
                  validDir[j] = false;
              }
          } else {
              validDir[j] = false;
          }
      }
    }
    return legalMoves;
  } 
  const bishopMoves = (rank, file) => {
    let legalMoves = [];
    let validDir = [true, true, true, true];
    for (let i = 1; i < 8; i++) {
      let up = "" + (rank+i) + (file+i);
      let right = "" + (rank-i) + (file+i);
      let down = "" + (rank-i) + (file-i);
      let left = "" + (rank+i) + (file-i);
      let dir = [up, right, down, left];

      for (let j = 0; j < 4; j++) {
          if ( validDir[j] && isLegalMove(dir[j]) ) {
              legalMoves.push(dir[j]);
              if (capture(dir[j])) { //omfg
                  validDir[j] = false;
              }
          } else {
              validDir[j] = false;
          }
      }
    }
    return legalMoves;
  }
  const knightMoves = (rank, file) => {
    let legalMoves = [];
    if (isLegalMove("" + (rank+2) + (file-1))) { legalMoves.push("" + (rank+2) + (file-1)) }
    if (isLegalMove("" + (rank+2) + (file+1))) { legalMoves.push("" + (rank+2) + (file+1)) }
    if (isLegalMove("" + (rank+1) + (file+2))) { legalMoves.push("" + (rank+1) + (file+2)) }
    if (isLegalMove("" + (rank-1) + (file+2))) { legalMoves.push("" + (rank-1) + (file+2)) }
    if (isLegalMove("" + (rank-2) + (file-1))) { legalMoves.push("" + (rank-2) + (file-1)) }
    if (isLegalMove("" + (rank-2) + (file+2))) { legalMoves.push("" + (rank-2) + (file+1)) }
    if (isLegalMove("" + (rank+1) + (file-2))) { legalMoves.push("" + (rank+1) + (file-2)) }
    if (isLegalMove("" + (rank-1) + (file-2))) { legalMoves.push("" + (rank-1) + (file-2)) }
    return legalMoves;
  }
  const kingMoves = (rank, file) => {
    let legalMoves = [];
    if (isLegalMove("" + rank + (file+1))) { legalMoves.push("" + rank + (file+1)); };
    if (isLegalMove("" + rank + (file-1))) { legalMoves.push("" + rank + (file-1)); };
    if (isLegalMove("" + (rank+1) + file)) { legalMoves.push("" + (rank+1) + file); };
    if (isLegalMove("" + (rank-1) + file)) { legalMoves.push("" + (rank-1) + file); };
    if (isLegalMove("" + (rank-1) + (file-1))) { legalMoves.push("" + (rank-1) + (file-1)); };
    if (isLegalMove("" + (rank+1) + (file+1))) { legalMoves.push("" + (rank+1) + (file+1)); };
    if (isLegalMove("" + (rank+1) + (file-1))) { legalMoves.push("" + (rank+1) + (file-1)); };
    if (isLegalMove("" + (rank-1) + (file+1))) { legalMoves.push("" + (rank-1) + (file+1)); };
    return legalMoves;
  }
  const pawnMoves = (rank, file) => {
    /*
    let legalMoves = [];
    if (whiteTurn) {
      legalMoves.push("" + (rank + 1) + file);
      if (rank === 1) {
          legalMoves.push("" + (rank + 2) + file);
      }
      if (document.getElementById("" + rank + file).hasClass("b")) {
          legalMoves.push("" + (rank + 1) + (file - 1));
      };
      if ($(`#square${rank+1}${file+1}`).hasClass("b")) {
          legalMoves.push("" + (rank + 1) + (file + 1));
      };
  } else {
      legalMoves.push("" + (rank - 1) + file);
      if (rank === 6) {
          legalMoves.push("" + (rank - 2) + file);
      };
      if ($(`#square${rank-1}${file-1}`).hasClass("w")) {
          legalMoves.push("" + (rank - 1) + (file - 1));
      };
      if ($(`#square${rank-1}${file+1}`).hasClass("w")) {
          legalMoves.push("" + (rank - 1) + (file + 1));
      };
  };
  return legalMoves;
  */
  }
  //square is two digit number
  const isLegalMove = (square) => {
      console.log("original square:", square);
      square = document.getElementById(square);
      console.log("new square:", square);
      let turn = whiteTurn === true ? "w" : "b"
      console.log("turn: ", turn);
      console.log(square && square.classList.contains(turn));
      if (square && square.firstChild && square.firstChild.classList.contains(turn)) {
          return false;
      } else {
          return true;
      }
  }

  const capture = (square) => {
      square = document.getElementById(square);
      let turn = whiteTurn === true ? "b" : "w" //flipped - perhaps could all be rewritten
      if (square && square.firstChild && square.classList.contains("possible") && square.firstChild.classList.contains(turn)) {
        return true;
      } else {
        return false;
      }
  }


  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
        <div className='board grid grid-cols-8 relative w-fit'>
            {
                Array.from({ length: 64 }, (_, index) => {
                  const rankIndex = Math.floor(index / 8);
                  const fileIndex = index % 8;
                  const position = (rankIndex + "") + fileIndex;
                  const isEvenRow = rankIndex % 2 === 0;
                  const isEvenCell = fileIndex % 2 === 0;
                  const isDark = (isEvenRow && !isEvenCell) || (!isEvenRow && isEvenCell);
                  const color = isDark ? 'bg-dark' : 'bg-light';

                  const matchingPieces = pieceSet.filter(piece => piece.key.includes(`${rankIndex}${fileIndex}`));
                  const matchedPiece = matchingPieces[0] || null;
                  
                  return <div key={position} id={position} className={`relative square flex justify-center items-center w-10 h-10 ${color}`} onMouseUp={(e) => handleMouseUp(e)} > 
                    {matchedPiece && <matchedPiece.type onMouseDown={(e) => handleMouseDown(e)} {...matchedPiece.props} />}
                  </div>;
                })
            }
        </div>
        <div id='dragged-piece' className={`absolute`} style={{top: `${position.y}px`, left: `${position.x}px`, pointerEvents: 'none'}}> {/* display feels like a hack, not what i want to do*/}

        </div>
    </IconContext.Provider>
  )
}

export default Board
