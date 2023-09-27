import React, {useMemo} from "react"
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { extend } from "@react-three/fiber";
import * as THREE from 'three'

import BoundaryLabels from "./BoundaryLabels";
import Window from "./Window";
import Door from './Door'
interface Boundary {
    id: string
    points: Array<any>
}



interface Location {
    id: string
    label: string
    magicPlanUid: string
    boundary: Boundary
    doors: Array<any>
    windows: Array<any>
    
}


const Location: React.FC<Location> = ({id, label, magicPlanUid, boundary, doors, windows} : Location) => {

    
    return (
        <group>

            <BoundaryLabels/>
            {
                windows !== undefined ? windows.map((window) => {
                    return (
                        <Window key={window.id}
                        id={window.id}
                        distanceFromFloor={window.distanceFromFloor}
                        height={window.height}
                        label={window.label}
                        leftPosX={window.leftPositionX}
                        leftPosY={window.leftPositionY}
                        rightPosX={window.rightPositionX}
                        rightPosY={window.rightPositionY}
                        width={window.width}
                        />
                    )
                }) : ''
            }

            {
                doors !== undefined ? doors.map((door) => {
                    
                    return (
                        <Door 
                        key={door.id}
                        id={door.id}
                        depth={door.depth}
                        hingeX={door.hingePositionX}
                        hingeY={door.hingePositionY}
                        latchX={door.latchPositionX}
                        latchY={door.latchPositionY}
                        height={door.height}
                        label={door.label}
                        direction={door.direction}
                        />
                    )
                }) : ''
            }
        </group>
    )

}

export default Location