import { ym } from '.';
import { METRIKA_SCRIPT_URL_DEFAULT } from './consts';
import {
    isMetrikaScriptLoaded,
    loadMetrikaScript,
    getCounter,
    initCounter,
    addActionToDelayedBuffer,
    executeAllActions,
} from './utils';

let isMetrikaScriptLoading = false;
let metrikaScriptUrl = METRIKA_SCRIPT_URL_DEFAULT;

export function setMetrikaScriptUrl(url: string) {
    metrikaScriptUrl = url;
}

export function sendAction(counterId: string | number, methodName: string, ...args: any[]) {
    if (typeof window === 'undefined') {
        return;
    }

    if (isMetrikaScriptLoaded()) {
        sendActionWithLoadedMetrika(counterId, methodName, ...args);
        return;
    }

    addActionToDelayedBuffer(counterId, methodName, ...args);

    if (!isMetrikaScriptLoading) {
        loadMetrikaScript(metrikaScriptUrl)
            .then(() => executeAllActions(sendActionWithLoadedMetrika))
            .catch(error => {
                isMetrikaScriptLoading = false;
                console.error(error);
            });

        isMetrikaScriptLoading = true;
    }
};

function sendActionWithLoadedMetrika(counterId: string | number, methodName: string, ...args: any[]) {
    const counter = getCounter(counterId);
    if (counter) {
        if (methodName === 'init') {
            return counter;
        }

        try {
            return counter[methodName].apply(counter, args);
        } catch(e) {
            console.error(e);
        }
    } else {
        if (methodName === 'init') {
            return initCounter(counterId, args[0]);
        }
    }

    return undefined;
}
