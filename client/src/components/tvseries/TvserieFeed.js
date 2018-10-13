import React from 'react';
import TvserieItem from './TvserieItem';

const TvserieFeed = props => {
    const { tvseries } = props;

    return tvseries.map(tvserie => (
        <TvserieItem key={tvserie._id} tvserie={tvserie} />
    ));
};

export default TvserieFeed;
