import  { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'deadline' | 'event';
}

const mockEvents: Event[] = [
  { id: '1', title: 'Team Meeting', date: new Date(2024, 0, 15, 10, 0), type: 'meeting' },
  { id: '2', title: 'Project Deadline', date: new Date(2024, 0, 18), type: 'deadline' },
  { id: '3', title: 'Client Presentation', date: new Date(2024, 0, 22, 14, 0), type: 'meeting' },
  { id: '4', title: 'Product Launch', date: new Date(2024, 0, 25), type: 'event' },
];

const eventColors = {
  meeting: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  deadline: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  event: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    return mockEvents.filter(
      (event) =>
        event.date.getFullYear() === year &&
        event.date.getMonth() === month &&
        event.date.getDate() === day
    );
  };

  const today = new Date();
  const isToday = (day: number) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Calendar</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your schedule and events
          </p>
        </div>
        <div className="mt-10">
        <Button leftIcon={<Plus className="w-5 h-5" />}>Add Event</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {monthNames[month]} {year}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={previousMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-secondary-600 dark:text-secondary-400 py-2"
                >
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }
                const events = getEventsForDay(day);
                return (
                  <div
                    key={day}
                    className={`aspect-square border border-secondary-200 dark:border-secondary-700 rounded-lg p-2 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors cursor-pointer ${
                      isToday(day)
                        ? 'bg-primary-50 border-primary-500 dark:bg-primary-900/20'
                        : ''
                    }`}
                  >
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isToday(day)
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-secondary-900 dark:text-white'
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="text-xs px-1 py-0.5 rounded truncate bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-secondary-600 dark:text-secondary-400">
                          +{events.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockEvents
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-3 border border-secondary-200 dark:border-secondary-700 rounded-lg"
                  >
                    <div className={`text-xs font-medium mb-1 ${eventColors[event.type]}`}>
                      {event.type.toUpperCase()}
                    </div>
                    <h4 className="text-sm font-medium text-secondary-900 dark:text-white mb-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      {event.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {event.date.getHours() > 0 &&
                        ` at ${event.date.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}`}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
