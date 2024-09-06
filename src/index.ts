export * from './components';
export * from './consts';

export { loadMetrikaScript, isMetrikaScriptLoaded } from './utils/loadMetrikaScript';
export { sendAction as ym, setMetrikaScriptUrl } from './sendAction';
export { clearDelayedBuffer } from './utils/delayedActionBuffer';
