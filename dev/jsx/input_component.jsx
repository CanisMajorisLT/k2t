let React = require("react");
let wordParser = require("../js/input_parser").wordParser;

// is esmes cia db reikia laikian pasidaryti toki varianta, kur tiesiog imti jau logika ir kad validuotu input, jei teisingas pereitu prie kito
// zodzio ir t.t., paskui viska graziai sudeliot
let Input = module.exports = React.createClass({
    handleInput(ev) {
        if (!this.props.timerDone) {
            // for safety reason, so player can't just input before timer is done.
            return
        }
        let inputValue = ev.target.value;
        let inputResult = wordParser(this.props.currentWord, inputValue);
        this.props.handleInput(inputResult);
        if (inputResult.allWord === true && inputResult.matches === true) {
            React.findDOMNode(this.refs.userInput).value = "";
        }
        // TODO kai inputas yra backspacas, reik fiksuoti, kad zymetu tesinga spalva texta, bet nereik kad fiksuotu kaip klaida (t.y.
        // gali isvis nesiusti i recordStatistics.
        //comsole.log(inputValue);
        //comsole.log(`input result ${inputResult.matches} ${inputResult.allWord}`);


    },
    componentDidUpdate(){
        this.props.timerDone && this.refs.userInput.getDOMNode().focus()
    },
    render() {
        let styles = {backgroundColor: this.props.currentInputCorrect ? "" : "tomato"};

        return (
            <input style={styles} ref="userInput" onChange={this.handleInput} type="text" disabled={this.props.timerDone ? "" : "disabled"}/>
        )
    }
});