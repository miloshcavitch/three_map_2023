import React, {useEffect, useMemo} from 'react'
import {cameraTargetAtom, centroidsAtom} from '../atoms.d.ts'
import { useRecoilState } from 'recoil'
import {mean} from '../functions/trigFunctions.js'


const LocationsDOM = ({level, floorHeight}) => {

    const [cameraTargetState, setCameraTargetState] = useRecoilState(cameraTargetAtom)
    const [centroidsState, setCentroidsState] = useRecoilState(centroidsAtom)

    
    
    const handleClick = (element) => {
        centroidData.forEach((cD) => {
            if (cD.label === element.target.innerHTML){
                setCameraTargetState(cD.centroid)
                return true
            }
        })
    }

    const centroidData = useMemo(() => {
        const array = []
        
        level.locations.forEach((location) => {
           
            const x = []
            const y = []
            location.boundary.points.forEach((p) => {
                x.push(p.x)
                y.push(p.y)
            })

            const xAverage =  mean(x)
            const yAverage = mean(y)
            
            const object = {label: location.label, centroid: [-xAverage, -floorHeight, -yAverage]}
            array.push(object)
        })

        
        return array
    }, [])

    useEffect(() => {
        setCentroidsState(centroidData)
    }, [centroidData])

    return (
        <div className="text-over-canvas">
        
        {
            level.locations.map((location) => {
                
                return <button key={location.id} onClick={handleClick}>{location.label}</button>
            })
        }
        </div>
    )
}

export default LocationsDOM