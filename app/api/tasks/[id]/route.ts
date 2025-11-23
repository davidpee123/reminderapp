// app/api/tasks/[id]/route.ts
import { connectToDatabase } from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const { db } = await connectToDatabase();
  const doc = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
  return NextResponse.json(doc);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const updates = await req.json();
  updates.updatedAt = new Date();
  if (updates.dueAt) updates.dueAt = new Date(updates.dueAt);
  const { db } = await connectToDatabase();
  await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, { $set: updates });
  const doc = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
  return NextResponse.json(doc);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  const { db } = await connectToDatabase();
  await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
  return new NextResponse(null, { status: 204 });
}
