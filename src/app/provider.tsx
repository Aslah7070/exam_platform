"use client"

import {AuthHydrator} from '@/lib/redux/hooks/hydrator'
import { store } from '@/lib/redux/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

function Providers({children}: { children: React.ReactNode }) {
    const [client]=useState(()=>new QueryClient())
  return (
    <Provider store={store}>
        <QueryClientProvider client={client}>
            <ToastContainer/>
            <AuthHydrator/>
            {/** Hydrator is used to rehydrate the auth state from cookies */}
      {children}
      </QueryClientProvider>
    </Provider>
  )
}

export default Providers
