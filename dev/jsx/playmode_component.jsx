let React = require("react");

let text1 = "The world of typing has changed. In the 1970s, every business had rooms full of secretaries whose job it was to type letters that had been hand-written. They were copying the writing into a more readable format. In the early 1980s, the personal computer became a common office machine.";
let text2 = "The ref attribute can be a callback function instead of a name. This callback will be executed immediately after the component is mounted. The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).";


let PlayModePanel = module.exports = React.createClass({
    getInitialState(){
        return {showCustomInput: false}
    },
    handleClick(e){
        let mode = e.target.id;

        if (mode === "random") {
            this.setRandomText()
        }
        else {
            this.setState({showCustomInput: !this.state.showCustomInput})
        }
    },
    setRandomText(){
        let text = Math.random() > 0.5 ? text1 : text2;
        this.props.initiateGame(text)

    },
    setCustomText(text){
        this.props.initiateGame(text)
    },


    render(){
        let customInput = this.state.showCustomInput ? <CustomTextInputArea setCustomText={this.setCustomText}/> : null;
        return (
            <div className="playmodes">
                <button onClick={this.handleClick} id="random">Random Text</button>
                <button onClick={this.handleClick} id="custom">Custom Text</button>
                {customInput}
            </div>
        )
    }
});

let CustomTextInputArea = React.createClass({
    handleClick(e){
        let text = React.findDOMNode(this.refs.customText).value.trim();

        text !== "" && this.props.setCustomText(text)
    },

    render(){
        return (
            <div>
                <button onClick={this.handleClick}>Done</button>
                <textarea ref="customText" name="custom-text" cols="30" rows="10"></textarea>
            </div>

        )
    }
});