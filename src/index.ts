export * from './components';
export * from './consts';

export { loadMetrikaScript, isMetrikaScriptLoaded } from './utils/loadMetrikaScript';
export * from './utils/counter';
export { setMetrikaScriptUrl } from './sendAction';
export { clearDelayedBuffer } from './utils/delayedActionBuffer';

import { sendAction } from './sendAction';

export const ym = sendAction as Window['ym'];
