import React from 'react';
import { useIntl } from 'react-intl';
import { DateRange } from '@navikt/sif-common-formik/lib';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { ArbeidIPeriodeIntlValues, ArbeidstidPeriodeData } from '../types';
import { getArbeidIPeriodeMessages } from './arbeidPeriodeMessages';
import ArbeidstidPeriodeForm from './ArbeidstidPeriodeForm';
import './arbeidstidPeriode.less';

interface Props {
    isOpen: boolean;
    arbeidsstedNavn: string;
    jobberNormaltTimer: number;
    periode: DateRange;
    intlValues: ArbeidIPeriodeIntlValues;
    onSubmit: (arbeidstidPeriode: ArbeidstidPeriodeData) => void;
    onCancel: () => void;
}

const ArbeidstidPeriodeDialog: React.FunctionComponent<Props> = ({
    arbeidsstedNavn,
    periode,
    isOpen,
    intlValues,
    jobberNormaltTimer,
    onSubmit,
    onCancel,
}) => {
    const txt = getArbeidIPeriodeMessages(useIntl().locale);
    return isOpen ? (
        <Modal
            isOpen={isOpen}
            contentLabel={txt.arbeidstidPeriodeDialogContentLabel}
            onRequestClose={onCancel}
            shouldCloseOnOverlayClick={false}
            className="arbeidstidPeriodeDialog">
            <Normaltekst tag="div">
                <ArbeidstidPeriodeForm
                    jobberNormaltTimer={jobberNormaltTimer}
                    intlValues={intlValues}
                    arbeidsstedNavn={arbeidsstedNavn}
                    rammePeriode={periode}
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                />
            </Normaltekst>
        </Modal>
    ) : null;
};

export default ArbeidstidPeriodeDialog;
