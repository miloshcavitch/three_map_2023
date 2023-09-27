export const vertex =`

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
  }
`


export const fragment =`
void main() {
    gl_FragColor = vec4(vec3(0.6), 0.1);
  }
`