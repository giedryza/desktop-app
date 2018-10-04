import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';
import { addTvserie } from '../../actions/tvseriesActions';

class AddTvseries extends Component {
    state = {
        imdbId: '',
        errors: {}
    };

    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const Data = { imdbId: this.state.imdbId };

        this.props.addTvserie(Data);
        this.setState({ imdbId: '' });
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
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
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addTvserie }
)(AddTvseries);
