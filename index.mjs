import { testRunner } from '@cairul/pdk/runner';
import adapter from './run.mjs';
import { playwright, junit, testPlugin } from '@cairul/pdk/reports';

const reports = testPlugin('playwright.passed', { json: playwright, junit });

export default testRunner(reports, 'playwright.run', adapter);
