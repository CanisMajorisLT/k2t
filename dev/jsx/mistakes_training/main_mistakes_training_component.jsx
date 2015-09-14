let React = require("react");
import * as trainingStringsGen from "../../js/word_training/traning_string_generators.js"
module.exports = React.createClass({
	handleClickJustWords(){
		let trainingString = trainingStringsGen.wordsWithoutContext({gameStats: this.props.gameStats});
		console.log("Traingin component makeWordsStringForTRaining ==>", trainingString);
		this.props.dataCenter.learningData.addData.toImmediate(trainingString);
		this.props.startNewGame()
	},

	handleClickWordsWithContext(){

	},
	render(){
		/*
		 TODO:
		 1. Sita reikia perdaryti i normalia pasirinkimu panele ir ta traininga padaryt smart.
		 2. Reik nuspresti kur sita komponenta ikisti (ar kaip nors cia su mygtukais i after game contotrols,
		 ar kaip nors i gamewrap,
		 ar kaip nors i  play area)
		 */
		return (
			<div>
				<button onClick={this.handleClickJustWords}>Train just words</button>
				<button onClick={this.handleClickWordsWithContext}>Train with words with surounding context</button>
			</div>
		)
	}
});



