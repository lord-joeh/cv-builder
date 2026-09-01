import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge basic class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should merge tailwind classes properly overriding previous ones', () => {
    expect(cn('bg-red-500 p-4', 'bg-blue-500')).toBe('p-4 bg-blue-500');
    expect(cn('text-sm font-bold', 'text-lg')).toBe('font-bold text-lg');
  });

  it('should handle conditional classes using objects', () => {
    expect(cn('base-class', { 'active-class': true, 'inactive-class': false })).toBe('base-class active-class');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('should ignore null, undefined, and boolean values', () => {
    expect(cn('class1', null, undefined, true, false, 'class2')).toBe('class1 class2');
  });

  it('should handle complex combinations', () => {
    expect(
      cn(
        'p-4 bg-red-500',
        ['flex', 'items-center'],
        { 'text-white': true, 'text-black': false },
        'bg-blue-500',
        null,
        undefined
      )
    ).toBe('p-4 flex items-center text-white bg-blue-500');
  });
});
