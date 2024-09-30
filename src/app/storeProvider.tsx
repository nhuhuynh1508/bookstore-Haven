'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppStore, persistor, store } from '../lib/store'

export default function StoreProvider({children}: {
    children: React.ReactNode
    }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store;
    }
    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}