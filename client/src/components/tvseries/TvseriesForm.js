import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTvserie } from '../../actions/tvseriesActions';
import TextInput from '../common/TextInput';
import Button from '../common/Button';

class TvseriesForm extends Component {
    state = {
        imdbId: ''
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = { imdbId: this.state.imdbId };
        this.props.addTvserie(data);
        this.setState({ imdbId: '' });
    };

    render() {
        const { errors, disabled } = this.props;

        return (
            <form onSubmit={this.onSubmit} noValidate>
                <TextInput
                    placeholder="tt1234567"
                    type="text"
                    name="imdbId"
                    value={this.state.imdbId}
                    onChange={this.onChange}
                    error={errors.imdbId}
                />

                <Button type="submit" value="Add" disabled={disabled} />
                <small>
                    * www.imdb.com/title/
                    <span className="tvserie__info">tt2543312</span>/
                </small>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addTvserie }
)(TvseriesForm);
