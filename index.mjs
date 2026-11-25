import { testRunner } from '@cairul/plugin-kit/runner';
import adapter from './run.mjs';
import { playwright, junit, testPlugin } from '@cairul/plugin-kit/reports';

const reports = testPlugin('playwright.passed', { json: playwright, junit });

export default testRunner(reports, 'playwright.run', adapter);
