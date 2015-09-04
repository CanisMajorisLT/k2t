var React = require('react');
let trimAndRemoveSigns = require("../js/utils").trimAndRemoveSigns;

var LeftSideStats = React.createClass({

    render() {
        // fecth more comprehensive data about the word // reikia per propsus sita paduoti ciuju data
        let dc = this.props.dataCenter;
        let allWordsData = dc.getData(dc.sc.WORDS_SPECIFIC);
        let moreData = allWordsData[trimAndRemoveSigns(this.props.wordData.word)];
        return (
            <div>
                <div>Dem nice word stats:</div>
                <span>{this.props.wordData}</span>

                <div>Additional info</div>
                <ul>
                    <li>count: {moreData.count}</li>
                    <li>mistakes: {moreData.mistakes}</li>
                    <li>fastest typing time: {moreData.typingTime.fastest}</li>
                    <li>slowest typing time: {moreData.typingTime.all.reduce((p, c)=> {return c > p ? c : p})}</li>
                </ul>
            </div>
        );
    }

});

module.exports = LeftSideStats;