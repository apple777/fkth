import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/services/mongodb';
import { collectionSchema, type Collection } from '@/lib/schemas/content';
import { getToken } from 'next-auth/jwt';

// GET /api/collections/[id] - Fetch single collection by collection_id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getCollection<Collection>('collections');
    const item = await collection.findOne({ collection_id: params.id });
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}

// PUT /api/collections/[id] - Update collection (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = collectionSchema.parse(body);
    
    const collection = await getCollection<Collection>('collections');
    const result = await collection.updateOne(
      { collection_id: params.id },
      { $set: validated }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: validated });
  } catch (error: any) {
    console.error('Error updating collection:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update collection' },
      { status: 400 }
    );
  }
}

// DELETE /api/collections/[id] - Delete collection (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const collection = await getCollection<Collection>('collections');
    const result = await collection.deleteOne({ collection_id: params.id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Collection deleted' });
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete collection' },
      { status: 500 }
    );
  }
}

