import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./AppRoute.tsx";
import Auth0ProviderWrapper from "./auth/Auth0Provider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from 'react-redux'
import { store } from "./store/store.tsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWrapper>
        <Provider store={store}>
          <AppRoute />
        </Provider>
        <Toaster visibleToasts={1} position="bottom-right" richColors={true} />
      </Auth0ProviderWrapper>
    </QueryClientProvider>
  </Router>
);
