import { METRIKA_SCRIPT_URL_DEFAULT } from './consts';
import {
    getCounter,
    initCounter,
} from './utils/counter';
import {
    isMetrikaScriptLoaded,
    loadMetrikaScript,
} from './utils/loadMetrikaScript';
import {
    addActionToDelayedBuffer,
    executeAllActions,
} from './utils/delayedActionBuffer';

let isMetrikaScriptLoading = false;
let metrikaScriptUrl = METRIKA_SCRIPT_URL_DEFAULT;

export function setMetrikaScriptUrl(url: string) {
    metrikaScriptUrl = url;
}

export const sendAction = (counterId: string, methodName: string, ...args: any[]) => {
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

function sendActionWithLoadedMetrika(counterId: string, methodName: string, ...args: any[]) {
    const counter = getCounter(counterId);
    if (counter) {
        if (methodName === 'init') {
            return;
        }

        try {
            counter[methodName].apply(counter, args);
        } catch(e) {
            console.error(e);
        }
    } else {
        if (methodName === 'init') {
            initCounter(counterId, args[2]);
        }
    }
}
