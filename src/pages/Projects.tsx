import   { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Plus, MoreVertical } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Design new landing page', description: 'Create mockups for homepage', assignee: 'John', priority: 'high' },
      { id: '2', title: 'Update documentation', description: 'Add API examples', assignee: 'Sarah', priority: 'low' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Build user dashboard', description: 'Implement analytics widgets', assignee: 'Mike', priority: 'high' },
      { id: '4', title: 'Fix login bug', description: 'Resolve authentication issue', assignee: 'Jane', priority: 'medium' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: '5', title: 'Test payment flow', description: 'QA testing for checkout', assignee: 'Tom', priority: 'high' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '6', title: 'Setup CI/CD pipeline', description: 'Configure automated deployment', assignee: 'Emily', priority: 'medium' },
      { id: '7', title: 'Database optimization', description: 'Improve query performance', assignee: 'David', priority: 'low' },
    ],
  },
];

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const handleDeleteTask = (taskId: string) => {
  setColumns(prev =>
    prev.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId),
    }))
  );
};


export function Projects() {
 const [columns, setColumns] = useState<Column[]>(initialColumns);

   const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Projects</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Track your team's progress with a Kanban board
          </p>
        </div>
        <div  ><Button className="mt-10 ml-4" leftIcon={<Plus className="w-5 h-5" />}>Add Task</Button></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                {column.title}
                <span className="ml-2 text-sm text-secondary-500 dark:text-secondary-400">
                  ({column.tasks.length})
                </span>
              </h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 flex-1">
              {column.tasks.map((task) => (
                <Card key={task.id} padding="sm" hover className="cursor-move">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-secondary-900 dark:text-white">
                      {task.title}
                    </h3>
                    <button className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200">
                      

                      <div className="relative inline-block">
     <button
  onClick={() =>
    setOpenTaskId(openTaskId === task.id ? null : task.id)
  }
  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
>
  <MoreVertical className="w-4 h-4" />
</button>


      {openTaskId === task.id && (
  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow z-10">
    <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
      Edit
    </button>
   <button
  onClick={() => {
    handleDeleteTask(task.id);
    setOpenTaskId(null);
  }}
  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
>
  Delete
</button>
  </div>
)}
    </div>
                    </button>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {task.assignee[0]}
                      </div>
                      <span className="text-xs text-secondary-600 dark:text-secondary-400">
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
