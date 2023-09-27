import React from "react"
import Wall from "./Wall"
import Location from "./Location"
interface Level {
    id: string
    locations: Array<any>
    magicplan_uid: string
    walls: Array<Wall>
    index: number
}


const Level: React.FC<Level> = ({id, locations, magicplan_uid, walls, index} : Level) => {

    const wd = id;
    return (
        <group position={[0,index* 3, 0]}>
        
        {
            
            walls.map((wall) => {
                
                return (
                    <Wall
                    key={wall.id}
                    id={wall.id}
                    x1={wall.x1}
                    x2={wall.x2}
                    y1={wall.y1}
                    y2={wall.y2}
                    height={wall.height}
                    thickness={0.1}
                    type={wall.type}
                    />
                )
            })
        }

        {
            locations.map((location) => {
                
                return ( <Location
                key={location.id}
                id={location.id}
                label={location.label}
                magicPlanUid={location.magicplan_uid}
                boundary={location.boundary}
                doors={location.doors}
                windows={location.windows}
                />
                )
                
            })
        }
        </group>
    )
}

export default Level