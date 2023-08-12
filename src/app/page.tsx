'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { createStore } from './store/store'
import Graph from './components/Graph'
import { StoreContext } from './store/provider'
import { AiOutlinePlus } from 'react-icons/ai'
import { RFState } from './types'
import { StoreApi, UseBoundStore } from 'zustand'
import { v4 as uuidv4 } from 'uuid'


interface storeContainer {
  store: UseBoundStore<StoreApi<RFState>>
  name: string
}

export default function Home() {
  const [stores, setStores] = useState<storeContainer[]>([{ store: createStore(), name: "main" }]);
  const [view, setView] = useState<string>("main");

  return (
    <div
      className='w-screen h-screen bg-background'
    >
      <div
        className='flex flex-row gap-0.5 text-white w-full h-10 absolute top-0 bg-background bg-node z-10'
      >
        {stores.map((store: storeContainer) => (
          <div
            key={store.name}
            className={`flex items-center justify-center text-sm text-${view == store.name ? 'blue-500' : 'gray-500'} w-24 h-full bg-background bg-node-header hover:bg-node cursor-pointer`}
            onClick={() => setView(store.name)}
          >
            {store.name}
          </div>
        ))}

        <AiOutlinePlus
          onClick={() => setStores((prev) => [...prev, { store: createStore(), name: "new " + stores.length }])}
          className="h-10 w-10 p-2 text-blue-500"
        />
      </div>

      {stores.map((store: storeContainer) => {
        if (store.name == view) {
          return (
            <StoreContext.Provider key={store.name} value={store.store}>
              <Graph />
            </StoreContext.Provider>
          )
        }
      })}
    </div>

  )
}
