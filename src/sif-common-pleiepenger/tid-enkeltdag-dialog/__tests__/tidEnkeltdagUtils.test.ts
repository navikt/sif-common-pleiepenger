import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { GjentagelseType } from '../TidEnkeltdagForm';
import { getDagerMedNyTid } from '../tidEnkeltdagUtils';

describe('tidEnkeltdagUtils', () => {
    describe('getDagerMedNyTid', () => {
        it('velger velger to dager når gjentagelse er to faste dager innenfor en periode på to uker', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-13/2022-01-20'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.hverUke }
            );
            expect(Object.keys(result).length).toBe(2);
            expect(result['2022-01-13'].hours).toEqual('5');
            expect(result['2022-01-13'].minutes).toEqual('0');
            expect(result['2022-01-20'].hours).toEqual('5');
            expect(result['2022-01-20'].minutes).toEqual('0');
        });
    });
});
