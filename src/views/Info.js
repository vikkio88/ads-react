import React from 'react';
import {Icon} from 'semantic-ui-react';
import football from '../assets/images/football.svg';

import './styles/Info.css';
import {GAME_NAME} from "../config";

const Info = () => (
    <div className="infoWrapper">
        <h1>About this game</h1>
        <h2>{GAME_NAME}</h2>
        <img src={football} alt="football"/>
        <div className="linksWrapper">
            <p>This game is completely opensource.</p>
            <p>
                The sourcecode can be found on
                <a href="https://github.com/vikkio88/ads-react" rel="noopener noreferrer" target="_blank">
                    <Icon name="github" size="big"/>
                </a>
            </p>
        </div>
        <p className="signature">
            Made with ♥ by <a href="//vikkio.co" rel="noopener noreferrer" target="_blank">vikkio</a>
        </p>
    </div>
);
export {Info};
