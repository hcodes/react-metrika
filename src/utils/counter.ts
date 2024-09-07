const metrikaCounterIds: Record<number, boolean | undefined> = {};

export function getMetrikaCounterIds(): number[] {
    return Object.keys(metrikaCounterIds).map(id => Number(id));
}

export function hasMetrikaCounter(id: number): boolean {
    return Boolean(window[getMetrikaCounterName(id)]);
}

export function getMetrikaCounter(id: number): YaMetrika2 | undefined {
    return window[getMetrikaCounterName(id)];
}

export function getMetrikaCounterName(id: number): `yaCounter${string}` {
    return `yaCounter${id}`;
}

export function destructMetrikaCounter(id: number) {
    delete metrikaCounterIds[id];
    delete window[getMetrikaCounterName(id)];
}

export function initMetrikaCounter(id: number, options?: YaMetrika2Options): YaMetrika2 {
    let counter = getMetrikaCounter(id);
    if (counter) {
        return counter;
    }

    counter = new window.Ya.Metrika2({
        ...options,
        id,
    });

    metrikaCounterIds[id] = true;

    window[getMetrikaCounterName(id)] = counter;

    return counter;
}
