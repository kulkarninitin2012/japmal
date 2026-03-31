import prisma from '@/lib/prisma';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const users = await prisma.user.findMany({
    orderBy: { totalCount: 'desc' },
    take: 100,
  });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentEntries = await prisma.entry.findMany({
    where: { date: { gte: thirtyDaysAgo } },
    orderBy: { date: 'asc' },
  });

  const chartDataMap = new Map<string, number>();
  recentEntries.forEach((entry: { date: Date, count: number }) => {
    const dateStr = entry.date.toISOString().split('T')[0];
    chartDataMap.set(dateStr, (chartDataMap.get(dateStr) || 0) + entry.count);
  });

  const chartData = Array.from(chartDataMap.entries()).map(([date, count]) => ({
    date,
    count
  }));

  return <DashboardClient users={users} chartData={chartData} />;
}
