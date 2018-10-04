import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TvserieForm from './TvserieForm';
import TvserieFeed from './TvserieFeed';
import Spinner from '../common/Spinner';
import { getTvseries } from '../../actions/tvseriesActions';

class Tvseries extends Component {
    componentDidMount() {
        this.props.getTvseries();
    }

    render() {
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        const { tvseries, loading } = this.props.tvseries;
        let tvserieContent;

        if (loading) {
            tvserieContent = <Spinner />;
        } else if (tvseries === null) {
            tvserieContent = <h5>No TvSeries</h5>;
        } else {
            tvserieContent = <TvserieFeed tvseries={tvseries} />;
        }

        return (
            <div>
                <TvserieForm />
                <div className="tvseries">{tvserieContent}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    tvseries: state.tvseries
});

export default connect(
    mapStateToProps,
    { getTvseries }
)(Tvseries);
