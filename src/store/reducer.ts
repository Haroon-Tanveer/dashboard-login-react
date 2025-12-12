import { AppState, AppAction } from './types';

export const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  layout: {
    sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
    direction: (localStorage.getItem('direction') as 'ltr' | 'rtl') || 'ltr',
  },
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: {
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: false,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: action.payload,
        },
      };
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return {
        ...state,
        theme: newTheme,
      };
    }
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return {
        ...state,
        theme: action.payload,
      };
    case 'TOGGLE_SIDEBAR': {
      const collapsed = !state.layout.sidebarCollapsed;
      localStorage.setItem('sidebarCollapsed', String(collapsed));
      return {
        ...state,
        layout: {
          ...state.layout,
          sidebarCollapsed: collapsed,
        },
      };
    }
    case 'SET_SIDEBAR':
      localStorage.setItem('sidebarCollapsed', String(action.payload));
      return {
        ...state,
        layout: {
          ...state.layout,
          sidebarCollapsed: action.payload,
        },
      };
    case 'TOGGLE_DIRECTION': {
      const newDirection = state.layout.direction === 'ltr' ? 'rtl' : 'ltr';
      localStorage.setItem('direction', newDirection);
      return {
        ...state,
        layout: {
          ...state.layout,
          direction: newDirection,
        },
      };
    }
    case 'SET_DIRECTION':
      localStorage.setItem('direction', action.payload);
      return {
        ...state,
        layout: {
          ...state.layout,
          direction: action.payload,
        },
      };
    default:
      return state;
  }
}
