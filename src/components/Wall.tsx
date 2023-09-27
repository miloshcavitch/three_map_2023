import { useThree } from '@react-three/fiber'
import React, {useEffect, useMemo, useRef} from 'react'
import * as THREE from 'three'
import {cubeFrom2Points} from '../functions/trigFunctions'

import {fragment, vertex} from '../shaders/wallShader'

import { cameraTargetAtom } from '../atoms.d.ts'
import { useRecoilValue } from 'recoil'
enum WallType {
    UNKNOWN,
    INTERIOR,
    EXTERIOR
}

interface Wall {
    id: string
    x1: number
    x2: number
    y1: number
    y2: number
    height: number
    thickness: number
    type: WallType 
}

const Wall: React.FC<Wall> = ({id, x1, x2, y1, y2, height, thickness, type}: Wall) => {

    

    

    const cameraTargetState = useRecoilValue(cameraTargetAtom)
    
    const meshPositions = useMemo(() => {
        //IMPORTANT!!
        //all buffer geometry components need to switch the y and z axis!
        //CAD and other 3d programs use z axis as 'up', browsers use y! (reason being z-index)
        //const offset = getPerpendicular(x1, x2, y1, y2, thickness)

        const p1 = new THREE.Vector2(x1,y1)
        const p2 = new THREE.Vector2(x2,y2)
        
        return cubeFrom2Points(x1,x2,y1,y2,0.0,height,thickness)
    }, [])

    const meshIndices = useMemo(() => {
        
        return new Uint32Array([
            
            0, 1, 2, 0, 2, 3, // Front
            1, 5, 6, 1, 6, 2, // Right
            5, 4, 7, 5, 7, 6, // Back
            4, 0, 3, 4, 3, 7, // Left
            3, 2, 6, 3, 6, 7, // Top
            4, 5, 1, 4, 1, 0, // Bottom
            

        ])
    }, [])

    const bottomWall = useMemo(() => {

        return new Float32Array([
            1.0,0.0,0.0,1.0,
            1.0,0.0,0.0,1.0
        ])

    }, [])

    const bufferRef = useRef<any>()
    const materialRef = useRef<any>()

    useEffect(() => {
        bufferRef.current.computeVertexNormals()
        
    }, [meshIndices, meshPositions])


    const {camera} = useThree()
    
    const uniforms = useMemo(() => ({
        
        uCentroid: {
            value: cameraTargetState
        }
    }), [cameraTargetState])
    


    return (
        <mesh >
            <bufferGeometry ref={bufferRef}>
            <bufferAttribute
                    attach='attributes-position'
                    array={meshPositions}
                    count={meshPositions.length / 3}
                    itemSize={3}
            />
            <bufferAttribute
                    attach='index'
                    array={meshIndices}
                    count={meshIndices.length}
                    itemSize={1}
            />
            <bufferAttribute
                    attach='attributes-bottom'
                    array={bottomWall}
                    count={bottomWall.length}
                    itemSize={1}
            />
            </bufferGeometry>
            <shaderMaterial
            ref={materialRef}
            fragmentShader={fragment}
            vertexShader={vertex}
            uniforms={uniforms}
            alpha={true}
            transparent={true}
            />
            {/*
            <meshNormalMaterial side={THREE.FrontSide}/>
            */}
            
        </mesh>
    )
}


export default Wall