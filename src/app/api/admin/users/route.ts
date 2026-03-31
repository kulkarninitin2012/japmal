import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Valid name is required' }, { status: 400 });
    }

    const trimmedName = name.trim();

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { name: trimmedName } });
    if (existing) {
       return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name: trimmedName,
        totalCount: 0
      }
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
