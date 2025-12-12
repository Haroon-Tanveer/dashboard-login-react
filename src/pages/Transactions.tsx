import   { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Table, Column } from '../components/Table';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Search, Download } from 'lucide-react';
import { Button } from '../components/Button';

interface Transaction {
  id: string;
  invoice: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', invoice: 'INV-001', customer: 'Acme Corp', amount: 1250.00, status: 'paid', date: '2024-01-15' },
  { id: '2', invoice: 'INV-002', customer: 'TechStart Inc', amount: 750.50, status: 'paid', date: '2024-01-14' },
  { id: '3', invoice: 'INV-003', customer: 'Global Solutions', amount: 2100.00, status: 'pending', date: '2024-01-13' },
  { id: '4', invoice: 'INV-004', customer: 'Digital Agency', amount: 890.25, status: 'paid', date: '2024-01-12' },
  { id: '5', invoice: 'INV-005', customer: 'Creative Studio', amount: 1500.00, status: 'failed', date: '2024-01-11' },
  { id: '6', invoice: 'INV-006', customer: 'Innovation Labs', amount: 3200.00, status: 'paid', date: '2024-01-10' },
  { id: '7', invoice: 'INV-007', customer: 'Smart Systems', amount: 675.00, status: 'pending', date: '2024-01-09' },
  { id: '8', invoice: 'INV-008', customer: 'Future Tech', amount: 1825.50, status: 'paid', date: '2024-01-08' },
  { id: '9', invoice: 'INV-009', customer: 'Cloud Services', amount: 950.00, status: 'paid', date: '2024-01-07' },
  { id: '10', invoice: 'INV-010', customer: 'Data Dynamics', amount: 1125.75, status: 'pending', date: '2024-01-06' },
];

export function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Transaction>[] = [
    {
      key: 'invoice',
      label: 'Invoice',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-primary-600 dark:text-primary-400">
          {String(value)}
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => (
        <span className="font-medium">${Number(value).toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const statusColors = {
          paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
          failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[value as keyof typeof statusColors]}`}>
            {String(value)}
          </span>
        );
      },
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Transactions
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            View and manage all your invoices and payments
          </p>
        </div>
        <Button leftIcon={<Download className="w-5 h-5" />} variant="outline">
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
              ${mockTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">Paid Invoices</p>
            <h3 className="text-2xl font-bold text-green-600">
              {mockTransactions.filter((t) => t.status === 'paid').length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-600">
              {mockTransactions.filter((t) => t.status === 'pending').length}
            </h3>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'paid', label: 'Paid' },
                { value: 'pending', label: 'Pending' },
                { value: 'failed', label: 'Failed' },
              ]}
              className="md:w-48"
            />
          </div>
        </CardHeader>
        <CardContent padding="none">
          <Table data={filteredTransactions} columns={columns} itemsPerPage={10} />
        </CardContent>
      </Card>
    </div>
  );
}
