import React from 'react';

// Utility types for common patterns
export type ReactComponent<P = {}> = React.ComponentType<P>;

export type ReactFC<P = {}> = React.FC<P>;

export type ReactRef<T> = React.RefObject<T>;

export type ReactEventHandler<T = Element> = React.EventHandler<React.SyntheticEvent<T>>;

export type ReactChangeEvent<T = Element> = React.ChangeEvent<{ value: unknown } & T>;

export type ReactKeyboardEvent<T = Element> = React.KeyboardEvent<T>;

export type ReactMouseEvent<T = Element> = React.MouseEvent<T>;

export type ReactFocusEvent<T = Element> = React.FocusEvent<T>;

// Common prop types
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface ClickableProps extends BaseProps {
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
}

export interface FormFieldProps extends BaseProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// API response helpers
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiSuccess<T> {
  data: T;
  message?: string;
  status: number;
}

export type ApiResult<T> = ApiSuccess<T> | ApiError;

// Form helpers
export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormState<T = FormData> {
  data: T;
  errors: FormErrors;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// Event handlers
export type EventHandler<T = Event> = (event: T) => void;

export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// State helpers
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type StateUpdater<T> = (prev: T) => T;

// Ref helpers
export type RefCallback<T> = (instance: T | null) => void;

// Component helpers
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

export type ForwardedRef<T> = React.ForwardedRef<T>;

// Hook helpers
export type HookReturn<T> = T extends (...args: any[]) => infer R ? R : never;

// Utility functions
export const isApiError = (result: any): result is ApiError => {
  return result && typeof result.message === 'string' && !result.data;
};

export const isApiSuccess = <T>(result: any): result is ApiSuccess<T> => {
  return result && result.data !== undefined;
};

// Type guards
export const isString = (value: any): value is string => typeof value === 'string';

export const isNumber = (value: any): value is number => typeof value === 'number';

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export const isObject = (value: any): value is object => typeof value === 'object' && value !== null;

export const isArray = (value: any): value is any[] => Array.isArray(value);

export const isFunction = (value: any): value is Function => typeof value === 'function';

// Optional chaining helpers
export const safeGet = <T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined => {
  return obj?.[key];
};

export const safeCall = <T extends any[], R>(fn: ((...args: T) => R) | null | undefined, ...args: T): R | undefined => {
  return fn?.(...args);
};

// Array helpers
export const mapWithIndex = <T, R>(array: T[], mapper: (item: T, index: number) => R): R[] => {
  return array.map(mapper);
};

export const filterWithIndex = <T>(array: T[], predicate: (item: T, index: number) => boolean): T[] => {
  return array.filter(predicate);
};

// Object helpers
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}; 