import { appendScript } from './appendScript';

export type MetrikaWindow = typeof globalThis & Window & Record<`yaCounter${string}`, any> & {
    Ya: {
        Metrika2: {
            new (id: string, options?: Record<string, any>): any;
        }
    }
};

export function hasCounter(id: string) {
    return Boolean((window as MetrikaWindow)[getCounterName(id)]);
}

export function getCounter(id: string) {
    return (window as MetrikaWindow)[getCounterName(id)];
}

export function getCounterName(id: string): `yaCounter${string}` {
    return `yaCounter${id}`;
}

export function initCounter(id: string, options?: Record<string, any>) {
    if (hasCounter(id)) {
        return;
    }

    (window as MetrikaWindow)[getCounterName(id)] = new (window as MetrikaWindow).Ya.Metrika2(id, options);
}

export function isMetrikaScriptLoaded() {
    return Boolean((window as MetrikaWindow).Ya?.Metrika2);
}

let loadPromise: Promise<Event> | undefined;

export function loadMetrikaScript(url: string, retriesCount = 3) {
    if (loadPromise) {
        return loadPromise;
    }

    loadPromise = new Promise<Event>((resolve, reject) => {
        function load(retriesLeft: number) {
            appendScript(url)
                .then((value) => {
                    if (isMetrikaScriptLoaded()) {
                        resolve(value);
                    } else {
                        loadPromise = undefined;

                        reject('Metrika script is loaded but "window.Ya" or "window.Ya.Metrika2" is missing');
                    }
                })
                .catch((error) => {
                    if (!retriesLeft) {
                        loadPromise = undefined;

                        reject(error);
                    } else {
                        window.setTimeout(() => {
                            load(retriesLeft - 1);
                        }, 2 ** (retriesCount - retriesLeft) * 1000);
                    }
                });
        }

        load(retriesCount);
    });

    return loadPromise;
}
