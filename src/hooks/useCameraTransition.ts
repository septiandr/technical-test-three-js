import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface TransitionTarget {
  position: THREE.Vector3
  target: THREE.Vector3
}

export function useCameraTransition() {
  const { camera, controls } = useThree()
  const targetRef = useRef<TransitionTarget | null>(null)
  const isAnimating = useRef(false)

  useFrame(() => {
    if (!isAnimating.current || !targetRef.current || !controls) return

    const { position, target } = targetRef.current

    camera.position.lerp(position, 0.08)

    const ctrl = controls as any
    if (ctrl.target) {
      ctrl.target.lerp(target, 0.08)
      ctrl.update()
    }

    if (camera.position.distanceTo(position) < 0.01) {
      camera.position.copy(position)
      if (ctrl.target) {
        ctrl.target.copy(target)
        ctrl.update()
      }
      isAnimating.current = false
      targetRef.current = null
    }
  })

  const moveTo = (target: TransitionTarget) => {
    targetRef.current = target
    isAnimating.current = true
  }

  return { moveTo }
}
