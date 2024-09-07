import { METRIKA_SCRIPT_URL_DEFAULT } from './consts';
import {
    isMetrikaScriptLoaded,
    loadMetrikaScript,
    getMetrikaCounter,
    initMetrikaCounter,
    addActionToDelayedBuffer,
    executeAllActions,
    destructMetrikaCounter,
} from './utils';

let isMetrikaScriptLoading = false;
let metrikaScriptUrl = METRIKA_SCRIPT_URL_DEFAULT;

export function setMetrikaScriptUrl(url: string) {
    metrikaScriptUrl = url;
}

export function sendAction(counterId: number, methodName: string, ...args: any[]) {
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

function sendActionWithLoadedMetrika(counterId: number, methodName: string, ...args: any[]) {
    const counter = getMetrikaCounter(counterId);
    if (counter) {
        if (methodName === 'init') {
            return counter;
        }

        try {
            return counter[methodName].apply(counter, args);
        } catch(e) {
            console.error(e);
        }

        if (methodName === 'destruct') {
            destructMetrikaCounter(counterId);
        }        
    } else {
        if (methodName === 'init') {
            return initMetrikaCounter(counterId, args[0]);
        }
    }

    return undefined;
}
