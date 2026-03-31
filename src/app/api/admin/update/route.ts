import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const { id, totalCount } = await req.json();

    if (!id || typeof totalCount !== 'number') {
      return NextResponse.json({ error: 'Invalid inputs' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { totalCount }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, type } = await req.json();
    
    if (!id) {
       return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    if (type === 'user') {
      // Delete user and all entries
      await prisma.$transaction([
        prisma.entry.deleteMany({ where: { userId: id } }),
        prisma.user.delete({ where: { id } })
      ]);
      return NextResponse.json({ success: true });
    } else {
      // Just delete a specific entry
      await prisma.entry.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
