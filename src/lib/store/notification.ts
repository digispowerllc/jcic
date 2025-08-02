import { writable } from 'svelte/store';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    message: string;
    type: NotificationType;
    duration?: number;
}

const notificationStore = writable<Notification | null>(null);

export const notify = (message: string, type: NotificationType = 'info', duration = 4000) => {
    notificationStore.set({ message, type, duration });
};

export const notifySuccess = (msg: string, duration?: number) => notify(msg, 'success', duration);
export const notifyError = (msg: string, duration?: number) => notify(msg, 'error', duration);
export const notifyInfo = (msg: string, duration?: number) => notify(msg, 'info', duration);
export const notifyWarning = (msg: string, duration?: number) => notify(msg, 'warning', duration);

export default notificationStore;

// Function to clear the notification
export const clearNotification = () => {
    notificationStore.set(null);
};