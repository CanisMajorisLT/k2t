let React = require('react');

let AfterGameTextStatistics = module.exports = React.createClass({
    propTypes: {
        dataTextSpecific: React.PropTypes.object.isRequired,
        gamesOfSameText: React.PropTypes.array.isRequired
    },

    render() {
        console.log("AfterGameTextStatistics", this.props.gamesOfSameText);

        // TODO: fetch text data and display last 5(?) games highlighting the current one
        return (
            <div>
                <LastGamesStatTable games={this.props.gamesOfSameText} />
            </div>
        );
    }

});

let LastGamesStatTable = React.createClass({
    getContentRows(){
        return this.props.games.map((game)=> {
            return <OneGameStats game={game} />
        })
    },
    render: function() {
      return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>WPM</th>
                    <th>Mistakes</th>
                </tr>
            </thead>
            <tbody>
            {this.getContentRows()}
            </tbody>
        </table>
      );
    }
});

let OneGameStats = React.createClass({
    render(){
        let game = this.props.game;
        let dateInSeconds = game.gameId.split("-")[1];
        let dateString = new Date(Number(dateInSeconds)).toString();
        console.log(dateString);
        return (
            <tr>
                <td>{dateString}</td>
                <td>{game.WPM}</td>
                <td>{game.totalMistakesInText}</td>
            </tr>
        )
    }
});