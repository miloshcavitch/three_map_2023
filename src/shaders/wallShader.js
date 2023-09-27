export const vertex =`
uniform vec3 uCentroid;
attribute float bottom;
varying vec3 vNormal;
varying vec4 vPosition;

varying float vBottom;

varying vec3 vCameraPosition;
void main() {

    vNormal = normal;
    vBottom = bottom;
    vCameraPosition = cameraPosition;


    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    vPosition = modelPosition;
    gl_Position = projectedPosition;
  }
`


export const fragment =`

varying vec3 vNormal;
varying vec4 vPosition;
varying vec3 vCameraPosition;


varying float vBottom;
uniform vec3 colorOne;
uniform vec3 colorTwo;

uniform vec3 uCentroid;

void main() {

    vec3 direction = vec3(0.5,0.5,0.5);

    float dotDirection = 0.5 * (1.0 + dot( direction, vNormal ) );

    float dotDirection2 = clamp( 0.5 * (1.0 + dot(vPosition, vec4(vNormal, 1.0)) ), 0.0, 1.0);


    float lerpValue = dotDirection - (0.2 * vBottom * vBottom );


    vec3 cameraToCentroid = normalize( vCameraPosition - (uCentroid) );
    vec3 centroidToPosition = normalize( vec3(vPosition.xyz) - uCentroid  );

    float angleDot = 0.5 * (1.0 + dot(cameraToCentroid, centroidToPosition) );

    float alphaValue = ( clamp( angleDot * angleDot, 0.05, 0.95 ));
    //gl_FragColor = vec4(vec3(1.0 - ( clamp( angleDot * angleDot, 0.05, 0.95 )) ), 1.0);

    gl_FragColor = vec4(vec3( lerpValue ), 0.8 - (alphaValue * 0.4 ) );
    //gl_FragColor = vec4(uCentroid * -1.0, 1.0);
  }
`