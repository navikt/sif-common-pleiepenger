import { getRedusertArbeidstidSomISODuration } from '../arbeidstidPeriodeFormUtils';

describe('getRedusertArbeidstidSomISODuration', () => {
    it('beregner riktig ved 20%', () => {
        expect(getRedusertArbeidstidSomISODuration(40, 20)).toEqual('PT8H0M');
        expect(getRedusertArbeidstidSomISODuration(37.5, 20)).toEqual('PT7H30M');
    });
    it('beregner riktig ved 33.34%', () => {
        expect(getRedusertArbeidstidSomISODuration(40, 33.34)).toEqual('PT13H20M');
        expect(getRedusertArbeidstidSomISODuration(30, 33.34)).toEqual('PT10H0M');
        expect(getRedusertArbeidstidSomISODuration(37.5, 33.34)).toEqual('PT12H30M');
    });
    it('beregner riktig ved 50%', () => {
        expect(getRedusertArbeidstidSomISODuration(40, 50)).toEqual('PT20H0M');
        expect(getRedusertArbeidstidSomISODuration(30, 50)).toEqual('PT15H0M');
        expect(getRedusertArbeidstidSomISODuration(37.5, 50)).toEqual('PT18H45M');
    });
    it('beregner riktig ved 13.5%', () => {
        expect(getRedusertArbeidstidSomISODuration(40, 13.5)).toEqual('PT5H24M');
        expect(getRedusertArbeidstidSomISODuration(30, 13.5)).toEqual('PT4H3M');
        expect(getRedusertArbeidstidSomISODuration(37.5, 13.5)).toEqual('PT5H4M');
    });
});
