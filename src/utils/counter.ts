export type MetrikaWindow = typeof globalThis & Window & Record<`yaCounter${string}`, any> & {
    Ya: {
        Metrika2: {
            new (id: string | Record<string, any>): any;
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
    let counter = getCounter(id);
    if (counter) {
        return counter;
    }

    counter = new (window as MetrikaWindow).Ya.Metrika2({
        ...options,
        id,
    });

    (window as MetrikaWindow)[getCounterName(id)] = counter;

    return counter;
}
