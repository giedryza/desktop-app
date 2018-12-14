import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTvseries, clearTvseries } from '../../actions/tvseriesActions';
import { clearErrors } from '../../utils/helperActions';

import Spinner from '../common/Spinner';
import TvseriesForm from './TvseriesForm';
import TvseriesFeed from './TvseriesFeed';

class Tvseries extends Component {
    componentDidMount() {
        this.props.getTvseries();
    }

    componentWillUnmount() {
        this.props.clearErrors();
        this.props.clearTvseries();
    }

    renderTvseries = ({ tvseries, loading }) => {
        if (loading) return <Spinner />;
        else if (tvseries.length === 0) return <h5>No TvSeries</h5>;
        else return <TvseriesFeed tvseries={tvseries} />;
    };

    render() {
        if (!this.props.auth.isAuthenticated) return <Redirect to="/" />;

        return (
            <Fragment>
                <TvseriesForm disabled={this.props.account.loading} />
                <div className="feed">
                    {this.renderTvseries(this.props.account)}
                </div>
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
    { getTvseries, clearErrors, clearTvseries }
)(Tvseries);
