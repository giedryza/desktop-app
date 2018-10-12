import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTvserie } from '../../actions/tvseriesActions';
import Button from '../common/Button';

class TvserieItem extends Component {
    state = {
        apikey: process.env.REACT_APP_OMDB_API_KEY,
        imdb: {}
    };

    componentDidMount() {
        const { tvserie } = this.props;
        const { apikey } = this.state;
        fetch(`https://www.omdbapi.com/?i=${tvserie.imdbId}&apikey=${apikey}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ imdb: data });
            })
            .catch(err => console.log(err));
    }

    onDeleteClick(id) {
        this.props.deleteTvserie(id);
    }

    render() {
        const { imdbId, _id } = this.props.tvserie;
        const {
            Poster,
            Title,
            Year,
            Genre,
            totalSeasons,
            imdbRating,
            imdbVotes,
            imdbPlot
        } = this.state.imdb;

        return (
            <div className="tvserie">
                <div className="poster">
                    <a
                        href={`https://www.imdb.com/title/${imdbId}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={Poster} alt={Title} />
                    </a>
                </div>
                <div className="content">
                    <h3>
                        <a
                            href={`https://www.imdb.com/title/${imdbId}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {Title}
                        </a>
                    </h3>
                    <div>
                        {Year} <span>|</span> {Genre} <span>|</span> Seasons:{' '}
                        {totalSeasons}
                    </div>
                    <div>
                        <i className="far fa-star" />{' '}
                        <strong>{imdbRating}</strong> <span>|</span> {imdbVotes}
                    </div>
                    <div>{imdbPlot}</div>
                    <div className="spacer" />
                    <div>
                        <Button
                            type="button"
                            value="Remove"
                            onClick={this.onDeleteClick.bind(this, _id)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { deleteTvserie }
)(TvserieItem);
