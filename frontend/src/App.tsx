import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { BookProvider } from './contexts/BookContext';
import { BookDetails } from './pages/BookDetails';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BookProvider>
        <BrowserRouter>
          <div className="min-h-screen w-screen overflow-x-hidden bg-gray-100">
            <Header />
            <main className="w-full p-2 sm:p-4 md:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/book/:id" element={<BookDetails />} />
                </Routes>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </BookProvider>
    </QueryClientProvider>
  );
};

export default App;
