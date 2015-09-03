let React = require("react");

let OverallStatistics = module.exports = React.createClass({

    render(){
        console.log("Overall statistics: ", this.props.data);

        return (
            <div></div>
        )
    }
});