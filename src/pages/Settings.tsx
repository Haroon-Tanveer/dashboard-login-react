 
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import { useApp } from '../store/AppContext';

interface SettingsFormData {
  name: string;
  email: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
}

export function Settings() {
  const { state, toggleTheme, toggleDirection } = useApp();
  const { register, handleSubmit } = useForm<SettingsFormData>({
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      language: 'en',
      timezone: 'UTC',
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Settings</h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage your account settings and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input label="Full Name" {...register('name')} />
              <Input label="Email Address" type="email" {...register('email')} />
              <Input label="Current Password" type="password" placeholder="Enter current password" />
              <Input label="New Password" type="password" placeholder="Enter new password" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select
                label="Language"
                {...register('language')}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                  { value: 'de', label: 'German' },
                ]}
              />
              <Select
                label="Timezone"
                {...register('timezone')}
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'EST', label: 'Eastern Time' },
                  { value: 'PST', label: 'Pacific Time' },
                  { value: 'CET', label: 'Central European Time' },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Theme Mode
                </label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={state.theme === 'light' ? 'primary' : 'outline'}
                    onClick={() => state.theme === 'dark' && toggleTheme()}
                  >
                    Light
                  </Button>
                  <Button
                    type="button"
                    variant={state.theme === 'dark' ? 'primary' : 'outline'}
                    onClick={() => state.theme === 'light' && toggleTheme()}
                  >
                    Dark
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Direction
                </label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={state.layout.direction === 'ltr' ? 'primary' : 'outline'}
                    onClick={() => state.layout.direction === 'rtl' && toggleDirection()}
                  >
                    LTR
                  </Button>
                  <Button
                    type="button"
                    variant={state.layout.direction === 'rtl' ? 'primary' : 'outline'}
                    onClick={() => state.layout.direction === 'ltr' && toggleDirection()}
                  >
                    RTL
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Checkbox label="Email notifications" {...register('emailNotifications')} />
              <Checkbox label="Push notifications" {...register('pushNotifications')} />
              <Checkbox label="Weekly reports" {...register('weeklyReports')} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
