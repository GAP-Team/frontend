"use client";
import { useRef } from "react";
import dynamic from 'next/dynamic';
import { Provider } from "react-redux";
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { makeStore, AppStore, persistor } from "./store";

const DynamicPersistGate = dynamic(() => import('redux-persist/integration/react').then(mod => mod.PersistGate), {
  ssr: false, // Prevent server-side rendering
});

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <DynamicPersistGate loading={null} persistor={persistor}>
        {children}
      </DynamicPersistGate>
    </Provider>
  );
}
