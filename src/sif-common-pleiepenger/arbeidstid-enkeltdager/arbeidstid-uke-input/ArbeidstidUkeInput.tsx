import React from 'react';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { FormikInputGroup, FormikTimeInput } from '@navikt/sif-common-formik';
import { dateFormatter, isDateInDates, isDateInWeekdays, Weekday } from '@navikt/sif-common-utils';
import { Ingress } from 'nav-frontend-typografi';
import { TidPerDagValidator } from '../..';
import { Daginfo, Ukeinfo } from '../../types/tidUkerTypes';

interface Props {
    getFieldName: (dag: Daginfo) => string;
    ukeinfo: Ukeinfo;
    utilgjengeligeDatoer?: Date[];
    utilgjengeligeUkedager?: Weekday[];
    tidPerDagValidator?: TidPerDagValidator;
    ukeTittelRenderer?: (uke: Ukeinfo) => React.ReactNode;
    dagLabelRenderer?: (dag: Daginfo) => React.ReactNode;
}

const bem = bemUtils('arbeidstidUkerInput');

const ArbeidstidUkeInput: React.FunctionComponent<Props> = ({
    ukeinfo,
    utilgjengeligeDatoer,
    utilgjengeligeUkedager,
    getFieldName,
    tidPerDagValidator,
    ukeTittelRenderer,
}) => {
    const { dager } = ukeinfo;

    return (
        <div className={bem.element('uke')}>
            {ukeTittelRenderer ? (
                ukeTittelRenderer(ukeinfo)
            ) : (
                <Ingress tag="h3" style={{ marginBottom: '.5rem', marginTop: '1rem' }}>
                    {getUkeTittel(ukeinfo)}
                </Ingress>
            )}

            <div className={bem.element('uke__ukedager')}>
                <div className={bem.element('dag-inputs', 'header')}>
                    <div className={bem.element('dagnavn', 'header')}>Dag</div>
                    <div className={bem.element('arbeidstidPeriode')} id="iPerioden">
                        Jobber i perioden
                    </div>
                </div>
                {dager.map((dag) => {
                    const erUtilgjengeligDato = isDateInDates(dag.dato, utilgjengeligeDatoer);
                    const erUtilgjengeligUkedag = utilgjengeligeUkedager
                        ? isDateInWeekdays(dag.dato, utilgjengeligeUkedager)
                        : false;
                    if (erUtilgjengeligDato || erUtilgjengeligUkedag) {
                        return null;
                    }
                    const dayDateString = inputDatoLabel(dag.dato);
                    return (
                        <FormikInputGroup
                            key={dag.isoDate}
                            legend={<span className="sr-only">{dayDateString}</span>}
                            name={'arbeidstid'}
                            className={bem.element('dag', erUtilgjengeligDato ? 'utilgjengelig' : undefined)}>
                            <div className={bem.element('dag-inputs')}>
                                <div className={bem.element('dagnavn')} role="presentation" aria-hidden={true}>
                                    {dayDateString}
                                </div>
                                <div className={bem.element('arbeidstidPeriode')}>
                                    <FormikTimeInput
                                        aria-describedby="iPerioden"
                                        name={getFieldName(dag)}
                                        label={
                                            <span className={'sr-only'}>Hvor mye skal du jobbe {dayDateString}</span>
                                        }
                                        timeInputLayout={{
                                            direction: 'horizontal',
                                        }}
                                        validate={tidPerDagValidator ? tidPerDagValidator(dag.labelFull) : undefined}
                                    />
                                </div>
                            </div>
                        </FormikInputGroup>
                    );
                })}
            </div>
        </div>
    );
};

const inputDatoLabel = (date: Date): string => dateFormatter.dayDateAndMonth(date);

const getUkeTittel = ({ ukenummer, år }: Ukeinfo): string => {
    return `Uke ${ukenummer}, ${år}`;
};

export default ArbeidstidUkeInput;
