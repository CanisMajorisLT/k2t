let React = require("react");


let StatsWrap = module.exports = React.createClass({
    shouldComponentUpdate(nextPops){
        return this.props.currentWordIndex !== nextPops.currentWordIndex
    },
    render(){
        let data = JSON.parse(window.localStorage.getItem(this.props.gameId));
        return (
            <div>
                <WordPerMinute data={data}/>
                <Accuracy data={data}/>
            </div>
        )
    }
});

let WordPerMinute = React.createClass({
    render(){
        let wpm;
        let data = this.props.data;
        //console.log("WPM data", data);
        if (data) {

            let wordsWritten = data.wordStats.length; // cia galiam sikart paduot numeri
            let timeElapsedInSecs = (new Date() - data.startTime) / 1000;
            //console.log(`wordWriteen ${wordsWritten}, timeElapsed ${timeElapsedInSecs}`);
            wpm = Math.trunc(((wordsWritten / timeElapsedInSecs) * 60))
        }
        else {
            wpm = 0
        }

        return (
            <div>
                Wpm: {wpm}
            </div>
        )
    }
});

let Accuracy = React.createClass({
    render(){
        let mistakes = 0;
        let wordsWritten = 0;
        let data = this.props.data;
        if (data) {
            mistakes = countMisstakes(data.wordStats);
            wordsWritten = data.wordStats.length;
            //console.log(`mistakes ${mistakes}`);
        }
        // MPW reikai daryti kad accountin
        return (
            <div>
                MPW (mistakes per word): {(mistakes / wordsWritten) || 0}
            </div>
        )
    }
});


let countMisstakes = function (wordsDataArray) {
    return wordsDataArray.
        map(function (arrForOneWord) {
            return arrForOneWord.reduce(function (accum, curr) {
                let tempAccum = accum.accum;
                if (curr.matches === false && curr.input.length > accum.input.length) {
                    // so it doesn't count as misstake when user uses backspace
                    ++tempAccum
                }
                //console.log(`countMisstakes map.reduce ${tempAccum}`);
                return {accum: tempAccum, input: curr.input}
            }, {accum: 0, input: ''})
        }).
        reduce(function (accum, curr) {
            return accum + curr.accum
        }, 0)
};
