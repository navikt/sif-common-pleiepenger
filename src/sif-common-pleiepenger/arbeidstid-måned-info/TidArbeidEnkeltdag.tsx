import React from 'react';
import { Duration } from '@navikt/sif-common-utils/lib';
import DurationText from '../duration-text/DurationText';
import './tidArbeidEnkeltdag.less';

interface Props {
    tid: Duration;
    prosent?: number;
}

const TidArbeidEnkeltdag: React.FunctionComponent<Props> = ({ prosent, tid }) => {
    if (prosent !== undefined && prosent > 0) {
        return (
            <span className="tidArbeidEnkeltdag">
                <span className={'tidArbeidEnkeltdag__prosent'}>{prosent} %</span>
                <span className="tidArbeidEnkeltdag__timer">
                    (<DurationText duration={tid} />)
                </span>
            </span>
        );
    }
    if (tid.hours === '0' && tid.minutes === '0') {
        return <></>;
    }
    return <DurationText duration={tid} />;
};

export default TidArbeidEnkeltdag;
