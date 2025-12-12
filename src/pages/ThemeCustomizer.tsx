import   { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useApp } from '../store/AppContext';

const primaryColors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
];

const fontOptions = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
];

const spacingOptions = [
  { name: 'Compact', value: '0.75' },
  { name: 'Normal', value: '1' },
  { name: 'Comfortable', value: '1.25' },
  { name: 'Spacious', value: '1.5' },
];

export function ThemeCustomizer() {
  const { state, toggleTheme } = useApp();
  const [selectedColor, setSelectedColor] = useState(primaryColors[0].value);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);
  const [selectedSpacing, setSelectedSpacing] = useState('1');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Theme Customizer
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Customize the look and feel of your dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                    Primary Color
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {primaryColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`aspect-square rounded-lg transition-all ${
                          selectedColor === color.value
                            ? 'ring-2 ring-offset-2 ring-secondary-900 dark:ring-white scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                    Theme Mode
                  </label>
                  <div className="flex gap-3">
                    <Button
                      variant={state.theme === 'light' ? 'primary' : 'outline'}
                      onClick={() => state.theme === 'dark' && toggleTheme()}
                    >
                      Light Mode
                    </Button>
                    <Button
                      variant={state.theme === 'dark' ? 'primary' : 'outline'}
                      onClick={() => state.theme === 'light' && toggleTheme()}
                    >
                      Dark Mode
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                  Font Family
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fontOptions.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => setSelectedFont(font.value)}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        selectedFont === font.value
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300'
                      }`}
                      style={{ fontFamily: font.value }}
                    >
                      <div className="font-semibold mb-1">{font.name}</div>
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">
                        The quick brown fox
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spacing</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                  Component Spacing
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {spacingOptions.map((spacing) => (
                    <button
                      key={spacing.value}
                      onClick={() => setSelectedSpacing(spacing.value)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedSpacing === spacing.value
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-medium">{spacing.name}</div>
                      <div className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                        {spacing.value}x
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline">Reset to Default</Button>
            <Button>Apply Changes</Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: selectedColor, color: 'white' }}
                >
                  <h3 className="font-semibold mb-2" style={{ fontFamily: selectedFont }}>
                    Primary Button
                  </h3>
                  <p className="text-sm opacity-90" style={{ fontFamily: selectedFont }}>
                    This is how your primary color will look
                  </p>
                </div>

                <div className="p-4 bg-secondary-100 dark:bg-secondary-800 rounded-lg">
                  <h3
                    className="font-semibold mb-2 text-secondary-900 dark:text-white"
                    style={{ fontFamily: selectedFont }}
                  >
                    Sample Card
                  </h3>
                  <p
                    className="text-sm text-secondary-600 dark:text-secondary-400"
                    style={{ fontFamily: selectedFont }}
                  >
                    This is how your content will appear with the selected typography
                  </p>
                </div>

                <div className="space-y-2">
                  <div
                    className="p-3 bg-white dark:bg-secondary-800 rounded border border-secondary-200 dark:border-secondary-700"
                    style={{ fontFamily: selectedFont }}
                  >
                    Item with {spacingOptions.find((s) => s.value === selectedSpacing)?.name} spacing
                  </div>
                  <div
                    className="p-3 bg-white dark:bg-secondary-800 rounded border border-secondary-200 dark:border-secondary-700"
                    style={{ fontFamily: selectedFont }}
                  >
                    Another item
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
