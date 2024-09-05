export function appendScript(src: string): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.crossOrigin = 'anonymous';
        script.onload = resolve;
        script.onerror = (error: Event | string) => {
            document.head.removeChild(script);
            reject(error);
        }

        document.head.appendChild(script);
    });
}
