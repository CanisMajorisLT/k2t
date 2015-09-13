let React = require("React")

module.exports = React.createClass({
	handleClickJustWords(){

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