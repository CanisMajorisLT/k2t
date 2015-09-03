let React = require('react');

let AfterGameControls = React.createClass({

  render() {
    return (
      <div>
          <button className="after-game-btn">Play this text again</button>
          <button onClick={this.props.startNewGame} className="after-game-btn">Play different text</button>
          <button className="after-game-btn">Train words with mistakes</button>
      </div>
    );
  }

});

module.exports = AfterGameControls;