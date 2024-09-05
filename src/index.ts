export * from './components';
export * from './consts';

export { loadMetrikaScript, isMetrikaScriptLoaded } from './utils/counter';
export { sendAction as ym, setMetrikaScriptUrl } from './sendAction';
export { clearDelayedBuffer } from './utils/delayedActionBuffer';
