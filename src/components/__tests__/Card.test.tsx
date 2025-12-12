import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default padding', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-6');
  });

  it('applies small padding when specified', () => {
    const { container } = render(<Card padding="sm">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-4');
  });

  it('applies no padding when specified', () => {
    const { container } = render(<Card padding="none">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).not.toHaveClass('p-4');
    expect(card).not.toHaveClass('p-6');
    expect(card).not.toHaveClass('p-8');
  });

  it('applies hover styles when hover prop is true', () => {
    const { container } = render(<Card hover>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:shadow-lg');
  });

  it('renders with dark mode classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('dark:bg-secondary-800');
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(
      <CardHeader>
        <div>Header Content</div>
      </CardHeader>
    );
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('renders title text correctly', () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('applies correct heading styles', () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    const title = container.firstChild as HTMLElement;
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('font-semibold');
  });
});

describe('CardContent', () => {
  it('renders content correctly', () => {
    render(
      <CardContent>
        <p>Card body content</p>
      </CardContent>
    );
    expect(screen.getByText('Card body content')).toBeInTheDocument();
  });
});
