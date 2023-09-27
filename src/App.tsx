import { useState, useEffect } from 'react'
import Scene from './components/Scene'
import './App.css'
import LocationsDOM from './components/LocationsDOM'
import floor_plan from './floor_plan.json'


import { RecoilRoot } from 'recoil'
function App() {


  return (
    <div className='app'>
      <RecoilRoot>
      <Scene/>
      {
      floor_plan.levels !== undefined ? floor_plan.levels.map((level, index) => {
        return <LocationsDOM level={level} key={level.id} floorHeight={index * 3}/>
      }) : ''
    }
      </RecoilRoot>
    </div>
  )
}

export default App
