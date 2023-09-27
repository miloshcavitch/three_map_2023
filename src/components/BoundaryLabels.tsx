import { centroidsAtom } from "../atoms.d.ts"
import { useRecoilValue } from "recoil"

import Label3D from './Label3D'
import { useEffect } from "react"

const BoundaryLabels = () => {

    const centroidsState = useRecoilValue(centroidsAtom)

    return (
        <group>
            {
                centroidsState.map((centroid, index) => {
                    const ray = centroid.centroid
                    return <Label3D key={`${index}label`} text={centroid.label} centroid={[(ray[0] * -1 ) , ray[1] * -1 , ray[2] * -1]}/>
                })
            }
        </group>
    )
}

export default BoundaryLabels