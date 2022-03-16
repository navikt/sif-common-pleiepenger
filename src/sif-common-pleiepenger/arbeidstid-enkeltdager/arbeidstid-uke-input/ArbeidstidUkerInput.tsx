import React from 'react';
import ResponsivePanel from '@navikt/sif-common-core/lib/components/responsive-panel/ResponsivePanel';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { DateRange } from '@navikt/sif-common-formik';
import { isDateInDates } from '@navikt/sif-common-utils/lib';
import { tidUkerInputUtils } from '../../tid-kalender-form/tid-uker-input/tidUkerUtils';
import { TidPerDagValidator } from '../../types';
import { Daginfo, Ukeinfo } from '../../types/tidUkerTypes';
import ArbeidstidUkeInput from './ArbeidstidUkeInput';
import './arbeidstidUkerInput.less';

const getTidKalenderFieldName = (fieldName: string, dag: Daginfo): string => `${fieldName}.${dag.isoDate}`;

interface Props {
    fieldName: string;
    fieldNameNormaltid: string;
    periode: DateRange;
    brukPanel?: boolean;
    utilgjengeligeDatoer?: Date[];
    ukeTittelRenderer?: (uke: Ukeinfo) => React.ReactNode;
    tidPerDagValidator?: TidPerDagValidator;
}

const bem = bemUtils('tidUkerInput');

export const ArbeidstidUkerInput: React.FunctionComponent<Props> = ({
    fieldName,
    fieldNameNormaltid,
    periode,
    brukPanel,
    utilgjengeligeDatoer,
    ukeTittelRenderer,
    tidPerDagValidator,
}) => {
    // const isNarrow = useMediaQuery({ maxWidth: 400 });
    // const isWide = useMediaQuery({ minWidth: 1050 });

    const dager = tidUkerInputUtils.getDagInfoForPeriode(periode);
    const uker = tidUkerInputUtils
        .getUkerFraDager(dager)
        .filter(
            (uke) =>
                uke.dager.filter((dag) => isDateInDates(dag.dato, utilgjengeligeDatoer)).length !== uke.dager.length
        );

    return (
        <div className={bem.classNames(bem.block, bem.modifier('inlineForm'))}>
            {uker.map((uke) => {
                const content = (
                    <ArbeidstidUkeInput
                        ukeTittelRenderer={ukeTittelRenderer}
                        getFieldName={(dag) => getTidKalenderFieldName(fieldName, dag)}
                        getFieldNameNormaltid={(dag) => getTidKalenderFieldName(fieldNameNormaltid, dag)}
                        ukeinfo={uke}
                        utilgjengeligeDatoer={utilgjengeligeDatoer}
                        tidPerDagValidator={tidPerDagValidator}
                    />
                );
                return (
                    <div key={uke.ukenummer} className={bem.element('ukeWrapper')}>
                        {brukPanel ? <ResponsivePanel>{content}</ResponsivePanel> : content}
                    </div>
                );
            })}
        </div>
    );
};

export default ArbeidstidUkerInput;
