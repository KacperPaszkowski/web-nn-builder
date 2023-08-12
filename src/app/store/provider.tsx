import { createContext, useContext } from 'react';
import { RFState } from '../types';
import { StoreApi, UseBoundStore } from 'zustand';

export const StoreContext = createContext<UseBoundStore<StoreApi<RFState>> | undefined>(undefined);
