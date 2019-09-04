import React from 'react';
import './App.css';
import Board from "./Board.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

class App extends React.Component {
  	constructor(props) {
  		super(props);

  		this.state = {
  			width: 0,
  			height: 0
  		};

  		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  	}

  	componentDidMount() {
  		this.updateWindowDimensions();
  		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
  		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
  		this.setState({ 
  			width: window.innerWidth, 
  			height: window.innerHeight,
  		});
	}

  	render() {
  		// Handle scrollbar
  		var height = 0.95 * this.state.height;
  		
  		var minDimension = Math.min(this.state.width, height)
  		var boardSize, widthLeftover;

  		if (minDimension === this.state.width) {
  			boardSize = Math.min(0.9 * height, minDimension);
  			widthLeftover = minDimension - boardSize; 
  		} else {
  			boardSize = 0.9 * height
  			widthLeftover = this.state.width - boardSize;
  		}

  		var gameareaStyle = {
  			marginLeft: widthLeftover / 2,
  			marginRight: widthLeftover / 2,
  		};

  		var size = {
  			board: boardSize,
  			capturedHeight: (1 / 16) * boardSize,
  			capturedWidth: boardSize,
  		};

    	return (
      		<div className="app">
        		<Header />
        		<Board size={size} gameareaStyle={gameareaStyle}/>
        		<Footer />
      		</div>
    	);
  	};
}

export default App;
