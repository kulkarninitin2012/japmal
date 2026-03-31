import prisma from '@/lib/prisma';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const users = await prisma.user.findMany({
    orderBy: { totalCount: 'desc' }
  });

  return <AdminClient initialUsers={users} />;
}
