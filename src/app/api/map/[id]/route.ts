import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/services/mongodb';
import { mapPoiSchema, type MapPOI } from '@/lib/schemas/content';
import { getToken } from 'next-auth/jwt';
import { ObjectId } from 'mongodb';

// GET /api/map/[id] - Fetch single map POI by custom id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collection = await getCollection<MapPOI>('map_pois');
    const poi = await collection.findOne({ _id: new ObjectId(id) });

    if (!poi) {
      return NextResponse.json(
        { success: false, error: 'Map POI not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: poi });
  } catch (error) {
    console.error('Error fetching map POI:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch map POI', data: error },
      { status: 500 }
    );
  }
}

// PUT /api/map/[id] - Update map POI (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = mapPoiSchema.parse(body);

    const collection = await getCollection<MapPOI>('map_pois');
    const result = await collection.updateOne(
      { id },
      { $set: validated }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Map POI not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: validated });
  } catch (error: any) {
    console.error('Error updating map POI:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update map POI' },
      { status: 400 }
    );
  }
}

// DELETE /api/map/[id] - Delete map POI (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const collection = await getCollection<MapPOI>('map_pois');
    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Map POI not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Map POI deleted' });
  } catch (error) {
    console.error('Error deleting map POI:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete map POI' },
      { status: 500 }
    );
  }
}

