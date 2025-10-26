import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/services/mongodb';
import { mapPoiSchema, type MapPOI } from '@/lib/schemas/content';
import { getToken } from 'next-auth/jwt';

// GET /api/map - Fetch all map POIs
export async function GET(req: NextRequest) {
  try {
    const collection = await getCollection<MapPOI>('map_pois');
    const pois = await collection.find({}).toArray();
    return NextResponse.json({ success: true, data: pois });
  } catch (error) {
    console.error('Error fetching map POIs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch map POIs' },
      { status: 500 }
    );
  }
}

// POST /api/map - Create new map POI (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = mapPoiSchema.parse(body);
    
    const collection = await getCollection<MapPOI>('map_pois');
    const result = await collection.insertOne(validated as any);
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...validated } 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating map POI:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create map POI' },
      { status: 400 }
    );
  }
}

