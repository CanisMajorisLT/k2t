let React = require('react');

let AfterGameControls = React.createClass({

  handlePlayThisTextAgain(){
  	// nusiusti text ID i playareawrap/gamewrap
  },

  handleTrainMistakes(){
  	// render main_mistakes_training_component somethere
  },

  render() {
    return (
      <div>
          <button onClick={this.handlePlayThisTextAgain} className="after-game-btn">Play this text again</button>
          <button onClick={this.props.startNewGame} className="after-game-btn">Play different text</button>
          <button onClick={this.handleTrainMistakes} className="after-game-btn">Train words with mistakes</button>
      </div>
    );
  }

});

module.exports = AfterGameControls;