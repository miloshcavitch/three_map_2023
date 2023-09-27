import * as THREE from 'three'

export function getPerpendicular2(x1, x2, y1, y2){

    /*
    const twoDeeConstructor = p1.sub(p2).toArray()


    const twodee = new THREE.Vector2(twoDeeConstructor[0], twoDeeConstructor[1])

    //twodee.normalize()
    //console.log(twodee.length())
    //twodee.rotateAround(new THREE.Vector2(0,0), Math.PI * 0.5)

    return twodee
    */

    const xD = x1-x2;
    const yD = y1-y2;

    const wallDirection = new THREE.Vector2(xD, yD)
    wallDirection.normalize()

    const xN = wallDirection.x
    const yN = wallDirection.y


    const perpendicular = {x: -yN, y: xN}

    return perpendicular
    //console.log(x1, x2, x1-x2)
}

export function getPerpendicular(x1,y1,x2,y2, scale){

    const nIV1 = normalize2d(x1,y1)//normalized initial values
    const nIV2 = normalize2d(x2, y2)
    
    const test = normalize2d(x1 - x2, y1 - y2)
    const slope = test.x / test.y
    const perpSlope = -1/slope;
/*
    const ex = -1 * ( x2- x1);
    const why = y2-y1;
*/
    const ex = -1 * (nIV2.x - nIV1.x)
    const why = nIV2.y - nIV1.y
    const normalized = normalize2d(ex, why)
    

    const scaled = scale2d(normalized, scale)
    return scaled
}


function normalize2d(x, y){
    
    const length = Math.sqrt(x * x + y * y)

    const scaledX = x / length
    const scaledY = y / length;

    return {x: scaledX, y: scaledY}
}

export function scale2d(xyObject, scale){
    
    return {x: xyObject.x * scale, y: xyObject.y * scale}
}


export function cubeFrom2Points(x1,x2,y1,y2,floorOffset,height,thickness){
    const p1 = new THREE.Vector2(x1,y1)
    const p2 = new THREE.Vector2(x2,y2)

    const perpDirection = getPerpendicular2(p1.x, p2.x, p1.y, p2.y)

    

    const x1In = p1.x + (perpDirection.x * thickness/2)
    const y1In = p1.y + (perpDirection.y * thickness/2)

    const x1Out = p1.x - (perpDirection.x * thickness/2)
    const y1Out = p1.y - (perpDirection.y * thickness/2)

    const x2In = p2.x + (perpDirection.x * thickness/2)
    const y2In = p2.y + (perpDirection.y * thickness/2)

    const x2Out = p2.x - (perpDirection.x * thickness/2)
    const y2Out = p2.y - (perpDirection.y * thickness/2)
    
    return new Float32Array([

        x1In, floorOffset, y1In,
        x1In, height + floorOffset, y1In,
        x2In, height + floorOffset, y2In,
        x2In, floorOffset, y2In,

        
        x1Out, floorOffset, y1Out,
        x1Out, height + floorOffset, y1Out,
        x2Out, height + floorOffset, y2Out,
        x2Out, floorOffset, y2Out,
    ])
}


export const mean = data => {
    if (data.length < 1) {
      return;
    }
    return data.reduce((prev, current) => prev + current) / data.length;
  };