import React from 'react';
import { Duration } from '@navikt/sif-common-utils/lib';
import DurationText from '../../../../common/duration-text/DurationText';
import './arbeidstidEnkeltdagTekst.less';

interface Props {
    tid: Duration;
    prosent?: number;
}

const ArbeidstidEnkeltdagTekst: React.FunctionComponent<Props> = ({ prosent, tid }) => {
    if (prosent !== undefined && prosent > 0) {
        return (
            <span className="arbeidstidEnkeltdagTekst">
                <span className={'arbeidstidEnkeltdagTekst__prosent'}>{prosent} %</span>
                <span className="arbeidstidEnkeltdagTekst__timer">
                    (<DurationText duration={tid} />)
                </span>
            </span>
        );
    }
    return <DurationText duration={tid} />;
};

export default ArbeidstidEnkeltdagTekst;
