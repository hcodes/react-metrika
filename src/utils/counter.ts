export function hasCounter(id: string | number) {
    return Boolean(window[getCounterName(id)]);
}

export function getCounter(id: string | number) {
    return window[getCounterName(id)];
}

export function getCounterName(id: string | number): `yaCounter${string}` {
    return `yaCounter${id}`;
}

export function initCounter(id: string | number, options?: YaMetrika2Options) {
    let counter = getCounter(id);
    if (counter) {
        return counter;
    }

    counter = new window.Ya.Metrika2({
        ...options,
        id,
    });

    window[getCounterName(id)] = counter;

    return counter;
}
