import React from 'react';
import { useIntl } from 'react-intl';
import { DateRange, Duration } from '@navikt/sif-common-utils';
import { dateFormatter } from '@navikt/sif-common-utils/lib/dateFormatter';
import Modal from 'nav-frontend-modal';
import { ArbeidsforholdType } from '../types';
import ArbeidstidEnkeltdagForm, { ArbeidstidEnkeltdagEndring } from './ArbeidstidEnkeltdagForm';
import './arbeidstidEnkeltdag.less';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';

interface Props {
    isOpen?: boolean;
    dato: Date;
    tid?: Partial<Duration>;
    tidOpprinnelig?: Duration;
    arbeidsstedNavn: string;
    periode: DateRange;
    arbeidsforholdType: ArbeidsforholdType;
    onSubmit: (evt: ArbeidstidEnkeltdagEndring) => void;
    onCancel: () => void;
}

const ArbeidstidEnkeltdagDialog: React.FunctionComponent<Props> = ({
    isOpen = false,
    dato,
    tid,
    tidOpprinnelig,
    arbeidsstedNavn,
    arbeidsforholdType,
    periode,
    onSubmit,
    onCancel,
}) => {
    const intl = useIntl();
    if (!isOpen) {
        return null;
    }
    const contentLabel = intlHelper(intl, 'arbeidstidEnkeltdagDialog.contentTitle', {
        dato: dateFormatter.fullWithDayName(dato),
    });

    return isOpen ? (
        <Modal
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onCancel}
            shouldCloseOnOverlayClick={false}
            className="arbeidstidEnkeltdagDialog">
            <ArbeidstidEnkeltdagForm
                periode={periode}
                dato={dato}
                tid={tid}
                tidOpprinnelig={tidOpprinnelig}
                arbeidsstedNavn={arbeidsstedNavn}
                arbeidsforholdType={arbeidsforholdType}
                onCancel={onCancel}
                onSubmit={onSubmit}
            />
        </Modal>
    ) : null;
};

export default ArbeidstidEnkeltdagDialog;
