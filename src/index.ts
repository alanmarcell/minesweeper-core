export * from './Battle';
export * from './IBattle';
export * from './Field';
export * from './IField';
export * from './IPosition';
import LogFile from 'ptz-log-file';

const log = LogFile({ dir: './logs' });

export { log };
