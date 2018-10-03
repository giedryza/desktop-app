import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';
import { addTvseries } from '../../actions/authActions';

class AddTvseries extends Component {
    state = {
        imdbId: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const Data = this.state.imdbId;

        this.props.addTvseries(Data);
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
                <h1>Add TvSeries</h1>
                <form onSubmit={this.onSubmit} noValidate>
                    <TextInput
                        placeholder="tt1234567"
                        type="text"
                        name="imdbId"
                        value={this.state.imdbId}
                        onChange={this.onChange}
                        error={errors.imdbId}
                    />

                    <input className="button" type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addTvseries }
)(withRouter(AddTvseries));
