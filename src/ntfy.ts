export async function sendNtfyNotification(ntfyUrl: string, message: string): Promise<void> {
    await fetch(ntfyUrl, {
        method: 'POST',
        body: message,
    });
}