"use client";
import React, { ReactNode, Suspense } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import App from "@/App";
import { store, persistor } from "@/store";
import Loading from "@/components/layouts/loading";
import { useGlobalLoader } from "@/hooks";

interface IProps {
  children?: ReactNode;
}

const queryClient = new QueryClient();

const ProviderComponent = ({ children }: IProps) => {
  const { showLoader } = useGlobalLoader();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Loading />}>
            <App>{children} </App>
          </Suspense>
        </PersistGate>
      </Provider>
      {showLoader ? <Loading /> : null}
    </QueryClientProvider>
  );
};

export default ProviderComponent;
// todo
// export default appWithI18Next(ProviderComponent, ni18nConfig);
