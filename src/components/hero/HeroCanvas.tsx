'use client'
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Particle field shaders ────────────────────────────── */
const VERT_PARTICLES = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  varying float vAlpha;
  uniform float uTime;

  void main() {
    vAlpha = aAlpha;
    vec3 pos = position;
    pos.y += sin(uTime * 0.4 + position.x * 0.5) * 0.06;
    pos.x += cos(uTime * 0.3 + position.z * 0.4) * 0.04;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (280.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`
const FRAG_PARTICLES = /* glsl */ `
  varying float vAlpha;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float a = vAlpha * (1.0 - d * 1.8);
    gl_FragColor = vec4(0.0, 0.831, 1.0, a);
  }
`

/* ─── Icosphere shaders ─────────────────────────────────── */
const VERT_ICO = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  uniform float uScroll;
  uniform float uTime;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 displaced = position;
    displaced += normal * (sin(uTime * 0.6 + position.y * 4.0) * 0.035);
    displaced += normal * uScroll * 0.5;

    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vViewPos = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`
const FRAG_ICO = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  uniform float uScroll;
  uniform float uTime;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewPos);
    float fresnel = pow(1.0 - abs(dot(n, v)), 2.8);

    float t = uScroll + sin(uTime * 0.25) * 0.12;
    vec3 arc    = vec3(0.0, 0.831, 1.0);
    vec3 plasma = vec3(0.482, 0.184, 0.969);
    vec3 col    = mix(arc, plasma, clamp(t, 0.0, 1.0));

    float alpha = (fresnel * 0.88 + 0.06) * (1.0 - uScroll * 0.9);
    gl_FragColor = vec4(col, alpha);
  }
`

/* ─── Particle component ────────────────────────────────── */
const COUNT = 1400

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const { geo, mat } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)
    const alphas    = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(Math.random() * 2 - 1)
      const r     = 2.2 + Math.random() * 7.5
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i]  = Math.random() * 2.2 + 0.4
      alphas[i] = Math.random() * 0.55 + 0.08
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))
    g.setAttribute('aAlpha',   new THREE.BufferAttribute(alphas, 1))

    const m = new THREE.ShaderMaterial({
      vertexShader:   VERT_PARTICLES,
      fragmentShader: FRAG_PARTICLES,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    })
    return { geo: g, mat: m }
  }, [])

  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.04
      ref.current.rotation.x = clock.elapsedTime * 0.018
    }
  })

  return <points ref={ref} geometry={geo} material={mat} />
}

/* ─── Icosphere component ───────────────────────────────── */
function IcoSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader:   VERT_ICO,
        fragmentShader: FRAG_ICO,
        uniforms: {
          uScroll: { value: 0 },
          uTime:   { value: 0 },
        },
        transparent: true,
        wireframe:   true,
        side:        THREE.DoubleSide,
      }),
    [],
  )

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#hero',
      start:   'top top',
      end:     'bottom top',
      onUpdate: self => { mat.uniforms.uScroll.value = self.progress },
    })
    return () => st.kill()
  }, [mat])

  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.14
      meshRef.current.rotation.z = clock.elapsedTime * 0.07
    }
  })

  return (
    <mesh ref={meshRef} material={mat}>
      <icosahedronGeometry args={[1.45, 3]} />
    </mesh>
  )
}

/* ─── Scene ─────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <Particles />
      <IcoSphere />
    </>
  )
}

/* ─── Export ─────────────────────────────────────────────── */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ background: 'transparent', position: 'absolute', inset: 0 }}
    >
      <Scene />
    </Canvas>
  )
}
