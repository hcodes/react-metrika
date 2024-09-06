let delayedBuffer: any[][] = [];

export function clearDelayedBuffer() {
    delayedBuffer = [];
}

export function addActionToDelayedBuffer(...args: any[]) {
    delayedBuffer.push(args);
}

export function executeAllActions(callback: (...args: any[]) => void) {
    delayedBuffer.forEach(item => callback.apply(null, item));
    clearDelayedBuffer();
}
