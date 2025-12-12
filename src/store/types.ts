export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type ThemeMode = 'light' | 'dark';
export type LayoutDirection = 'ltr' | 'rtl';

export interface LayoutState {
  sidebarCollapsed: boolean;
  direction: LayoutDirection;
}

export interface AppState {
  auth: AuthState;
  theme: ThemeMode;
  layout: LayoutState;
}

export type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: ThemeMode }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'TOGGLE_DIRECTION' }
  | { type: 'SET_DIRECTION'; payload: LayoutDirection };
