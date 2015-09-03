let React = require("react");

let Text = module.exports = React.createClass({
    render: function () {
        var text = this.props.text.textWords.map((word, index) => {
            let txtStyle = {color: ""};
            let wordToUse = word;
            if (this.props.currentWord === index) {
                txtStyle.color = "orange";
                wordToUse = word.split("").map((letter, indexLetter) => {
                    let letterStyle = {color: ""};
                    if (this.props.currentLeterIndex > indexLetter) {
                        if (this.props.currentInputCorrect) {
                            letterStyle.color = "green"
                        }
                        else {
                            letterStyle.color = "red"

                        }
                    }
                    return <span style={letterStyle}>{letter}</span>
                })

            }
            return <span style={txtStyle}>{wordToUse}</span>
        });
        return (
            <div className="text">
                {text}
            </div>
        )
    }
});