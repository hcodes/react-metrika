let delayedBuffer: Record<string, any[]> = {};

export function clearDelayedBuffer() {
    delayedBuffer = {};
}

export function addActionToDelayedBuffer(...args: any[]) {
    const id = args[0];
    if (!delayedBuffer[id]) {
        delayedBuffer[id] = [];
    }

    delayedBuffer[id].push(args);
}

export function executeActionsFromDelayedBuffer(id: string, callback: (...args: any[]) => void) {
    if (!id || !delayedBuffer[id] || !delayedBuffer[id].length) {
        return;
    }

    delayedBuffer[id].forEach(item => callback.apply(null, item));

    delete delayedBuffer[id];
}

export function executeAllActions(callback: (...args: any[]) => void) {
    Object.keys(delayedBuffer).forEach(id => executeActionsFromDelayedBuffer(id, callback));
    clearDelayedBuffer();
}
