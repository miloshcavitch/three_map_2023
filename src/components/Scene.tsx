import React, {useEffect, useState} from 'react'
import {Canvas, extend, useThree} from '@react-three/fiber'
import floor_plan from '../floor_plan.json'
import { OrbitControls } from '@react-three/drei'
import Wall from './Wall'
import Level from './Level'
import { Grid, Stats } from "@react-three/drei"
import * as THREE from 'three'
import { cameraTargetAtom } from '../atoms.d.ts'
import { useRecoilState } from 'recoil'


interface Level {
    id: string
    locations: Array<any>
    magicplan_uid: string
    walls: Array<Wall>
}



const Scene = () => {
  
  const [cameraTargetState, setCameraTargetState] = useRecoilState(cameraTargetAtom)

  const [floorPlan, setFloorPlan] = useState(floor_plan)





  return (
    <Canvas className='canvas'>
        <OrbitControls
        enablePan={false}
        target={[0,0,0]}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.4}
      />
      <Grid
      infiniteGrid
      cellColor={new THREE.Color(0.1,0.1,0.1)}
      sectionSize={100000}
      sectionColor={new THREE.Color(0,0,0)}
      fadeStrength={5}
      />
      
      <ambientLight/>
      <group position={cameraTargetState}>
      {
        
        floorPlan.levels !== undefined ? floorPlan.levels.map((level, idx) => {
        
           return <Level key={level.id} id={level.id}
           locations={level.locations}
           magicplan_uid={level.magicplanUid}
           walls={level.walls}
           index={idx}
           />
        }) : ''
      }
      </group>
      
      
    </Canvas>

  )
}


export default Scene