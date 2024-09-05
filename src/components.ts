import { sendAction } from './sendAction';

export interface MetrikaCounterProps {
    id: string;
    options?: Record<string, any>;
}

export function MetrikaCounter(props: MetrikaCounterProps): null {
    if (typeof window === 'undefined') {
        return null;
    }

    sendAction(props.id, 'init', props.options || {});

    return null;
}

export interface MetrikaCountersProps {
    ids: string[];
    options?: Record<string, any>;
}

export function MetrikaCounters(props: MetrikaCountersProps): null {
    if (typeof window === 'undefined') {
        return null;
    }

    props.ids.forEach(id => sendAction(id, 'init', props.options || {}));

    return null;
}
