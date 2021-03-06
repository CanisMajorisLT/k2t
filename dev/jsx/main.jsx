let React = require("react");
let Text = require("./text_component.jsx");
let Input = require("./input_component.jsx");
let TextObj = require("../js/text");
let PlayModePanel = require("./playmode_component.jsx");
let LiveStatsWrap = require("./livestats_component.jsx");
let recordStatistic = require("../js/statistics/record_statistics");
let Timer = require("./timer.jsx");
let AfterGameHeatMap = require('./text_heat_map.jsx');
let AfterGameControls = require("./after_game_controls.jsx");
let AfterGameTextStatistics = require("./after_game_text_stats.jsx");
let ComprehensiveStatisticsPanel = require("./comprehensive_stats/main_stats_panel.jsx");

let DataCenter = require("../js/data_center");
let utils = require("../js/utils");
require("../styles/main.scss");
require("babel/polyfill");


let PageWrap = React.createClass({
	render() {
		return (
			<div>
				<div id="play-area">
					<PlayArea dataCenter={this.props.dataCenter}/>
				</div>
				<ComprehensiveStatisticsPanel dataCenter={this.props.dataCenter}/>
			</div>
		);
	}

});


let PlayArea = React.createClass({
	getInitialState(){
		return {text: {}, textChosen: false}
	},

	initiateGame(text){
		this.setState({text: text, textChosen: true})

	},

	startNewGame(){
		console.log("PlayArea startNewGame");
		if (this.props.dataCenter.learningData._data["immediate"].length > 0) {
			// make learning stuff happen
			console.log(this.props.dataCenter.learningData._data["immediate"]);
			let txt = this.props.dataCenter.learningData._data["immediate"].shift();
			console.log("PlayArea train txt", txt);
			this.initiateGame(txt)
		}
		else {
			// start new game selection
			this.setState({
				text: "",
				textChosen: false
			});
		}

	},

	getGameId(){
		return this.state.text.hashId + "-" + new Date().getTime()
	},

	render(){
		// gal cia reikia tiesiog objekta/jsona siusti su zodziu arrejum, tekso kodu kokiu nors, o tada jau tas wrapas kaip nors pagal
		// sita sukurto statistikos objeta ir viska kazkur fiksuotu, nes siaip tiesiog zet ar tiesingai raso uztenka tos
		// vienos fjos kur palygina inputa su dabartiniu zodziu.

		if (this.state.textChosen) {
			return <GameWrap startNewGame={this.startNewGame}
			                 text={this.state.text}
			                 dataCenter={this.props.dataCenter}
			                 gameId={this.getGameId()}/>
		} else {
			return <PlayModePanel initiateGame={this.initiateGame} dataCenter={this.props.dataCenter}/>
		}

	}
});

let GameWrap = React.createClass({
	getInitialState(){
		return {gameInProgress: true}
	},

	componentWillReceiveProps(nextProps) {
		// cia temporary solutionas tam kad paduodant trainingo texta PlayArea, jis neuunmountina sito gamwrapo - bet cia reik pergalvot struktura
		if (nextProps.gameId !== this.props.gameId) {
			this.setState({
				gameInProgress: true
			});
		}

	},

	gameFinished(){
		// render heatmap, show more buttons for what to do
		this.setState({gameInProgress: false});
		// update statistics
	},

	render(){
		if (this.state.gameInProgress) {
			return <Game text={this.props.text}
			             gameFinished={this.gameFinished}
			             dataCenter={this.props.dataCenter}
			             gameId={this.props.gameId}/>;
		}
		else {
			return <AfterGame startNewGame={this.props.startNewGame}
			                  text={this.props.text}
			                  dataCenter={this.props.dataCenter}
			                  gameId={this.props.gameId}/>
		}
	}

});


let AfterGame = React.createClass({
	updateDataCenter(){
		// update all data
		let sc = this.props.dataCenter.sc;
		this.props.dataCenter.updateData(sc.GAME_SPECIFIC, sc.TEXTS_SPECIFIC, sc.WORDS_SPECIFIC, sc.OVER_ALL);
	},

	componentWillMount(){
		console.log("AfterGame will mount");
		this.updateDataCenter()
	},

	getRelatedData(){
		let textId = this.props.text.hashId;
		let sc = this.props.dataCenter.sc;
		let additionalData = this.props.dataCenter.getData(sc.GAME_SPECIFIC, sc.WORDS_SPECIFIC, sc.TEXTS_SPECIFIC);
		console.log("add data", additionalData);
		let wordsSpecific = additionalData.dataWordsSpecific;
		let textSpecific = additionalData.dataTextSpecific[textId];
		let gamesOfSameText = utils.filterGamesOfSameText(textId, additionalData.dataGameSpecific);
		return {wordsSpecific, textSpecific, gamesOfSameText}


	},

	render() {
		let relatedStatisticsData = this.getRelatedData();
		return (
			<div>
				<AfterGameHeatMap text={this.props.text}
				                  gameId={this.props.gameId}
				                  relatedStatisticsData={relatedStatisticsData}
				                  dataCenter={this.props.dataCenter}/>
				<AfterGameControls startNewGame={this.props.startNewGame}
				                   text={this.props.text}
				                   gameId={this.props.gameId}
				                   gamesOfSameText={relatedStatisticsData.gamesOfSameText}
				                   dataCenter={this.props.dataCenter}/>
				<AfterGameTextStatistics gameId={this.props.gameId}
				                         gamesOfSameText={relatedStatisticsData.gamesOfSameText}
				                         dataTextSpecific={relatedStatisticsData.textSpecific}/>
			</div>
		);
	}

});


let Game = React.createClass({
	// kad sitas veiktu tereikia array so zodziais a.k.a teksto.
	getInitialState(){
		return {currentWord: 0, currentInputLength: 0, currentInputCorrect: true, timerDone: false}
	},

	componentWillReceiveProps(nextProps){
		//console.log(nextProps.text.textId);
		this.setState({currentWord: 0})
	},

	updateText(){
		if (this.props.text.textLengthInWords === (this.state.currentWord + 1)) {
			// save game to db
			// display statistic
			// offer to play again / train mistaken words
			console.log("You finished the text!");
			this.props.gameFinished()
		}
		this.setState({currentWord: this.state.currentWord + 1, currentInputLength: 0, currentInputCorrect: true})
	},

	handleInput(inputResult){

		if (inputResult.input.length > this.state.currentInputLength) {
			// when user deletes letters/words don't record it
			let textData = {
				lengthInWords: this.props.text.textLengthInWords,
				gameId: this.props.gameId,
				currentWord: this.state.currentWord
			};
			this.props.dataCenter.rawData.record(inputResult, textData);
			//recordStatistic(inputResult, textData);

		}

		if (inputResult.allWord === true && inputResult.matches === true) {
			this.updateText()

		}
		else {
			this.setState({currentInputLength: inputResult.input.length, currentInputCorrect: inputResult.matches})
		}
	},
	timerDone(){
		console.log("main.jsx tiemr done, updatign state");
		this.setState({timerDone: true})
	},

	render: function () {
		let timer = this.state.timerDone ? null : <Timer countDownTime={3} timerDone={this.timerDone}/>;
		return (
			<div className="wrap">
				<Text text={this.props.text}
				      currentWord={this.state.currentWord}
				      currentInputCorrect={this.state.currentInputCorrect}
				      currentLeterIndex={this.state.currentInputLength}/>

				<Input currentInputCorrect={this.state.currentInputCorrect}
				       currentWord={this.props.text.textWords[this.state.currentWord]}
				       handleInput={this.handleInput}
				       timerDone={this.state.timerDone}/>

				<LiveStatsWrap currentWordIndex={this.state.currentWord}
				               gameId={this.props.gameId}
				               dataCenter={this.props.dataCenter}/>
				{timer}
			</div>
		)
	}
});

// temporary solution
let cleanLSofUnfinishedGames = () => {
	Object.keys(localStorage).forEach((key)=> {
		var item = JSON.parse(localStorage[key]);
		if (!item.endTime) {
			delete localStorage[key]
		}
	})
};
cleanLSofUnfinishedGames();


React.render(<PageWrap dataCenter={new DataCenter()}/>, document.getElementById("react-container"));

