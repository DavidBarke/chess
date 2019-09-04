import React from 'react';

class Field extends React.Component {
  render() {
    var black = "field-white ";

    if ((this.props.row + this.props.col) % 2 === 0) {
      black = "field-black ";
    };

    var fieldDict = {
      0: " ",
      1: "green-circle ",
      11: "king-white ",
      12: "queen-white ",
      13: "rook-white ",
      14: "bishop-white ",
      15: "knight-white ",
      16: "pawn-white ",
      21: "king-black ",
      22: "queen-black ",
      23: "rook-black ",
      24: "bishop-black ",
      25: "knight-black ",
      26: "pawn-black ",
    }

    var figure = fieldDict[this.props.figure];
    var circle = fieldDict[this.props.circle];

    var rotate;
    if (this.props.rotate === true) {
      rotate = "figure-rotate ";
    } else {
      rotate = " ";
    };

    var selected;
    if (!(this.props.selectedFigure.row === undefined)) {
      if (this.props.selectedFigure.row === this.props.row && this.props.selectedFigure.col === this.props.col) {
        selected = "figure-selected ";
      } else {
        selected = " ";
      }
    }

    return(
      <li 
        className={"field " + black + selected}
        onClick = {() => this.props.onClick()}
      >
        <div className={"figure " + figure + rotate}></div>
        <div className={"figure " + circle}></div>
      </li>
    );
  };
}

export default Field;