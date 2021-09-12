class EventBus{
    listeners:{
        [key: string]: Array<(...args: []) => void>;
    }
    
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: () => unknown): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: () => unknown): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: string, ...args: []) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}

export const eventBus = new EventBus();
