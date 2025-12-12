import { AppProvider } from './store/AppContext';
import { Router } from './routes/Router';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
