// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      const row = this.get(rowIndex);
      let countEntries = 0;
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          countEntries++;
        }
      }
      return countEntries > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      const board = this.rows();
      for (var i = 0; i < board.length; i++) {
        let hasConflict = this.hasRowConflictAt(i);
        if (hasConflict) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let columnArr = [];
      let countEntries = 0;
      let numOfCols = this.rows().length;
      
      for (let i = 0; i < numOfCols; i++) {
        let row = this.get(i);
        columnArr.push(row[colIndex]);
      }
      
      columnArr.forEach((value) => {
        if (value === 1) {
          countEntries++;
        }
      }); 
      
      return countEntries > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      const board = this.rows();
      
      for (let i = 0; i < board.length; i++) {
        let hasConflict = this.hasColConflictAt(i);
        if (hasConflict) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //should make array of same diagonal column index
      const absDiagonalColIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      const board = this.rows();
      const boardLength = board.length;
      const diagonalLength = boardLength - absDiagonalColIndex;
      let countEntries = 0;
      let row;
      let column;
      
      if (boardLength - absDiagonalColIndex === 1) {
        return false;
      } else if(majorDiagonalColumnIndexAtFirstRow >= 0) {
        row = 0
        column = absDiagonalColIndex;
      } else {
        row = absDiagonalColIndex;
        column = 0;
      }
      
      for (let i = 0; i < diagonalLength; i++) {
        let diagonalPosition = board[row + i][column + i]
        if (diagonalPosition === 1) {
          countEntries++;
        }
      }
      
      return countEntries > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      const board = this.rows();
      
      for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board.length; column++) {
          if (board[row][column] === 1) {
             let firstRowColIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(row, column);
             let hasConflict = this.hasMajorDiagonalConflictAt(firstRowColIndex);
             
            if(hasConflict) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      const board = this.rows();
      const boardLength = board.length;
      const lastPosition = (boardLength - 1) * 2;
      let countEntries = 0;
      let row;
      let column;
      
      if (minorDiagonalColumnIndexAtFirstRow === 0 || minorDiagonalColumnIndexAtFirstRow === lastPosition) {
        return false;
      } else if (minorDiagonalColumnIndexAtFirstRow < boardLength) {
        row = 0;
        column = minorDiagonalColumnIndexAtFirstRow;
      } else {
        row = (minorDiagonalColumnIndexAtFirstRow - boardLength) + 1;
        column = boardLength - 1;
      }
      
      let position = board[row][column];
      while(position !== undefined) {
        if (position === 1) {
          countEntries++;
        }
        row += 1;
        column -= 1;
        if (row >= boardLength || column < 0) {
          position = undefined;
        } else { 
          position = board[row][column];
        }
      }
    return countEntries > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      const board = this.rows();
      
      for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board.length; column++) {
          if (board[row][column] === 1) {
             let firstRowColIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(row, column);
             let hasConflict = this.hasMinorDiagonalConflictAt(firstRowColIndex);
             
            if(hasConflict) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
