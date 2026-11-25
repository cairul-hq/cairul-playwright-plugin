import { join } from 'node:path';
import {
  list,
  locations,
  lineLocations,
  option,
  repeat,
  report,
  requireExclusive,
  selectors,
  value,
} from '@cairul/pdk/runner';
import { playwright } from '@cairul/pdk/reports';

export default {
  command: ['playwright'],
  select: selectors({ files: list, locations: lineLocations, titlePattern: value, projects: list }),
  build(select, temp) {
    requireExclusive(select.files, select.locations);
    return {
      args: [
        'test',
        '--reporter=json',
        ...repeat('--project', select.projects),
        ...option('--grep', select.titlePattern),
        ...(select.files?.map((file) => file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) ?? locations(select.locations)),
      ],
      env: { PLAYWRIGHT_JSON_OUTPUT_FILE: join(temp, 'result.json'), PLAYWRIGHT_JSON_ONLY_FAILURES: '0' },
      read: report('result.json', playwright),
    };
  },
};
