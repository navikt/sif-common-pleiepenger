import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import LeftMenu from './components/left-menu/LeftMenu';
import { getRouteConfig } from './config/routeConfig';
import Intro from './Intro';

type Props = RouteComponentProps;

const DevContent: React.FunctionComponent<Props> = ({ history }) => {
    const {
        location: { pathname },
    } = history;
    const routeConfig = getRouteConfig(pathname);
    return (
        <>
            <nav className="asideContent">
                <LeftMenu />
            </nav>
            <article style={{ maxWidth: '1000px' }} className="mainContent">
                {routeConfig ? routeConfig.renderContent() : <Intro />}
            </article>
        </>
    );
};

export default withRouter(DevContent);
