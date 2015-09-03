let React = require("react");

let GameStatistics = module.exports = React.createClass({
    render(){
        console.log("Game statistics: ", this.props.data);
        return (
            <div></div>
        )
    }
});