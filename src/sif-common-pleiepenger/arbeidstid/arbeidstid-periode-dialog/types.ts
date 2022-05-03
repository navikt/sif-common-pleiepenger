import { DurationWeekdays } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from '../../types';

export type ArbeidstidPeriodeData = {
    fom: Date;
    tom: Date;
    arbeiderHvordan: ArbeiderIPeriodenSvar;
    prosent?: string;
    tidFasteDager?: DurationWeekdays;
};
