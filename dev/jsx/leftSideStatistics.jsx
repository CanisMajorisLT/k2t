var React = require('react');

var LeftSideStats = React.createClass({

  render() {
    // fecth more comprehensive data about the word
    return (
      <div>
          Dem nice word stats:
          {this.props.wordData}
      </div>
    );
  }

});

module.exports = LeftSideStats;