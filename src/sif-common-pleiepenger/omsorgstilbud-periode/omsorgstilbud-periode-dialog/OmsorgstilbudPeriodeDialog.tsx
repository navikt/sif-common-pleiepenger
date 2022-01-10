import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-formik/lib';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import OmsorgstilbudPeriodeForm, {
    OmsorgstilbudPeriodeData,
} from '../omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import './omsorgstilbudPeriodeDialog.less';

interface Props {
    isOpen: boolean;
    periode: DateRange;
    gjelderFortid: boolean;
    onSubmit: (omsorgstilbudPeriode: OmsorgstilbudPeriodeData) => void;
    onCancel: () => void;
}

const OmsorgstilbudPeriodeDialog: React.FC<Props> = ({ periode, gjelderFortid, isOpen, onSubmit, onCancel }) => {
    const intl = useIntl();
    return isOpen ? (
        <Modal
            isOpen={isOpen}
            contentLabel={intlHelper(intl, 'omsorgstilbudPeriodeDialog_contentLabel')}
            onRequestClose={onCancel}
            shouldCloseOnOverlayClick={false}
            className="omsorgstilbudPeriodeDialog">
            <Normaltekst tag="div">
                <OmsorgstilbudPeriodeForm
                    rammePeriode={periode}
                    gjelderFortid={gjelderFortid}
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                />
            </Normaltekst>
        </Modal>
    ) : null;
};

export default OmsorgstilbudPeriodeDialog;
