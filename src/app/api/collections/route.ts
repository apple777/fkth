import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/services/mongodb';
import { collectionSchema, type Collection } from '@/lib/schemas/content';
import { getToken } from 'next-auth/jwt';

// GET /api/collections - Fetch all collections
export async function GET(req: NextRequest) {
  try {
    const collection = await getCollection<Collection>('collections');
    const collections = await collection.find({}).toArray();
    return NextResponse.json({ success: true, data: collections });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}

// POST /api/collections - Create new collection (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = collectionSchema.parse(body);
    
    const collection = await getCollection<Collection>('collections');
    const result = await collection.insertOne(validated as any);
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...validated } 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating collection:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create collection' },
      { status: 400 }
    );
  }
}

