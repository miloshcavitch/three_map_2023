import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';


  export const cameraTargetAtom = atom({
    key: 'cameraTargetAtom',
    default: [0,0,0]
  })

  export const centroidsAtom = atom({
    key: 'centroidsAtom',
    default: []
  })