let React = require("react");
let GameStatistics = require("./game_statistics.jsx");
let TextStatistics = require("./text_statistics.jsx");
let WordStatistics = require("./words_statistics.jsx");
let OverallStatistics = require("./overall_statistics.jsx");


let MainStatisticsPanel = module.exports = React.createClass({
    render(){
        let dc = this.props.dataCenter;
        let {dataGameSpecific, dataTextSpecific, dataWordsSpecific, overAll}  = dc.getAllState();
        return (
            <div>
                <GameStatistics data={dataGameSpecific} />
                <TextStatistics data={dataTextSpecific} />
                <WordStatistics data={dataWordsSpecific} />
                <OverallStatistics data={overAll} />
            </div>
        )
    }
});