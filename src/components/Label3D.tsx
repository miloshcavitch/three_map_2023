import { Center, Text } from "@react-three/drei"
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import robotoBlack from '../assets/Roboto_Black_Regular.json'
import React, {useEffect, useRef} from "react"
import { extend } from "@react-three/fiber"
import {fragment, vertex} from '../shaders/windowShader'
extend({TextGeometry})

interface Label3D {
    centroid: any
    text: string
}
const Label3D: React.FC<Label3D> = ({centroid, text}: Label3D) => {

    const font = new FontLoader().parse(robotoBlack)

    return (
        <group position={centroid} rotation={[0,10,0]}>
        <mesh  rotation={[5, 0, 0]}>
            <textGeometry args={[text, {font, size: 0.2, height: 0.02}]}/>
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                alpha={true}
            />
        </mesh>
        </group>
        
        
    )
}


export default Label3D