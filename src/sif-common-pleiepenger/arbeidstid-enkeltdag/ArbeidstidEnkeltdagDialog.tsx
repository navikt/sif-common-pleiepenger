import React from 'react';
import { DateRange, Duration } from '@navikt/sif-common-utils';
import { dateFormatter } from '@navikt/sif-common-utils/lib/dateFormatter';
import Modal from 'nav-frontend-modal';
import { ArbeidsforholdType } from '../types';
import ArbeidstidEnkeltdagForm, { ArbeidstidEnkeltdagEndring } from './ArbeidstidEnkeltdagForm';
import './arbeidstidEnkeltdag.less';

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
    if (!isOpen) {
        return null;
    }
    const contentLabel = `Arbeidstid ${dateFormatter.fullWithDayName(dato)}`;

    return isOpen ? (
        <>
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
        </>
    ) : null;
};

export default ArbeidstidEnkeltdagDialog;
