let React = require("react");

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
        this.props.initiateGame(this.props.dataCenter.textData.getRandomText())

    },
    setCustomText(text){
        this.props.initiateGame(this.props.dataCenter.textData.makeTextObject(text))
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