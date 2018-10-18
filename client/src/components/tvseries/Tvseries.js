import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TvserieForm from './TvserieForm';
import TvserieFeed from './TvserieFeed';
import Spinner from '../common/Spinner';
import { getTvseries, clearTvseries } from '../../actions/tvseriesActions';
import clearErrors from '../../utils/clearErrors';

class Tvseries extends Component {
    componentDidMount() {
        this.props.getTvseries();
    }

    componentWillUnmount() {
        this.props.clearTvseries();
        this.props.clearErrors();
    }

    render() {
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        const { tvseries, loading } = this.props.account;

        let tvserieContent;
        if (loading) {
            tvserieContent = <Spinner />;
        } else if (tvseries.length === 0) {
            tvserieContent = <h5>No TvSeries</h5>;
        } else {
            tvserieContent = <TvserieFeed tvseries={tvseries} />;
        }

        return (
            <Fragment>
                <TvserieForm loading={loading} />
                <div className="feed">{tvserieContent}</div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    account: state.account
});

export default connect(
    mapStateToProps,
    { getTvseries, clearTvseries, clearErrors }
)(Tvseries);
