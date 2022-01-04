import React from 'react';
import { Duration } from '@navikt/sif-common-utils/lib';
import FormattedTimeText from '../formatted-time-text/FormattedTimeText';
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
                    (<FormattedTimeText duration={tid} />)
                </span>
            </span>
        );
    }
    if (tid.hours === '0' && tid.minutes === '0') {
        return <></>;
    }
    return <FormattedTimeText duration={tid} />;
};

export default TidArbeidEnkeltdag;
