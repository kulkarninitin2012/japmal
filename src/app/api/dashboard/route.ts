import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { totalCount: 'desc' },
      take: 100, // Limit leaderboard to top 100
    });

    const globalTotalAgg = await prisma.user.aggregate({
      _sum: { totalCount: true }
    });
    
    const globalTotal = globalTotalAgg._sum.totalCount || 0;

    // Get the last 30 days of entries grouped by date for the chart
    // We'll fetch the recent entries and group them in memory for cross-database compatibility easily
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentEntries = await prisma.entry.findMany({
      where: { date: { gte: thirtyDaysAgo } },
      orderBy: { date: 'asc' },
    });

    // Group by date string YYYY-MM-DD
    const chartDataMap = new Map<string, number>();
    recentEntries.forEach(entry => {
      const dateStr = entry.date.toISOString().split('T')[0];
      chartDataMap.set(dateStr, (chartDataMap.get(dateStr) || 0) + entry.count);
    });

    const chartData = Array.from(chartDataMap.entries()).map(([date, count]) => ({
      date,
      count
    }));

    return NextResponse.json({ users, globalTotal, chartData });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
