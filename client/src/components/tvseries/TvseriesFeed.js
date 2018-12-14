import React from 'react';
import TvseriesItem from './TvseriesItem';

const TvseriesFeed = ({ tvseries }) =>
    tvseries.map(tvserie => (
        <TvseriesItem key={tvserie._id} tvserie={tvserie} />
    ));

export default TvseriesFeed;
