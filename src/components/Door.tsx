import React, {useMemo, useRef, useEffect} from "react"
import {cubeFrom2Points} from '../functions/trigFunctions'
import * as THREE from 'three'

import {fragment, vertex} from '../shaders/windowShader'
interface Door {
    id: string
    depth: number
    height: number
    hingeX: number
    hingeY: number
    label: string
    latchX: number
    latchY: number
    direction: number
}


const Door: React.FC<Door> = ({id, depth, height, hingeX, hingeY, label, latchX, latchY} : Door) => {

    const positionsMemo = useMemo(() => {
        return cubeFrom2Points(hingeX, latchX, hingeY, latchY, 0.0, height, 0.3)
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

    const bufferRef = useRef<any>()

    useEffect(() => {
        bufferRef.current.computeVertexNormals()
    }, [meshIndices])


    const uniforms = useMemo(() => {
        return {
            uCentroid: {
                value: [0,0,0]
            }
        }
    }, [])

    
    return (
        <mesh >
            <bufferGeometry ref={bufferRef}>
            <bufferAttribute
                    attach='attributes-position'
                    array={positionsMemo}
                    count={positionsMemo.length / 3}
                    itemSize={3}
            />
            <bufferAttribute
                    attach='index'
                    array={meshIndices}
                    count={meshIndices.length}
                    itemSize={1}
            />
            </bufferGeometry>
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms}
                
                alpha={true}
            />
        </mesh>
    )
}


export default Door