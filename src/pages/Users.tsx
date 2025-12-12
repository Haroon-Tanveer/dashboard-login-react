import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Table, Column } from '../components/Table';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Modal } from '../components/Modal';
import { UserPlus, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'inactive', joinDate: '2023-03-10' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'Manager', status: 'active', joinDate: '2023-04-05' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'active', joinDate: '2023-05-12' },
  { id: '6', name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'active', joinDate: '2023-06-18' },
  { id: '7', name: 'David Wilson', email: 'david@example.com', role: 'Admin', status: 'active', joinDate: '2023-07-22' },
  { id: '8', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'User', status: 'inactive', joinDate: '2023-08-30' },
  { id: '9', name: 'James Taylor', email: 'james@example.com', role: 'Manager', status: 'active', joinDate: '2023-09-14' },
  { id: '10', name: 'Maria Garcia', email: 'maria@example.com', role: 'User', status: 'active', joinDate: '2023-10-01' },
  { id: '11', name: 'Robert Martinez', email: 'robert@example.com', role: 'User', status: 'active', joinDate: '2023-11-08' },
  { id: '12', name: 'Patricia Lee', email: 'patricia@example.com', role: 'Admin', status: 'active', joinDate: '2023-12-03' },
];

export function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, roleFilter]);

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
          {String(value)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Users</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your user accounts and permissions
          </p>
        </div>
        <Button leftIcon={<UserPlus className="w-5 h-5" />} onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'Admin', label: 'Admin' },
                { value: 'Manager', label: 'Manager' },
                { value: 'User', label: 'User' },
              ]}
              className="md:w-48"
            />
          </div>
        </CardHeader>
        <CardContent padding="none">
          <Table data={filteredUsers} columns={columns} itemsPerPage={10} />
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
        <form className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email Address" type="email" placeholder="john@example.com" />
          <Select
            label="Role"
            options={[
              { value: 'user', label: 'User' },
              { value: 'manager', label: 'Manager' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Add User</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
