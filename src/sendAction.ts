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

// https://yandex.ru/support/metrica/objects/method-reference.html

// ym(XXXXXX, 'init', { clickmap: false });
export function sendAction(id: number, methodName: 'init', options?: YaMetrika2Options): void;

// ym(XXXXXX, 'addFileExtension' 'lzh');
export function sendAction(id: number, methodName: 'addFileExtension', extension: string | string[]): void;

// ym(XXXXXX, 'extLink', 'https://yandex.com');
export function sendAction(id: number, methodName: 'extLink', url: string, options?: YaMetrika2ExtLinkOptions): void;

// ym(XXXXXX, 'file', url[, options]);
export function sendAction(id: number, methodName: 'file', url: string,  options?: YaMetrika2FileOptions): void;

// ym(XXXXXX, 'firstPartyParams', parameters);
export function sendAction(id: number, methodName: 'firstPartyParams', params: YaMetrika2FirstPartyParamsParams): void;

// ym(XXXXXX, 'notBounce', [options]);
export function sendAction(id: number, methodName: 'notBounce', options?: YaMetrika2NotBounceOptions): void;

// ym(XXXXXX, 'getClientID', function(clientID) { });
export function sendAction(id: number, methodName: 'getClientID', callback: (clientID: string) => void): void;

// ym(XXXXXX, 'setUserID', "12345");
export function sendAction(id: number, methodName: 'setUserID', userId: string): void;

// ym(XXXXXX, 'hit', [url[, options]])
export function sendAction(id: number, methodName: 'hit', url?: string, options?: YaMetrika2HitOptions): void;

// ym(XXXXXX, 'params', parameters);
export function sendAction(id: number, methodName: 'params', params: any): void;

// ym(XXXXXX, 'reachGoal', target[, params[, callback[, ctx]]]);
export function sendAction(
    id: number,
    methodName: 'reachGoal',
    target: string,
    params?: any,
    callback?: () => void,
    ctx?: any
): void;

// ym(XXXXXX, 'userParams', parameters);
export function sendAction(id: number, methodName: 'userParams', params: any): void;

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
