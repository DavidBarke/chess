import {isFigure} from "./utils.js";

function orthogonalPaths(row, col, figures) {
	var leftPath = [...Array(row).keys()].reverse().map((i) => {
      var move = {
        row: i,
        col: col
      };
      return(
        move
      );
    });

    var rightPath = [...Array(7 - row).keys()].map((i) => {return(i + row + 1);}).map((i) => {
      var move = {
        row: i,
        col: col
      };
      return(
        move
      );
    })

    var upPath = [...Array(col).keys()].reverse().map((i) => {
      var move = {
        row: row,
        col: i
      };
      return(
        move
      );
    });

    var downPath = [...Array(7 - col).keys()].map((i) => {return(i + col + 1);}).map((i) => {
      var move = {
        row: row,
        col: i
      };
      return(
        move
      );
    })

    return([leftPath, rightPath, upPath, downPath]);
};

function diagonalPaths(row, col, figures) {
	var leftUpPath = [...Array(Math.min(row, col)).keys()].map((i) => {
		var move = {
			row: row - i - 1,
			col: col - i - 1
		};
		return(move);
	})

	var rightUpPath = [...Array(Math.min(row, 7 - col)).keys()].map((i) => {
		var move = {
			row: row - i - 1,
			col: col + i + 1
		};
		return(move);
	})

	var leftDownPath = [...Array(Math.min(7 - row, col)).keys()].map((i) => {
		var move = {
			row: row + i + 1,
			col: col - i - 1
		};
		return(move);
	})

	var rightDownPath = [...Array(Math.min(7 - row, 7 - col)).keys()].map((i) => {
		var move = {
			row: row + i + 1,
			col: col + i + 1
		};
		return(move);
	})

	return([leftUpPath, rightUpPath, leftDownPath, rightDownPath]);
};

function kingPaths(row, col, figures) {
	var leftPath = [], rightPath = [], upPath = [], downPath = [], leftUpPath = [], rightUpPath = [], leftDownPath = [], rightDownPath = [];

	if (col > 0) {
		leftPath = [{
			row: row,
			col: col - 1
		}];
	}

	if (col < 7) {
		rightPath = [{
			row: row,
			col: col + 1
		}];
	}

	if (row > 0) {
		upPath = [{
			row: row - 1,
			col: col
		}];
	}

	if (row < 7) {
		downPath = [{
			row: row + 1,
			col: col
		}];
	}

	if (col > 0 && row > 0) {
		leftUpPath = [{
			row: row - 1,
			col: col - 1
		}];
	}

	if (col < 7 && row > 0) {
		rightUpPath = [{
			row: row - 1,
			col: col + 1
		}];
	}

	if (col > 0 && row < 7) {
		leftDownPath = [{
			row: row + 1,
			col: col - 1
		}];
	}

	if (col < 7 && row < 7) {
		rightDownPath = [{
			row: row + 1,
			col: col + 1
		}];
	}
	
	return([leftPath, rightPath, upPath, downPath, leftUpPath, rightUpPath, leftDownPath, rightDownPath]);
};

function queenPaths(row, col, figures) {
	return(orthogonalPaths(row, col, figures).concat(diagonalPaths(row, col, figures)));
};

function rookPaths(row, col, figures) {
	return(orthogonalPaths(row, col, figures));
};

function bishopPaths(row, col, figures) {
	return(diagonalPaths(row, col, figures));
};

function knightPaths(row, col, figures) {
	var westNorthPath = [], northWestPath = [], northEastPath = [], eastNorthPath = [], eastSouthPath = [], southEastPath = [], southWestPath = [], westSouthPath = [];

	if (row > 0 && col > 1) {
		westNorthPath = [{
			row: row - 1,
			col: col - 2
		}]
	}

	if (row > 1 && col > 0) {
		northWestPath = [{
			row: row - 2,
			col: col - 1
		}]
	}

	if (row > 1 && col < 7) {
		northEastPath = [{
			row: row - 2,
			col: col + 1
		}]
	}

	if (row > 0 && col < 6) {
		eastNorthPath = [{
			row: row - 1,
			col: col + 2
		}]
	}

	if (row < 7 && col < 6) {
		eastSouthPath = [{
			row: row + 1,
			col: col + 2
		}]
	}

	if (row < 6 && col < 7) {
		southEastPath = [{
			row: row + 2,
			col: col + 1
		}]
	}

	if (row < 6 && col > 0) {
		southWestPath = [{
			row: row + 2,
			col: col - 1
		}]
	}

	if (row < 7 && col > 1) {
		westSouthPath = [{
			row: row + 1,
			col: col - 2
		}]
	}

	return([westNorthPath, northWestPath, northEastPath, eastNorthPath, eastSouthPath, southEastPath, southWestPath, westSouthPath]);
};

function pawnPaths(row, col, figures) {
	var figure = figures[row][col];
	var startRow, direction, enemies;

	if (figure === 16) {
		// White figure
		startRow = 1;
		direction = 1;
		enemies = [21, 22, 23, 24, 25, 26];
	} else {
		// Black figure
		startRow = 6;
		direction = -1;
		enemies = [11, 12, 13, 14, 15, 16];
	}

	if ([11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26].includes(figures[row + direction * 1][col])) {
		var straightPaths = [];
	} else {
		if (row === startRow) {
			function moveSteps(i) {
				return(
					{
						row: row + direction * i,
						col: col
					}
				);
			}

			// Only move two fields if second field is not occupied
			if (isFigure(figures[row + direction * 2][col])) {
				straightPaths = [moveSteps(1)];
			} else {
				straightPaths = [moveSteps(1), moveSteps(2)];
			};
		} else {
			straightPaths = [
				{
					row: row + direction * 1,
					col: col
				}
			];
		}
	}

	var diagonalLeftPath = [], diagonalRightPath = [];
	if (col > 0 && enemies.includes(figures[row + direction * 1][col - 1])) {
		diagonalLeftPath = diagonalLeftPath.concat([{
			row: row + direction * 1,
			col: col - 1
		}])
	}
	if (col < 7 && enemies.includes(figures[row + direction * 1][col + 1])) {
		diagonalRightPath = diagonalRightPath.concat([{
			row: row + direction * 1,
			col: col + 1
		}])
	}
	
	return([straightPaths, diagonalLeftPath, diagonalRightPath]);
};

function getPaths(position, figures) {
	var row = position.row, col = position.col;

	var figure = figures[row][col];

	switch(figure) {
		case 11:
		case 21:
			return(kingPaths(row, col, figures));
		case 12:
		case 22:
			return(queenPaths(row, col, figures));
		case 13:
		case 23:
			return(rookPaths(row, col, figures));
		case 14:
		case 24:
			return(bishopPaths(row, col, figures));
		case 15:
		case 25:
			return(knightPaths(row, col, figures));
		case 16:
		case 26:
			return(pawnPaths(row, col, figures));
		default:
			console.log("paths.js: wrong figure");
	};
};

export default getPaths;