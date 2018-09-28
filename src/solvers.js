/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  let solution; 
  let newBoard = new Board({n:n});
  
  for (let i = 0; i < n; i++) {
    let row = newBoard.get(i);
    row[i] = 1;
    newBoard.set({i: row});
  }
  
  solution = newBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { 
  // let solutionCount = 0; 
  // let newBoard = new Board({n: n});

  // const helper = (board, rowsLeft) => { 
  //   let matrix = board.rows();
  //   if (rowsLeft === 0) {
  //     solutionCount++;
  //   } else if (matrix[0].indexOf(1) === - 1) {
  //     for (var i = 0; i < matrix.length; i++) {
  //       board.togglePiece(0, i);
  //       rowsLeft -= 1;
  //       helper(board, rowsLeft);
  //       board.togglePiece(0, i);
  //       rowsLeft += 1;
  //     }
  //   } else {
  //     for (var j = 1; j < matrix.length; j++) {
  //       if (matrix[j - 1].indexOf(1) === -1) {
  //         continue;
  //       } else if (matrix[j].indexOf(1) === -1) {
  //         for (var k = 0; k < matrix.length; k++) {
  //           board.togglePiece(j, k);
  //           if (board.hasAnyRooksConflicts()) {
  //             board.togglePiece(j, k);
  //           } else if (!board.hasAnyRooksConflicts()) {
  //             rowsLeft -= 1;
  //             helper(board, rowsLeft);
  //             board.togglePiece(j, k);
  //             rowsLeft += 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  // };
  // helper(newBoard, n);
  
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  

  let newBoard = new Board({n:n}); 
  let solution;
  
  console.log('n: ' + n);
  if (n === 0 || n === 2 || n === 3) {
    return newBoard.rows();
  } else if (n === 1) {
    newBoard.togglePiece(0, 0);
    solution = newBoard.rows();
  } else {
    const helper = (board, rowsLeft) => {
      if (solution !== undefined) {
        return;
      }
      
      let matrix = board.rows();
      if (rowsLeft === 0) {
        solution = board.rows();
      } else if (matrix[0].indexOf(1) === - 1) {
        for (var i = 0; i < matrix.length; i++) {
          board.togglePiece(0, i);
          rowsLeft -= 1;
          helper(board, rowsLeft);
          board.togglePiece(0, i);
          rowsLeft += 1;
        }
      } else {
        for (var j = 1; j < matrix.length; j++) {
          if (matrix[j - 1].indexOf(1) === -1) {
            continue;
          } else if (matrix[j].indexOf(1) === -1) {
            for (var k = 0; k < matrix.length; k++) {
              board.togglePiece(j, k);
              if (board.hasAnyQueensConflicts()) {
                board.togglePiece(j, k);
              } else if (!board.hasAnyQueensConflicts()) {
                rowsLeft -= 1;
                helper(board, rowsLeft);
                board.togglePiece(j, k);
                rowsLeft += 1;
              }
            }
          }
        }
      }
    };
    helper(newBoard, n);
    
  }
  
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0; 
  let newBoard = new Board({n: n});

  // const helper = (board, rowsLeft) => { 
  //   let matrix = board.rows();
  //   if (rowsLeft === 0) {
  //     solutionCount++;
  //   } else if (matrix[0].indexOf(1) === - 1) {
  //     for (var i = 0; i < matrix.length; i++) {
  //       board.togglePiece(0, i);
  //       rowsLeft -= 1;
  //       helper(board, rowsLeft);
  //       board.togglePiece(0, i);
  //       rowsLeft += 1;
  //     }
  //   } else {
  //     for (var j = 1; j < matrix.length; j++) {
  //       if (matrix[j - 1].indexOf(1) === -1) {
  //         continue;
  //       } else if (matrix[j].indexOf(1) === -1) {
  //         for (var k = 0; k < matrix.length; k++) {
  //           board.togglePiece(j, k);
  //           if (board.hasAnyQueensConflicts()) {
  //             board.togglePiece(j, k);
  //           } else if (!board.hasAnyQueensConflicts()) {
  //             rowsLeft -= 1;
  //             helper(board, rowsLeft);
  //             board.togglePiece(j, k);
  //             rowsLeft += 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  // };
  // helper(newBoard, n);
  
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

