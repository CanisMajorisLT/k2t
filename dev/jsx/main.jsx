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

let text1 = "The world of typing has changed. In the 1970s, every business had rooms full of secretaries whose job it was to type letters that had been hand-written. They were copying the writing into a more readable format. In the early 1980s, the personal computer became a common office machine.";
let text2 = "The ref attribute can be a callback function instead of a name. This callback will be executed immediately after the component is mounted. The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).";


let PageWrap = React.createClass({
    render() {
        return (
            <div>
                <PlayArea dataCenter={this.props.dataCenter}/>
                <ComprehensiveStatisticsPanel dataCenter={this.props.dataCenter}/>
            </div>
        );
    }

});


let PlayArea = React.createClass({
    getInitialState(){
        return {text: "", textChosen: false}
    },

    initiateGame(text){
        this.setState({text: text, textChosen: true})

    },
    startNewGame(){
        this.setState({
            text: "",
            textChosen: false
        });
    },


    render(){
        // gal cia reikia tiesiog objekta/jsona siusti su zodziu arrejum, tekso kodu kokiu nors, o tada jau tas wrapas kaip nors pagal
        // sita sukurto statistikos objeta ir viska kazkur fiksuotu, nes siaip tiesiog zet ar tiesingai raso uztenka tos
        // vienos fjos kur palygina inputa su dabartiniu zodziu.

        // StatisticsPanel iskelti is cia
        let playModePanel = this.state.textChosen ? null : <PlayModePanel initiateGame={this.initiateGame}/>;
        let gameWrap = this.state.textChosen ?
            <GameWrap startNewGame={this.startNewGame} text={new TextObj(this.state.text)}
                      dataCenter={this.props.dataCenter}/> : null;
        return (
            <div id="play-area">
                {playModePanel}
                {gameWrap}
            </div>

        )
    }
});

let GameWrap = React.createClass({
    getInitialState(){
        return {gameInProgress: true}
    },
    gameFinished(){
        // render heatmap, show more buttons for what to do
        this.setState({gameInProgress: false});
        // update statistics
    },

    render(){
        if (this.state.gameInProgress) {
            return <Game text={this.props.text} gameFinished={this.gameFinished}/>;
        }
        else {
            return <AfterGame startNewGame={this.props.startNewGame} text={this.props.text}
                              dataCenter={this.props.dataCenter}/>
        }
    }

});


let AfterGame = React.createClass({
    updateDataCenter(){
        // update all data
        let sc = this.props.dataCenter.sc;
        this.props.dataCenter.updateData(sc.TEXTS_SPECIFIC, sc.WORDS_SPECIFIC, sc.OVER_ALL);
    },

    componentWillMount(){
        console.log("AfterGame will mount");
        this.updateDataCenter()
    },

    getRelatedData(){
        let textId = this.props.text.gameId.split("-")[0];
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
                                  relatedStatisticsData={relatedStatisticsData}/>
                <AfterGameControls startNewGame={this.props.startNewGame}/>
                <AfterGameTextStatistics gameId={this.props.text.gameId}
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
                gameId: this.props.text.gameId,
                currentWord: this.state.currentWord
            };
            recordStatistic(inputResult, textData);

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
                               gameId={this.props.text.gameId}/>
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

