import React, { Component } from 'react';
import TvserieItem from './TvserieItem';

class TvserieFeed extends Component {
    render() {
        const { tvseries } = this.props;

        return tvseries.map(tvserie => (
            <TvserieItem key={tvserie._id} tvserie={tvserie} />
        ));
    }
}

export default TvserieFeed;
