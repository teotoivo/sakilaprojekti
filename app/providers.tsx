"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { QueryClientProvider, QueryClient } from "react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
