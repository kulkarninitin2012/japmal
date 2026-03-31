import prisma from '@/lib/prisma';
import AddClient from './AddClient';

export const revalidate = 10; 

export default async function AddCount() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc'
    }
  });

  return <AddClient initialUsers={users} />;
}
