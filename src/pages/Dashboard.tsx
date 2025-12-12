import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Chart } from '../components/Chart';
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const userGrowthData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 180 },
  { name: 'Mar', value: 250 },
  { name: 'Apr', value: 320 },
  { name: 'May', value: 450 },
  { name: 'Jun', value: 580 },
  { name: 'Jul', value: 720 },
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Food', value: 20 },
  { name: 'Books', value: 12 },
  { name: 'Other', value: 8 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">{value}</h3>
          <p
            className={`text-sm mt-2 flex items-center gap-1 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            {change}
          </p>
        </div>
        <div
          className={`p-4 rounded-full ${
            trend === 'up' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
          }`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          change="+12.5%"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          trend="up"
        />
        <StatCard
          title="Total Users"
          value="2,845"
          change="+8.2%"
          icon={<Users className="w-6 h-6 text-green-600" />}
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value="1,423"
          change="+23.1%"
          icon={<ShoppingCart className="w-6 h-6 text-green-600" />}
          trend="up"
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          change="-2.4%"
          icon={<TrendingUp className="w-6 h-6 text-red-600" />}
          trend="down"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={revenueData} type="line" dataKey="value" xKey="name" height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={userGrowthData} type="bar" dataKey="value" xKey="name" height={300} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'created a new project', time: '2 hours ago' },
                { user: 'Jane Smith', action: 'updated customer profile', time: '4 hours ago' },
                { user: 'Mike Johnson', action: 'completed transaction #1234', time: '6 hours ago' },
                { user: 'Sarah Williams', action: 'uploaded new files', time: '8 hours ago' },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-secondary-200 dark:border-secondary-700 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-secondary-900 dark:text-white">
                      {activity.user}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-secondary-500 dark:text-secondary-500">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={categoryData} type="pie" dataKey="value" xKey="name" height={300} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
