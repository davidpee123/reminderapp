// app/api/push/route.ts
import { connectToDatabase } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const sub = await req.json();
  if (!sub || !sub.endpoint) return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
  const { db } = await connectToDatabase();
  await db.collection('push_subscriptions').updateOne(
    { 'subscription.endpoint': sub.endpoint },
    { $set: { subscription: sub, updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true }, { status: 201 });
}
