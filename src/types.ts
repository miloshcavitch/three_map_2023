interface Level {
    id: string
    locations: Array<any>
    magicplan_uid: string
    walls: Array<Wall>
}

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