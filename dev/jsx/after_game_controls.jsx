let React = require('react');
let MistakesTrainingComponent = require("./mistakes_training/main_mistakes_training_component.jsx");

let AfterGameControls = React.createClass({
	getInitialState(){
		return {showTrainingWordChoice: false}
	},

	handlePlayThisTextAgain(){
		// nusiusti text ID i playareawrap/gamewrap
	},

	handleTrainMistakes(){
		// render main_mistakes_training_component somethere
		this.setState({
			showTrainingWordChoice: !this.state.showTrainingWordChoice
		});
	},

	render() {
		let gameStats = this.props.gamesOfSameText.filter(game=> game.gameId === this.props.text.gameId)[0];
		let mistakesComponent = this.state.showTrainingWordChoice && gameStats.totalMistakesInText > 0 ?
			<MistakesTrainingComponent dataCenter={this.props.dataCenter}
			                           gameStats={gameStats}
			                           text={this.props.text}
			                           startNewGame={this.props.startNewGame}/> :
			null;

		let trainWords = gameStats.totalMistakesInText > 0 ?
			<button onClick={this.handleTrainMistakes} className="after-game-btn">Train words with mistakes</button> :
			null;

		return (
			<div>
				<button onClick={this.handlePlayThisTextAgain} className="after-game-btn">Play this text again</button>
				<button onClick={this.props.startNewGame} className="after-game-btn">Play different text</button>
				{trainWords}
				<div>
					{mistakesComponent}
				</div>
			</div>
		);
	}

});

module.exports = AfterGameControls;