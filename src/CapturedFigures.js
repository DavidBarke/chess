import React from "react";
import {figureNumbersToNames} from "./utils.js";

class CapturedFigures extends React.Component {
	render() {
		var figures = figureNumbersToNames(this.props.figures), figureName;

		var containerNumbers = [...Array(16).keys()];
		var containers = containerNumbers.map((i) => {
			var style = {
				width: this.props.size.width / 16,
				height: this.props.size.width / 16
			};

			if (i < this.props.figures.length) {
				figureName = figures[i];
			} else {
				figureName = " ";
			}

			return(
				<li className="captured-figure field" style={style} key={i.toString()}>
					<div className={"figure " + figureName}></div>
				</li>
			);
		});
		return(
			<ul className="captured-figures">
				{containers}
			</ul>
		);
	};
};

export default CapturedFigures;