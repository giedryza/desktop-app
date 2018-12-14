import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTvserie } from '../../actions/tvseriesActions';
import Button from '../common/Button';

class TvseriesItem extends Component {
    state = {
        imdb: {}
    };

    componentDidMount() {
        const { imdbId } = this.props.tvserie;
        const apikey = process.env.REACT_APP_OMDB_API_KEY;
        fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${apikey}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ imdb: data });
            })
            .catch(err => console.log(err));
    }

    onDeleteClick = id => () => {
        this.props.deleteTvserie(id);
    };

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
            Plot
        } = this.state.imdb;

        return (
            <div className="tvserie">
                <Link
                    to={`//www.imdb.com/title/${imdbId}/`}
                    className="tvserie__poster"
                    target="_blank"
                >
                    <img src={Poster} alt={Title} />
                </Link>
                <div className="tvserie__content">
                    <div>
                        <h3>
                            <Link
                                to={`//www.imdb.com/title/${imdbId}/`}
                                target="_blank"
                            >
                                {Title}
                            </Link>
                        </h3>
                        <div>
                            {Year} <span>|</span> {Genre} <span>|</span>{' '}
                            Seasons: {totalSeasons}
                        </div>
                        <div>
                            <i className="far fa-star" />{' '}
                            <strong>{imdbRating}</strong> <span>|</span>{' '}
                            {imdbVotes}
                        </div>
                        <div>{Plot}</div>
                    </div>

                    <Button
                        type="button"
                        value="Remove"
                        onClick={this.onDeleteClick(_id)}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { deleteTvserie }
)(TvseriesItem);
