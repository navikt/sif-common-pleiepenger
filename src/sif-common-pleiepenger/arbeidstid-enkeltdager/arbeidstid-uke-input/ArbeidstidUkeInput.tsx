import React from 'react';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { FormikInputGroup, FormikTimeInput } from '@navikt/sif-common-formik';
import { dateFormatter, isDateInDates } from '@navikt/sif-common-utils';
import { Ingress } from 'nav-frontend-typografi';
import { TidPerDagValidator } from '../..';
import { tidUkerInputUtils } from '../../tid-kalender-form/tid-uker-input/tidUkerUtils';
import { Daginfo, Ukeinfo } from '../../types/tidUkerTypes';
import dayjs from 'dayjs';

type DagLabelRenderer = (dag: Daginfo) => React.ReactNode;

interface Props {
    getFieldName: (dag: Daginfo) => string;
    getFieldNameNormaltid: (dag: Daginfo) => string;
    ukeinfo: Ukeinfo;
    utilgjengeligeDatoer?: Date[];
    tidPerDagValidator?: TidPerDagValidator;
    ukeTittelRenderer?: (uke: Ukeinfo) => React.ReactNode;
    dagLabelRenderer?: (dag: Daginfo) => React.ReactNode;
}

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

const bem = bemUtils('arbeidstidUkerInput');

// const formatDayAndMonth = (date: Date): string => dayjs(date).format('D. MMMM');

const inputDatoLabel = (date: Date): string => dayjs(date).format('dddd D. MMMM');

const getUkeTittel = ({ ukenummer, år }: Ukeinfo): string => {
    return `Uke ${ukenummer}, ${år}`;
};

const ArbeidstidUkeInput: React.FunctionComponent<Props> = ({
    ukeinfo,
    utilgjengeligeDatoer,
    getFieldName,
    getFieldNameNormaltid,
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
                    <div className={bem.element('arbeidstidNormalt')}>Jobber normalt</div>
                </div>
                {tidUkerInputUtils.getForegåendeDagerIUke(dager[0]).map((dag) => (
                    <div className={bem.element('dag', 'utenforPeriode')} key={dag.isoDate} aria-hidden={true}>
                        {renderDagLabel(dag, dagLabelRenderer)}
                        <div className={bem.element('dag__utenforPeriodeIkon')}>-</div>
                    </div>
                ))}
                {dager.map((dag) => {
                    const erUtilgjengelig = isDateInDates(dag.dato, utilgjengeligeDatoer);
                    return (
                        <FormikInputGroup
                            key={dag.isoDate}
                            legend={<span className="sr-only">{dateFormatter.dayDateAndMonth(dag.dato)}</span>}
                            name={'arbeidstid'}
                            className={bem.element('dag', erUtilgjengelig ? 'utilgjengelig' : undefined)}>
                            {erUtilgjengelig ? (
                                <span />
                            ) : (
                                <div className={bem.element('dag-inputs')}>
                                    <div className={bem.element('dagnavn')} role="presentation" aria-hidden={true}>
                                        {dateFormatter.dayDateAndMonth(dag.dato)}
                                    </div>
                                    <div className={bem.element('arbeidstidPeriode')}>
                                        {/* <input aria-describedby="iPerioden" type="text" aria-label="Timer bla bla" /> */}
                                        <FormikTimeInput
                                            aria-describedby="iPerioden"
                                            name={getFieldName(dag)}
                                            label={
                                                <span className={'sr-only'}>
                                                    Hvor mye skal du jobbe {inputDatoLabel(dag.dato)}
                                                    {/* {renderDagLabel(dag, dagLabelRenderer)} */}
                                                </span>
                                            }
                                            timeInputLayout={{
                                                direction: 'horizontal',
                                            }}
                                            validate={
                                                tidPerDagValidator ? tidPerDagValidator(dag.labelFull) : undefined
                                            }
                                        />
                                    </div>
                                    <div className={bem.element('normalarbeidstid')}>
                                        <FormikTimeInput
                                            name={getFieldNameNormaltid(dag)}
                                            label={
                                                <span className={'sr-only'}>
                                                    Hvor mye jobber du normalt {inputDatoLabel(dag.dato)}, når du ikke
                                                    har fravær
                                                    {/* {renderDagLabel(dag, dagLabelRenderer)} */}
                                                </span>
                                            }
                                            timeInputLayout={{
                                                direction: 'horizontal',
                                            }}
                                            validate={
                                                tidPerDagValidator ? tidPerDagValidator(dag.labelFull) : undefined
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </FormikInputGroup>
                    );
                })}
            </div>
        </div>
    );
};

export default ArbeidstidUkeInput;
