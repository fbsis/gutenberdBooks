import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import BookSearch from './components/BookSearch';
import { BookProvider } from './contexts/BookContext';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BookProvider>
        <div className="min-h-screen w-screen overflow-x-hidden bg-gray-100">
          <Header />
          <main className="w-full px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <BookSearch />
            </div>
          </main>
        </div>
      </BookProvider>
    </QueryClientProvider>
  );
};

export default App;
