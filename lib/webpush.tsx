// lib/webpush.ts
import webpush from 'web-push';

const publicKey = process.env.VAPID_PUBLIC || '';
const privateKey = process.env.VAPID_PRIVATE || '';

if (publicKey && privateKey) {
  webpush.setVapidDetails('mailto:you@example.com', publicKey, privateKey);
} else {
  console.warn('VAPID keys not set. Push will not work until VAPID_PUBLIC and VAPID_PRIVATE are provided.');
}

export async function sendPush(subscription: any, payload: any) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { ok: true };
  } catch (err) {
    console.error('webpush error', err);
    return { ok: false, error: err };
  }
}
