'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import Graph from './components/Graph';


export default function Home() {
  return (
    <div
      className='w-screen h-screen bg-background'
    >
      <Graph />
    </div>

  )
}
