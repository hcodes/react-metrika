import { sendAction, setMetrikaScriptUrl } from './sendAction';

export interface MetrikaCounterProps {
    id: number;
    options?: YaMetrika2Options;
    scriptUrl?: string;
}

export function MetrikaCounter(props: MetrikaCounterProps): null {
    if (typeof window === 'undefined') {
        return null;
    }

    if (typeof props.scriptUrl !== 'undefined') {
        setMetrikaScriptUrl(props.scriptUrl);
    }

    sendAction(props.id, 'init', props.options || {});

    return null;
}

export interface MetrikaCountersProps {
    ids: number[];
    options?: YaMetrika2Options;
    scriptUrl?: string;
}

export function MetrikaCounters(props: MetrikaCountersProps): null {
    if (typeof window === 'undefined') {
        return null;
    }

    if (typeof props.scriptUrl !== 'undefined') {
        setMetrikaScriptUrl(props.scriptUrl);
    }

    props.ids.forEach(id => sendAction(id, 'init', props.options || {}));

    return null;
}
