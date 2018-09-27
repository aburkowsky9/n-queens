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
window.countNRooksSolutions = function(n) {debugger;
  let solutionCount = 0; 
  const newBoard = new Board({n:n});
  
  const helper = (board) => {
    let matrix = board.rows();

    for(var j = 0; j < matrix.length; j++) {
      if (matrix[j].indexOf(1) === -1) {
        for (let i = 0; i < matrix.length; i++) {
          matrix[j][i] = 1;
          board.set(matrix);
          if(!board.hasAnyRooksConflicts) {
            helper(board);
            solutionCount++;
          } 
          matrix[j][i] = 0;
        }
      }
    }
  };
  helper(newBoard);
  
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
