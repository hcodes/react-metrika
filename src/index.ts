export * from './components';
export * from './consts';

export { loadMetrikaScript, isMetrikaScriptLoaded } from './utils/loadMetrikaScript';
export { setMetrikaScriptUrl } from './sendAction';
export { clearDelayedBuffer } from './utils/delayedActionBuffer';

import { sendAction } from './sendAction';

export const ym = sendAction as any as Window['ym'];
