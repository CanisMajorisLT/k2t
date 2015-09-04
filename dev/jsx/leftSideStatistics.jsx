let React = require('react');
let trimAndRemoveSigns = require("../js/utils").trimAndRemoveSigns;

let LeftSideStats = React.createClass({
    render() {
        // fecth more comprehensive data about the word // reikia per propsus sita paduoti ciuju data
        let ad = this.props.additionalData;
        return (
            <div>
                <div>Dem nice word stats:</div>
                <span>{this.props.wordData}</span>

                <div>Additional info</div>
                <ul>
                    <li>count: {ad.wordsSpecific.count}</li>
                    <li>mistakes: {ad.wordsSpecific.mistakes}</li>
                    <li>fastest typing time: {ad.wordsSpecific.typingTime.fastest}</li>
                    <li>slowest typing time: {ad.wordsSpecific.typingTime.all.reduce((p, c)=> {return c > p ? c : p})}</li>
                </ul>
            </div>
        );
    }

});

module.exports = LeftSideStats;