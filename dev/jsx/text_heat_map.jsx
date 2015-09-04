let React = require("react");
let singleWordStats = require("../js/statistics/statistics_calculation_functions").singleWordStats;
let makeWordHeatmap = require("../js/utils").makeWordHeatmap;
let LeftSideWordsStatistics = require("./leftSideStatistics.jsx");
let trimAndRemoveSigns = require("../js/utils").trimAndRemoveSigns;


let AfterGameHeatMap = module.exports = React.createClass({
    getInitialState: function () {
        return {
            wordData: null
        };
    },

    updateDataCenter(){
        // update all data
        let sc = this.props.dataCenter.sc;
        this.props.dataCenter.updateData(sc.TEXTS_SPECIFIC, sc.WORDS_SPECIFIC, sc.OVER_ALL);
    },

    componentDidMount (){
        console.log("AfterGameHeatMap did mount")
        this.updateDataCenter()
    },

    updateLeftSideStatistics(newWordData){
        this.setState({
            wordData: newWordData
        });
    },

    getAdditionalDataForWord(){
        let trimedWord = trimAndRemoveSigns(this.state.wordData.word);
        let dc = this.props.dataCenter;
        let additionalData = dc.getData(dc.sc.WORDS_SPECIFIC, dc.sc.TEXTS_SPECIFIC);
        console.log(additionalData)
        let wordsSpecific = additionalData.dataWordsSpecific[trimedWord];
        let textSpecific = additionalData.dataTextSpecific[this.props.text.gameId]

        return {wordsSpecific, textSpecific}
    },

    render () {
        let gameId = this.props.text.gameId;
        if (this.state.wordData) {
            return (
                <div>
                    <LeftSideWordsStatistics wordData={this.state.wordData} additionalData={this.getAdditionalDataForWord()}/>
                    <TextHeatMap gameId={gameId} updateLeftSideStatistics={this.updateLeftSideStatistics}/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <TextHeatMap gameId={gameId} updateLeftSideStatistics={this.updateLeftSideStatistics}/>
                </div>
            );
        }

    }

});


let TextHeatMap = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return nextProps.gameId !== this.props.gameId
    },

    render(){
        let wordsData = JSON.parse(localStorage.getItem(this.props.gameId)).wordStats;
        // gameStatistics[gameId] ==> textWordsArray.map(w=>statistics.words[w])
        /*taip neveiks nes statistika tuos pat zodzius sumeta i bendra ir neislaiko eiliskumo,
         *TODO gal reik gamestats pakeisti kad eiliskuma islaikytu? suteikti visoms stat funckijom kaip opcija islaikyt ieliskuma ir
         * nekiskti i bendra viena pvz dvieju 'the'*/
        let heatMap = wordsData.map((wordInputArray)=> {
            let wordStats = singleWordStats(wordInputArray, false); // {object} {word: str, mistakes: number, heatMap: [], typingTime: number}
            return <Word updateLeftSideStatistics={this.props.updateLeftSideStatistics} data={wordStats}/>
        });

        return (
            <div className="text">{heatMap}</div>
        )
    }
});

/*TODO:
 * 1. hoverinant ant klaidingu zodziu parodyti overall tokiu pat zodziu heatmapa
 * 2. laika, kiek sugiasta prie to zodzio, irgi gaiam vidutini siaip tokio zodzio laika
 * 3. accuracy to zodzio
 * @@galima dar daryti heatmapa su sodrejanciom spalvom priklausomai nuo rasymo greicio (palei zodi).*/

var Word = React.createClass({
    handleHover(){
        this.props.updateLeftSideStatistics(this.props.data)
    },

    render: function () {
        console.log("heatmap for word data", this.props.data);
        let word = this.props.data.word;
        let styles = {backgroundColor: "green"};
        if (this.props.data.mistakes > 0) {
            styles.backgroundColor = "red";
            word = makeWordHeatmap(word, this.props.data.heatMap);  // returns array of spans as letters
        }
        return (
            <span onMouseOver={this.handleHover} style={styles}>{word}</span>
        );
    }

});

