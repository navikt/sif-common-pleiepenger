import { DurationWeekdays } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from '../../types';

interface ArbeidstidPeriodeDataBase {
    fom: Date;
    tom: Date;
}

interface ArbeidstidPeriodeHeltFrav√¶r extends ArbeidstidPeriodeDataBase {
    arbeiderHvordan: ArbeiderIPeriodenSvar.heltFrav√¶r;
}
interface ArbeidstidPeriodeRedusert extends ArbeidstidPeriodeDataBase {
    arbeiderHvordan: ArbeiderIPeriodenSvar.redusert;
    tidFasteDager: DurationWeekdays;
}
interface ArbeidstidPeriodeSomVanlig extends ArbeidstidPeriodeDataBase {
    arbeiderHvordan: ArbeiderIPeriodenSvar.somVanlig;
}

export type ArbeidstidPeriodeData =
    | ArbeidstidPeriodeHeltFrav√¶r
    | ArbeidstidPeriodeRedusert
    | ArbeidstidPeriodeSomVanlig;
