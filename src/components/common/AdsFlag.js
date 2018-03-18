import React from 'react';
import {Flag} from 'semantic-ui-react';


const AdsFlag = ({name}) => <Flag name={name === 'en' ? 'gb' : name}/>;

export {AdsFlag};