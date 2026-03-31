import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, count, date } = await req.json();

    if (!userId || typeof userId !== 'number' || !count || typeof count !== 'number' || count <= 0) {
      return NextResponse.json({ error: 'Invalid input. Please complete the form properly.' }, { status: 400 });
    }
    
    if (count > 1000000) {
      return NextResponse.json({ error: 'Count too high for a single entry' }, { status: 400 });
    }

    // Date Validation
    let entryDate = new Date();
    if (date) {
       const parsedDate = new Date(date);
       if (isNaN(parsedDate.getTime())) {
          return NextResponse.json({ error: 'Invalid date format provided.' }, { status: 400 });
       }
       
       // Compare to current mid-night to allow today's precise timestamp
       const now = new Date();
       if (parsedDate > now) {
          return NextResponse.json({ error: 'Cannot add जपमाळ for a future date.' }, { status: 400 });
       }
       entryDate = parsedDate;
    }

    // Verify user exists and update
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return NextResponse.json({ error: 'User does not exist. Only Admin can create new users.' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { totalCount: { increment: count } }
    });

    const entry = await prisma.entry.create({
      data: {
        count,
        userId: updatedUser.id,
        date: entryDate
      }
    });

    return NextResponse.json({ success: true, data: { user: updatedUser, entry } });
  } catch (error) {
    console.error('Error adding count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
