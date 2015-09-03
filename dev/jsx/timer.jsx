let React = require("react");

let Timer = module.exports = React.createClass({
    getInitialState(){
        return {secondsPassed: 0}
    },
    updateTimer(){
        this.setState({secondsPassed: this.state.secondsPassed + 1})
    },
    finishTimer(){
        console.log("timer finish");
        this.props.timerDone()
    },
    componentDidMount(){
            console.log("component did mount");
        console.log(this.state.secondsPassed);
        if (this.state.secondsPassed < this.props.countDownTime) {
            setTimeout(this.updateTimer, 1000)
        }
        else {
            setTimeout(this.finishTimer, 1000)
        }
    },
    componentDidUpdate(){
        console.log("component did update");
        console.log(this.state.secondsPassed);
        if (this.state.secondsPassed < this.props.countDownTime) {
            setTimeout(this.updateTimer, 1000)
        }
        else {
            setTimeout(this.finishTimer, 1000)
        }
    },


    render(){
        let secondsLeft = this.props.countDownTime - this.state.secondsPassed;
        return (
            <div>{secondsLeft}</div>
        )
    }
});