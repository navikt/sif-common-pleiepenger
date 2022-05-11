import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import * as stories from '../../../../../storybook/stories/ArbeidstidPeriodeForm.stories';

const { Default } = composeStories(stories);

describe('<ArbeidstidPeriodeForm>', () => {
    it('Rendrer', () => {
        render(<Default />);
        expect(screen.getByText('Fra og med')).toBeInTheDocument();
    });
});
