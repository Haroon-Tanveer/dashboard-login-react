import  { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import {
  Grid,
  List,
  Upload,
  File,
  Image,
  FileText,
  Film,
  MoreVertical,
  Download,
  Trash2,
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'other';
  size: string;
  modified: string;
  thumbnail?: string;
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'project-mockup.png',
    type: 'image',
    size: '2.4 MB',
    modified: '2024-01-15',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '2',
    name: 'presentation.pdf',
    type: 'document',
    size: '5.1 MB',
    modified: '2024-01-14',
  },
  {
    id: '3',
    name: 'demo-video.mp4',
    type: 'video',
    size: '24.8 MB',
    modified: '2024-01-13',
  },
  {
    id: '4',
    name: 'banner-design.jpg',
    type: 'image',
    size: '1.8 MB',
    modified: '2024-01-12',
    thumbnail: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '5',
    name: 'report-2024.docx',
    type: 'document',
    size: '856 KB',
    modified: '2024-01-11',
  },
  {
    id: '6',
    name: 'tutorial.mp4',
    type: 'video',
    size: '18.2 MB',
    modified: '2024-01-10',
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <Image className="w-8 h-8 text-blue-500" />;
    case 'document':
      return <FileText className="w-8 h-8 text-red-500" />;
    case 'video':
      return <Film className="w-8 h-8 text-purple-500" />;
    default:
      return <File className="w-8 h-8 text-secondary-500" />;
  }
};

export function FileManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            File Manager
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage and organize your files
          </p>
        </div>
        <div className="flex gap-3 mt-10">
          <div className="flex bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-l-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-secondary-600 hover:bg-secondary-50 dark:text-secondary-400 dark:hover:bg-secondary-700'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-r-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-secondary-600 hover:bg-secondary-50 dark:text-secondary-400 dark:hover:bg-secondary-700'
              }`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <Button leftIcon={<Upload className="w-5 h-5" />}>Upload</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">12</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">Images</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">8</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">Documents</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">5</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">Videos</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">2.4 GB</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">Used</div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Recent Files
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="aspect-square bg-secondary-100 dark:bg-secondary-800 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {file.thumbnail ? (
                      <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getFileIcon(file.type)
                    )}
                  </div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-medium text-secondary-900 dark:text-white truncate flex-1">
                      {file.name}
                    </h3>
                    <button className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200 flex-shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-secondary-600 dark:text-secondary-400">
                    {file.size} • {file.modified}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                        {file.name}
                      </h3>
                      <p className="text-xs text-secondary-600 dark:text-secondary-400">
                        {file.size} • {file.modified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-secondary-600 hover:text-red-600 dark:text-secondary-400 dark:hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
