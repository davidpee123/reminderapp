// app/api/tasks/route.ts
import { connectToDatabase } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const docs = await db.collection('tasks').find({}).sort({ dueAt: 1 }).toArray();
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.title || !body.dueAt) {
    return NextResponse.json({ error: 'title and dueAt required' }, { status: 400 });
  }
  const now = new Date();
  const doc = {
    title: body.title,
    description: body.description || '',
    category: body.category || 'Personal',
    dueAt: new Date(body.dueAt),
    remindBefore: Number(body.remindBefore) || 10,
    completed: false,
    recurrence: body.recurrence || null,
    snoozes: [],
    createdAt: now,
    updatedAt: now
  };
  const { db } = await connectToDatabase();
  const result = await db.collection('tasks').insertOne(doc);
  doc._id = result.insertedId;
  return NextResponse.json(doc, { status: 201 });
}
