import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/services/mongodb';
import { carouselItemSchema, type CarouselItem } from '@/lib/schemas/content';
import { getToken } from 'next-auth/jwt';
import { ObjectId } from 'mongodb';

// GET /api/timeline/[id] - Fetch single timeline item
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getCollection<CarouselItem>('timeline_items');
    const item = await collection.findOne({ _id: new ObjectId(params.id) } as any);
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Timeline item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching timeline item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timeline item' },
      { status: 500 }
    );
  }
}

// PUT /api/timeline/[id] - Update timeline item (admin only)
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
    const validated = carouselItemSchema.parse(body);
    
    const collection = await getCollection<CarouselItem>('timeline_items');
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) } as any,
      { $set: validated }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Timeline item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: validated });
  } catch (error: any) {
    console.error('Error updating timeline item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update timeline item' },
      { status: 400 }
    );
  }
}

// DELETE /api/timeline/[id] - Delete timeline item (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const collection = await getCollection<CarouselItem>('timeline_items');
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) } as any);
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Timeline item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Timeline item deleted' });
  } catch (error) {
    console.error('Error deleting timeline item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete timeline item' },
      { status: 500 }
    );
  }
}

