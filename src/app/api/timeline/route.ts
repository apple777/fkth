import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/services/mongodb';
import { carouselItemSchema, type CarouselItem } from '@/lib/schemas/content';
import { getToken } from 'next-auth/jwt';

// GET /api/timeline - Fetch all timeline items
export async function GET(req: NextRequest) {
  try {
    const collection = await getCollection<CarouselItem>('timeline_items');
    const items = await collection.find({}).sort({ id: 1 }).toArray();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching timeline items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timeline items' },
      { status: 500 }
    );
  }
}

// POST /api/timeline - Create new timeline item (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = carouselItemSchema.parse(body);
    
    const collection = await getCollection<CarouselItem>('timeline_items');
    const result = await collection.insertOne(validated as any);
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...validated } 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating timeline item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create timeline item' },
      { status: 400 }
    );
  }
}

