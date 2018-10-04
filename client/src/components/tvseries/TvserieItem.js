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
        const { tvserie } = this.props;
        const { imdb } = this.state;

        return (
            <div className="tvserie">
                <div className="poster">
                    <img src={imdb.Poster} alt={imdb.Title} />
                </div>
                <div className="content">
                    <h3>
                        <a
                            href={`https://www.imdb.com/title/${
                                tvserie.imdbId
                            }/`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {imdb.Title}
                        </a>
                    </h3>
                    <div>
                        {imdb.Year} <span>|</span> {imdb.Genre} <span>|</span>{' '}
                        Seasons: {imdb.totalSeasons}
                    </div>
                    <div>
                        <i className="far fa-star" />{' '}
                        <strong>{imdb.imdbRating}</strong> <span>|</span>{' '}
                        {imdb.imdbVotes}
                    </div>
                    <div>{imdb.Plot}</div>
                    <div className="spacer" />
                    <div>
                        <Button
                            type="button"
                            value="Delete"
                            onClick={this.onDeleteClick.bind(this, tvserie._id)}
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
