import prisma from '@/lib/prisma';
import HomeClient from './HomeClient';

export const revalidate = 60; // optionally cache for 60 seconds

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch directly from database, zero API overhead
  const globalTotalAgg = await prisma.user.aggregate({
    _sum: { totalCount: true }
  });
  const globalTotal = globalTotalAgg._sum.totalCount || 0;

  return <HomeClient initialGlobalCount={globalTotal} />;
}
