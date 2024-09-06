import { appendScript } from './appendScript';

export function isMetrikaScriptLoaded() {
    return Boolean(window.Ya?.Metrika2);
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
