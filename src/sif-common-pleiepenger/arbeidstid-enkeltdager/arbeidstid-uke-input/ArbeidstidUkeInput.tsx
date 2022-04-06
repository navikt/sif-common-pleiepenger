import React from 'react';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { FormikInputGroup, FormikTimeInput } from '@navikt/sif-common-formik';
import { dateFormatter, isDateInDates, isDateInWeekdays, Weekday } from '@navikt/sif-common-utils';
import { Ingress } from 'nav-frontend-typografi';
import { TidPerDagValidator } from '../..';
import { tidUkerInputUtils } from '../../tid-kalender-form/tid-uker-input/tidUkerUtils';
import { Daginfo, Ukeinfo } from '../../types/tidUkerTypes';

type DagLabelRenderer = (dag: Daginfo) => React.ReactNode;

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
    dagLabelRenderer,
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
                {tidUkerInputUtils.getForegåendeDagerIUke(dager[0]).map((dag) => (
                    <div className={bem.element('dag', 'utenforPeriode')} key={dag.isoDate} aria-hidden={true}>
                        {renderDagLabel(dag, dagLabelRenderer)}
                        <div className={bem.element('dag__utenforPeriodeIkon')}>-</div>
                    </div>
                ))}
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

const renderDagLabel = (dag: Daginfo, customRenderer?: DagLabelRenderer): JSX.Element => {
    return (
        <span className={bem.element('dag__label')}>
            {customRenderer ? (
                customRenderer(dag)
            ) : (
                <>
                    <span className={bem.element('dag__label__dagnavn')}>{dag.labelDag}</span>
                    <span className={bem.element('dag__label__dato')}>{dag.labelDato}</span>
                </>
            )}
        </span>
    );
};

const inputDatoLabel = (date: Date): string => dateFormatter.dayDateAndMonth(date);

const getUkeTittel = ({ ukenummer, år }: Ukeinfo): string => {
    return `Uke ${ukenummer}, ${år}`;
};

export default ArbeidstidUkeInput;
