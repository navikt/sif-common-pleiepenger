import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import React from 'react';
import TidEnkeltdagDialog, { TidEnkeltdagDialogProps } from '../tid-enkeltdag-dialog/TidEnkeltdagDialog';
import { ArbeidsforholdType } from '../types';
import dayjs from 'dayjs';
import { dateFormatter, dateToday } from '@navikt/sif-common-utils/lib';
import { TidEnkeltdagFormProps } from '../tid-enkeltdag-dialog/TidEnkeltdagForm';

interface Props extends Omit<TidEnkeltdagDialogProps, 'dialogTitle' | 'formProps'> {
    arbeidsstedNavn: string;
    arbeidsforholdType: ArbeidsforholdType;
    formProps: Omit<TidEnkeltdagFormProps, 'hvorMyeSpørsmålRenderer'>;
}

const ArbeidstidEnkeltdagDialog: React.FunctionComponent<Props> = ({
    isOpen,
    arbeidsforholdType,
    arbeidsstedNavn,
    formProps,
}: Props) => {
    const intl = useIntl();
    const hvorMyeSpørsmålRenderer = (dato: Date): string => {
        const erHistorisk = dayjs(dato).isBefore(dateToday, 'day');
        const intlValues = {
            skalEllerHarJobbet: intlHelper(
                intl,
                erHistorisk ? 'arbeidstidEnkeltdagForm.jobbet' : 'arbeidstidEnkeltdagForm.skalJobbe'
            ),
            hvor: intlHelper(intl, `arbeidstidEnkeltdagForm.som.${arbeidsforholdType}`, { navn: arbeidsstedNavn }),
            når: dateFormatter.fullWithDayName(dato),
        };
        return intlHelper(intl, 'arbeidstidEnkeltdagForm.tid.spm', intlValues);
    };
    return (
        <TidEnkeltdagDialog
            isOpen={isOpen}
            dialogTitle={intlHelper(intl, 'arbeidstidEnkeltdagDialog.contentTitle')}
            formProps={{ ...formProps, hvorMyeSpørsmålRenderer, maksTid: { hours: 24, minutes: 0 } }}
        />
    );
};

export default ArbeidstidEnkeltdagDialog;
