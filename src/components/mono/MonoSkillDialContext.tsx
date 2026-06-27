'use client'

import {
  startTransition,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type WheelEvent as ReactWheelEvent,
  useEffect,
  useMemo,
  useId,
  useRef,
  useState,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './MonoSkillDialContext.module.css'

gsap.registerPlugin(ScrollTrigger)

const VIEW_WIDTH = 1000
const VIEW_HEIGHT = 520
const CENTER_X = VIEW_WIDTH / 2
const CENTER_Y = 468
const ARC_SPAN = 150
const CENTER_ANGLE = -90
const OUTER_RX = 388
const OUTER_RY = 326
const TICK_RX = 342
const TICK_RY = 288
const INNER_RX = 296
const INNER_RY = 250
const OUTER_STEP_ANGLE = 18
const INNER_STEP_ANGLE = 28
const OUTER_RING_MIN = 268
const OUTER_RING_MAX = 408
const TICK_RING_MIN = 248
const TICK_RING_MAX = 328
const INNER_RING_MIN = 196
const INNER_RING_MAX = 268
const SKILL_COUNT = 22
const CATEGORY_COUNT = 6
const FINE_TICKS = SKILL_COUNT * 11
const TARGET_SPRING = 0.16
const IDLE_SPRING = 0.2
const INERTIA_DAMPING = 0.6
const TARGET_VELOCITY_RETENTION = 0.18
const RELEASE_VELOCITY_CLAMP = 1.1
const WHEEL_VELOCITY_SCALE = 0.18

type UsageNote = {
  kind: string
  label: string
  detail: string
}

type DialCategory = {
  id: string
  label: string
  color: string
}

type DialSkill = {
  name: string
  level: number
  categoryId: string
  usage: UsageNote[]
}

const DIAL_CATEGORIES: DialCategory[] = [
  { id: 'languages', label: 'Languages', color: '#d97963' },
  { id: 'frameworks', label: 'Frameworks', color: '#7da57b' },
  { id: 'databases', label: 'Databases', color: '#c6a85d' },
  { id: 'messaging', label: 'Messaging', color: '#d68a73' },
  { id: 'infrastructure', label: 'Infra', color: '#7893c8' },
  { id: 'fundamentals', label: 'Fundamentals', color: '#a289c8' },
]

const DIAL_SKILLS: DialSkill[] = [
  {
    name: 'Java',
    level: 88,
    categoryId: 'languages',
    usage: [
      { kind: 'Company', label: 'Morgan Stanley', detail: 'core backend systems and platform work' },
      { kind: 'Project', label: 'Graphite', detail: 'service logic for the learning product' },
      { kind: 'College', label: 'GL Bajaj', detail: 'object-oriented foundation and practice' },
    ],
  },
  {
    name: 'C++',
    level: 80,
    categoryId: 'languages',
    usage: [
      { kind: 'College', label: 'GL Bajaj', detail: 'systems-style thinking and problem solving' },
      { kind: 'Prep', label: 'DSA practice', detail: 'performance-oriented implementation habits' },
      { kind: 'Event', label: 'Coding rounds', detail: 'fast reasoning under constraints' },
    ],
  },
  {
    name: 'Python',
    level: 82,
    categoryId: 'languages',
    usage: [
      { kind: 'Company', label: 'Crowe Horwath', detail: 'internal tools and business applications' },
      { kind: 'Project', label: 'ML Recommender', detail: 'recommendation engine workflows' },
      { kind: 'Project', label: 'Green-Space', detail: 'AI-assisted product experimentation' },
    ],
  },
  {
    name: 'JavaScript',
    level: 75,
    categoryId: 'languages',
    usage: [
      { kind: 'Project', label: 'Bathan.in', detail: 'storefront interactions and UI behavior' },
      { kind: 'Project', label: 'LegalBharat', detail: 'product-side interaction flows' },
      { kind: 'Project', label: 'Portfolio', detail: 'motion-led frontend experiments' },
    ],
  },
  {
    name: 'Spring Boot',
    level: 88,
    categoryId: 'frameworks',
    usage: [
      { kind: 'Company', label: 'Morgan Stanley', detail: 'production APIs and financial service layers' },
      { kind: 'Project', label: 'Graphite', detail: 'backend services and integration logic' },
      { kind: 'Company', label: 'Bounteous x Accolite', detail: 'delivery-oriented service work' },
    ],
  },
  {
    name: 'Flask',
    level: 78,
    categoryId: 'frameworks',
    usage: [
      { kind: 'Company', label: 'Crowe Horwath', detail: 'internal applications and admin tools' },
      { kind: 'Project', label: 'LegalBharat', detail: 'full-stack product delivery' },
      { kind: 'Project', label: 'ML Recommender', detail: 'thin service layer for model outputs' },
    ],
  },
  {
    name: 'React.js',
    level: 72,
    categoryId: 'frameworks',
    usage: [
      { kind: 'Project', label: 'Graphite', detail: 'frontend experience and analytics surface' },
      { kind: 'Project', label: 'Portfolio', detail: 'interaction-heavy personal showcase' },
      { kind: 'Practice', label: 'UI prototypes', detail: 'fast concept validation and iteration' },
    ],
  },
  {
    name: 'REST APIs',
    level: 90,
    categoryId: 'frameworks',
    usage: [
      { kind: 'Company', label: 'Morgan Stanley', detail: 'integration-friendly service contracts' },
      { kind: 'Company', label: 'Crowe Horwath', detail: 'internal app communication patterns' },
      { kind: 'Project', label: 'Kavach', detail: 'real-time monitoring endpoints' },
    ],
  },
  {
    name: 'SQLAlchemy',
    level: 75,
    categoryId: 'frameworks',
    usage: [
      { kind: 'Company', label: 'Crowe Horwath', detail: 'relational data modeling in Python apps' },
      { kind: 'Project', label: 'ML Recommender', detail: 'data access and persistence flows' },
      { kind: 'Practice', label: 'Internal tooling', detail: 'schema-backed admin workflows' },
    ],
  },
  {
    name: 'SQL',
    level: 82,
    categoryId: 'databases',
    usage: [
      { kind: 'Company', label: 'Morgan Stanley', detail: 'query reasoning across backend systems' },
      { kind: 'Company', label: 'Crowe Horwath', detail: 'data-heavy internal app flows' },
      { kind: 'Practice', label: 'Everyday backend work', detail: 'joins, filtering, and schema logic' },
    ],
  },
  {
    name: 'MySQL',
    level: 82,
    categoryId: 'databases',
    usage: [
      { kind: 'Project', label: 'Bathan.in', detail: 'product catalog, auth, and cart data' },
      { kind: 'Project', label: 'Kavach', detail: 'geofencing state and monitoring records' },
      { kind: 'Project', label: 'LegalBharat', detail: 'marketplace data and product logic' },
    ],
  },
  {
    name: 'MongoDB',
    level: 75,
    categoryId: 'databases',
    usage: [
      { kind: 'Practice', label: 'Flexible document flows', detail: 'quick iteration on evolving shapes' },
      { kind: 'Project', label: 'Backend experiments', detail: 'schemaless prototyping and storage' },
      { kind: 'Stack', label: 'Product builds', detail: 'non-relational persistence when needed' },
    ],
  },
  {
    name: 'Apache Kafka',
    level: 85,
    categoryId: 'messaging',
    usage: [
      { kind: 'Company', label: 'Morgan Stanley', detail: 'event-driven latency reduction at scale' },
      { kind: 'Stack', label: 'Backend architecture', detail: 'async pipelines and decoupled flows' },
      { kind: 'Impact', label: 'Production systems', detail: 'high-volume updates with stronger resilience' },
    ],
  },
  {
    name: 'Elasticsearch',
    level: 82,
    categoryId: 'messaging',
    usage: [
      { kind: 'Company', label: 'Morgan Stanley', detail: 'search for 10M+ products' },
      { kind: 'Stack', label: 'Retrieval systems', detail: 'indexing and query optimization' },
      { kind: 'Impact', label: 'Search relevance', detail: 'fast discovery across large datasets' },
    ],
  },
  {
    name: 'Docker',
    level: 72,
    categoryId: 'infrastructure',
    usage: [
      { kind: 'Stack', label: 'Local environments', detail: 'portable service packaging' },
      { kind: 'Project', label: 'Portfolio + side builds', detail: 'repeatable developer setup' },
      { kind: 'Delivery', label: 'Deployment handoff', detail: 'cleaner release workflows' },
    ],
  },
  {
    name: 'Linux',
    level: 80,
    categoryId: 'infrastructure',
    usage: [
      { kind: 'Company', label: 'Backend operations', detail: 'shell-first day-to-day development' },
      { kind: 'Stack', label: 'Server environments', detail: 'permissions, processes, and debugging' },
      { kind: 'Practice', label: 'Tooling workflows', detail: 'comfortable terminal-based iteration' },
    ],
  },
  {
    name: 'Git/GitHub',
    level: 88,
    categoryId: 'infrastructure',
    usage: [
      { kind: 'Company', label: 'Team delivery', detail: 'branching, review, and history hygiene' },
      { kind: 'Project', label: 'Personal portfolio', detail: 'iteration and version control discipline' },
      { kind: 'Collab', label: 'Cross-team work', detail: 'shared code ownership and review loops' },
    ],
  },
  {
    name: 'Postman',
    level: 82,
    categoryId: 'infrastructure',
    usage: [
      { kind: 'Company', label: 'API validation', detail: 'contract checks and manual debugging' },
      { kind: 'Project', label: 'Backend builds', detail: 'faster request-response iteration' },
      { kind: 'Practice', label: 'Integration flows', detail: 'tight feedback loops while shipping' },
    ],
  },
  {
    name: 'Microservices',
    level: 85,
    categoryId: 'infrastructure',
    usage: [
      { kind: 'Company', label: 'Morgan Stanley', detail: 'service boundaries in production systems' },
      { kind: 'Stack', label: 'Distributed design', detail: 'separation of concerns and scaling logic' },
      { kind: 'Practice', label: 'Backend architecture', detail: 'modular thinking for long-lived systems' },
    ],
  },
  {
    name: 'OOP',
    level: 90,
    categoryId: 'fundamentals',
    usage: [
      { kind: 'College', label: 'GL Bajaj', detail: 'core abstraction and modeling discipline' },
      { kind: 'Language', label: 'Java', detail: 'clean class design in backend systems' },
      { kind: 'Practice', label: 'Project architecture', detail: 'maintainable code organization' },
    ],
  },
  {
    name: 'DSA',
    level: 82,
    categoryId: 'fundamentals',
    usage: [
      { kind: 'College', label: 'Coursework', detail: 'algorithmic foundations and analysis' },
      { kind: 'Prep', label: 'Interview practice', detail: 'speed and clarity under constraints' },
      { kind: 'Stack', label: 'Daily reasoning', detail: 'better decisions on data flow and complexity' },
    ],
  },
  {
    name: 'Info Security',
    level: 78,
    categoryId: 'fundamentals',
    usage: [
      { kind: 'Company', label: 'Crowe Horwath', detail: 'vendor reviews and compliance analysis' },
      { kind: 'Standards', label: 'SOC2 / ISO / HITRUST', detail: 'security posture evaluation' },
      { kind: 'Practice', label: 'Engineering mindset', detail: 'risk-aware product decisions' },
    ],
  },
]

const CATEGORY_MAP = Object.fromEntries(
  DIAL_CATEGORIES.map((category, index) => [category.id, { index, color: category.color }])
) as Record<string, { index: number; color: string }>

const DIAL_SKILLS_WITH_CATEGORY = DIAL_SKILLS.map((skill, index) => ({
  ...skill,
  index,
  categoryIndex: CATEGORY_MAP[skill.categoryId].index,
  color: CATEGORY_MAP[skill.categoryId].color,
}))

const FIRST_SKILL_INDEX_BY_CATEGORY = DIAL_CATEGORIES.map(category => {
  const skill = DIAL_SKILLS_WITH_CATEGORY.find(item => item.categoryId === category.id)
  return skill?.index ?? 0
})

const SKILL_CATEGORY_INDEX = DIAL_SKILLS_WITH_CATEGORY.map(skill => skill.categoryIndex)
const SKILL_INDICES_BY_CATEGORY = DIAL_CATEGORIES.map((_, categoryIndex) =>
  DIAL_SKILLS_WITH_CATEGORY.filter(skill => skill.categoryIndex === categoryIndex).map(skill => skill.index)
)

function mod(value: number, length: number) {
  return ((value % length) + length) % length
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeAngle(delta: number) {
  let next = delta
  while (next > 180) next -= 360
  while (next < -180) next += 360
  return next
}

function polarToCartesian(rx: number, ry: number, angleDeg: number) {
  const radians = (angleDeg * Math.PI) / 180
  return {
    x: CENTER_X + rx * Math.cos(radians),
    y: CENTER_Y + ry * Math.sin(radians),
  }
}

function arcPath(rx: number, ry: number) {
  const start = polarToCartesian(rx, ry, CENTER_ANGLE - ARC_SPAN / 2)
  const end = polarToCartesian(rx, ry, CENTER_ANGLE + ARC_SPAN / 2)
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${rx} ${ry} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

function textArcPath(rx: number, ry: number, centerAngle: number, spanDeg: number) {
  const start = polarToCartesian(rx, ry, centerAngle - spanDeg / 2)
  const end = polarToCartesian(rx, ry, centerAngle + spanDeg / 2)
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${rx} ${ry} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

function cyclicDistance(index: number, position: number, length: number) {
  const wrapped = mod(position, length)
  let delta = index - wrapped
  if (delta > length / 2) delta -= length
  if (delta < -length / 2) delta += length
  return delta
}

function cyclicDistanceFloat(value: number, position: number, length: number) {
  let delta = value - mod(position, length)
  if (delta > length / 2) delta -= length
  if (delta < -length / 2) delta += length
  return delta
}

function nearestEquivalentIndex(targetIndex: number, currentPosition: number, length: number) {
  const base = Math.round((currentPosition - targetIndex) / length)
  const candidates = [
    targetIndex + (base - 1) * length,
    targetIndex + base * length,
    targetIndex + (base + 1) * length,
  ]
  return candidates.reduce((best, candidate) => {
    return Math.abs(candidate - currentPosition) < Math.abs(best - currentPosition) ? candidate : best
  })
}

function nearestSkillIndexForCategory(categoryIndex: number, currentPosition: number) {
  const skillIndices = SKILL_INDICES_BY_CATEGORY[categoryIndex]
  if (!skillIndices?.length) return FIRST_SKILL_INDEX_BY_CATEGORY[categoryIndex] ?? 0

  return skillIndices.reduce((bestIndex, candidateIndex) => {
    return Math.abs(cyclicDistance(candidateIndex, currentPosition, SKILL_COUNT)) <
      Math.abs(cyclicDistance(bestIndex, currentPosition, SKILL_COUNT))
      ? candidateIndex
      : bestIndex
  })
}

function centerWeightFromAngle(angle: number) {
  const distanceFromCenter = Math.abs(angle - CENTER_ANGLE)
  return clamp(1 - distanceFromCenter / (ARC_SPAN / 2), 0, 1)
}

function positionToCategoryFloat(pos: number) {
  const len = SKILL_COUNT
  const wrapped = mod(pos, len)
  const floorIdx = Math.floor(wrapped) % len
  const ceilIdx = (floorIdx + 1) % len
  const frac = wrapped - Math.floor(wrapped)

  const catA = SKILL_CATEGORY_INDEX[floorIdx]
  const catB = SKILL_CATEGORY_INDEX[ceilIdx]
  let delta = catB - catA
  if (delta > CATEGORY_COUNT / 2) delta -= CATEGORY_COUNT
  if (delta < -CATEGORY_COUNT / 2) delta += CATEGORY_COUNT

  let catFloat = catA + frac * delta
  if (catFloat < 0) catFloat += CATEGORY_COUNT
  if (catFloat >= CATEGORY_COUNT) catFloat -= CATEGORY_COUNT
  return catFloat
}

function estimateSkillFontSize(name: string, isSelected: boolean, centerWeight: number) {
  const long = name.length > 10
  if (isSelected) return long ? 14 : 16
  return long ? 8.5 + centerWeight * 1.2 : 9.5 + centerWeight * 2
}

function estimateArcSpan(name: string, isSelected: boolean) {
  const base = name.length * (isSelected ? 2.4 : 2.1)
  return clamp(base, 14, isSelected ? 34 : 30)
}

type DragRing = 'outer' | 'tick' | 'inner'

type DragState =
  | {
      ring: 'outer' | 'tick'
      lastAngle: number
      lastTime: number
      velocity: number
      moved: boolean
      totalDelta: number
      clickTargetSkillIndex?: number
    }
  | {
      ring: 'inner'
      lastAngle: number
      moved: boolean
      totalDelta: number
      startCategoryIndex: number
      innerTargetCategory: number
      accumulator: number
      clickTargetCategoryIndex?: number
    }
  | null

function CurvedLabel({
  id,
  text,
  rx,
  ry,
  angle,
  spanDeg,
  fill,
  opacity,
  fontSize,
  fontWeight,
  letterSpacing,
  uppercase = false,
}: {
  id: string
  text: string
  rx: number
  ry: number
  angle: number
  spanDeg: number
  fill: string
  opacity: number
  fontSize: number
  fontWeight: number
  letterSpacing: string
  uppercase?: boolean
}) {
  const pathD = textArcPath(rx, ry, angle, spanDeg)
  return (
    <g opacity={opacity}>
      <defs>
        <path id={id} d={pathD} />
      </defs>
      <text
        fill={fill}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize,
          fontWeight,
          letterSpacing,
          textTransform: uppercase ? 'uppercase' : 'none',
        }}
      >
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </g>
  )
}

export default function MonoSkillDialContext() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const dragRef = useRef<DragState>(null)
  const motionRef = useRef({ position: 0, velocity: 0, target: null as number | null, lastFrame: 0 })
  const selectedIndexRef = useRef(0)
  const audioRef = useRef<AudioContext | null>(null)
  const audioReadyRef = useRef(false)
  const reduceMotionRef = useRef(false)
  const uid = useId().replace(/:/g, '')

  const [position, setPosition] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedSkill = DIAL_SKILLS_WITH_CATEGORY[selectedIndex]
  const activeCategoryIndex = selectedSkill.categoryIndex
  const activeCategory = DIAL_CATEGORIES[activeCategoryIndex]
  const categoryFloat = positionToCategoryFloat(position)
  const selectedAccent = selectedSkill.color

  const outerRailArc = useMemo(() => arcPath(OUTER_RX + 28, OUTER_RY + 24), [])
  const innerRailArc = useMemo(() => arcPath(INNER_RX - 16, INNER_RY - 12), [])
  const tickArc = useMemo(() => arcPath(TICK_RX, TICK_RY), [])

  const commitPosition = (nextPosition: number) => {
    motionRef.current.position = nextPosition
    setPosition(nextPosition)

    const nextIndex = mod(Math.round(nextPosition), SKILL_COUNT)
    if (nextIndex !== selectedIndexRef.current) {
      selectedIndexRef.current = nextIndex
      startTransition(() => setSelectedIndex(nextIndex))
      void playTick(audioRef, audioReadyRef, reduceMotionRef.current ? 0.5 : 1)
    }
  }

  const stopLoop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }

  const startLoop = () => {
    if (rafRef.current) return

    const tick = (time: number) => {
      const motion = motionRef.current
      const dt = motion.lastFrame ? Math.min(32, time - motion.lastFrame) / 16.667 : 1
      motion.lastFrame = time

      const draggingSkillRing = dragRef.current?.ring === 'outer' || dragRef.current?.ring === 'tick'
      if (!draggingSkillRing) {
        if (motion.target !== null) {
          const diff = motion.target - motion.position
          motion.velocity += diff * (reduceMotionRef.current ? 0.22 : TARGET_SPRING) * dt
        } else if (Math.abs(motion.velocity) < 0.11) {
          const diff = Math.round(motion.position) - motion.position
          motion.velocity += diff * IDLE_SPRING * dt
        }

        motion.position += motion.velocity * dt
        motion.velocity *= Math.pow(reduceMotionRef.current ? 0.58 : INERTIA_DAMPING, dt)

        if (
          motion.target !== null &&
          Math.abs(motion.target - motion.position) < 0.006 &&
          Math.abs(motion.velocity) < 0.008
        ) {
          motion.position = motion.target
          motion.target = null
          motion.velocity = 0
        }
      }

      commitPosition(motion.position)

      const shouldKeepGoing =
        dragRef.current !== null ||
        Math.abs(motion.velocity) > 0.01 ||
        motion.target !== null ||
        Math.abs(Math.round(motion.position) - motion.position) > 0.01

      if (shouldKeepGoing) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        motion.position = Math.round(motion.position)
        motion.velocity = 0
        motion.target = null
        commitPosition(motion.position)
        motion.lastFrame = 0
        rafRef.current = 0
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  const animateToSkill = (skillIndex: number) => {
    const nextTarget = nearestEquivalentIndex(skillIndex, motionRef.current.position, SKILL_COUNT)
    motionRef.current.target = nextTarget
    motionRef.current.velocity *= TARGET_VELOCITY_RETENTION
    startLoop()
  }

  const toLocalPoint = (clientX: number, clientY: number) => {
    const stage = stageRef.current
    if (!stage) return null

    const rect = stage.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * VIEW_WIDTH
    const y = ((clientY - rect.top) / rect.height) * VIEW_HEIGHT
    const dx = x - CENTER_X
    const dy = y - CENTER_Y
    const normAngle = (Math.atan2(dy / INNER_RY, dx / INNER_RX) * 180) / Math.PI
    return {
      x,
      y,
      dx,
      dy,
      distance: Math.hypot(dx / INNER_RX, dy / INNER_RY) * INNER_RX,
      angle: normAngle,
    }
  }

  const pickRing = (distance: number): DragRing | null => {
    if (distance >= OUTER_RING_MIN && distance <= OUTER_RING_MAX) return 'outer'
    if (distance >= TICK_RING_MIN && distance <= TICK_RING_MAX) return 'tick'
    if (distance >= INNER_RING_MIN && distance <= INNER_RING_MAX) return 'inner'
    return null
  }

  const beginDrag = (
    ring: DragRing,
    angle: number,
    pointerId?: number,
    options?: { categoryIndex?: number; skillIndex?: number }
  ) => {
    void unlockAudio(audioRef, audioReadyRef)

    if (pointerId !== undefined && stageRef.current) {
      stageRef.current.setPointerCapture(pointerId)
    }

    if (ring === 'inner') {
      dragRef.current = {
        ring,
        lastAngle: angle,
        moved: false,
        totalDelta: 0,
        startCategoryIndex: activeCategoryIndex,
        innerTargetCategory: activeCategoryIndex,
        accumulator: 0,
        clickTargetCategoryIndex: options?.categoryIndex,
      }
      return
    }

    dragRef.current = {
      ring,
      lastAngle: angle,
      lastTime: performance.now(),
      velocity: 0,
      moved: false,
      totalDelta: 0,
      clickTargetSkillIndex: options?.skillIndex,
    }
    motionRef.current.target = null
    startLoop()
  }

  const handleStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const point = toLocalPoint(event.clientX, event.clientY)
    if (!point) return

    const ring = pickRing(point.distance)
    if (!ring) return

    beginDrag(ring, point.angle, event.pointerId)
  }

  const handleSkillPointerDown = (event: ReactPointerEvent<SVGGElement>, skillIndex: number) => {
    const point = toLocalPoint(event.clientX, event.clientY)
    if (!point) return

    event.stopPropagation()
    beginDrag('outer', point.angle, event.pointerId, { skillIndex })
  }

  const handleTickPointerDown = (event: ReactPointerEvent<SVGGElement>) => {
    const point = toLocalPoint(event.clientX, event.clientY)
    if (!point) return

    event.stopPropagation()
    beginDrag('tick', point.angle, event.pointerId)
  }

  const handleCategoryPointerDown = (event: ReactPointerEvent<SVGGElement>, categoryIndex: number) => {
    const point = toLocalPoint(event.clientX, event.clientY)
    if (!point) return

    event.stopPropagation()
    beginDrag('inner', point.angle, event.pointerId, { categoryIndex })
  }

  const rotateSkillRing = (
    deltaAngle: number,
    drag: Extract<DragState, { ring: 'outer' | 'tick' }>,
    pointAngle: number
  ) => {
    const now = performance.now()
    const dt = Math.max(8, now - drag.lastTime)
    const stepDelta = -deltaAngle / OUTER_STEP_ANGLE
    const nextPosition = motionRef.current.position + stepDelta
    motionRef.current.target = null
    motionRef.current.velocity = stepDelta / (dt / 16.667)
    drag.velocity = motionRef.current.velocity
    drag.lastAngle = pointAngle
    drag.lastTime = now
    drag.totalDelta += Math.abs(stepDelta)
    drag.moved = drag.totalDelta > 0.12
    commitPosition(nextPosition)
    startLoop()
  }

  const handlePointerMove = (event: PointerEvent) => {
    const drag = dragRef.current
    if (!drag) return

    const point = toLocalPoint(event.clientX, event.clientY)
    if (!point) return

    const deltaAngle = normalizeAngle(point.angle - drag.lastAngle)

    if (drag.ring === 'outer' || drag.ring === 'tick') {
      rotateSkillRing(deltaAngle, drag, point.angle)
      return
    }

    if (drag.ring !== 'inner') return

    drag.lastAngle = point.angle
    drag.accumulator += deltaAngle / INNER_STEP_ANGLE
    drag.totalDelta += Math.abs(deltaAngle / INNER_STEP_ANGLE)
    drag.moved = drag.totalDelta > 0.16

    while (Math.abs(drag.accumulator) >= 1) {
      const direction = drag.accumulator > 0 ? 1 : -1
      drag.accumulator -= direction
      drag.innerTargetCategory = mod(drag.innerTargetCategory + direction, CATEGORY_COUNT)
      animateToSkill(nearestSkillIndexForCategory(drag.innerTargetCategory, motionRef.current.position))
    }
  }

  const handlePointerUp = (event: PointerEvent) => {
    const drag = dragRef.current
    if (!drag) return

    const point = toLocalPoint(event.clientX, event.clientY)
    dragRef.current = null

    if (drag.ring === 'outer' || drag.ring === 'tick') {
      if (!drag.moved && drag.clickTargetSkillIndex !== undefined) {
        animateToSkill(drag.clickTargetSkillIndex)
        return
      }

      if (!drag.moved && point) {
        const slot = Math.round((point.angle - CENTER_ANGLE) / OUTER_STEP_ANGLE)
        const targetIndex = mod(selectedIndexRef.current - slot, SKILL_COUNT)
        animateToSkill(targetIndex)
        return
      }

      motionRef.current.target = null
      motionRef.current.velocity = clamp(drag.velocity, -RELEASE_VELOCITY_CLAMP, RELEASE_VELOCITY_CLAMP)
      startLoop()
      return
    }

    if (drag.ring === 'inner' && !drag.moved && drag.clickTargetCategoryIndex !== undefined) {
      animateToSkill(nearestSkillIndexForCategory(drag.clickTargetCategoryIndex, motionRef.current.position))
      return
    }

    if (!drag.moved && point) {
      const slot = Math.round((point.angle - CENTER_ANGLE) / INNER_STEP_ANGLE)
      const targetCategoryIndex = mod(activeCategoryIndex + slot, CATEGORY_COUNT)
      animateToSkill(nearestSkillIndexForCategory(targetCategoryIndex, motionRef.current.position))
    }
  }

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    void unlockAudio(audioRef, audioReadyRef)

    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
    const impulse = clamp(delta / 280, -1.25, 1.25)
    motionRef.current.target = null
    motionRef.current.velocity -= impulse * WHEEL_VELOCITY_SCALE
    startLoop()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      void unlockAudio(audioRef, audioReadyRef)
      if (event.altKey || event.shiftKey) {
        const next = mod(activeCategoryIndex + 1, CATEGORY_COUNT)
        animateToSkill(nearestSkillIndexForCategory(next, motionRef.current.position))
      } else {
        animateToSkill(mod(selectedIndex + 1, SKILL_COUNT))
      }
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      void unlockAudio(audioRef, audioReadyRef)
      if (event.altKey || event.shiftKey) {
        const next = mod(activeCategoryIndex - 1, CATEGORY_COUNT)
        animateToSkill(nearestSkillIndexForCategory(next, motionRef.current.position))
      } else {
        animateToSkill(mod(selectedIndex - 1, SKILL_COUNT))
      }
    }
  }

  useEffect(() => {
    selectedIndexRef.current = selectedIndex
  }, [selectedIndex])

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const handleMove = (event: PointerEvent) => handlePointerMove(event)
    const handleUp = (event: PointerEvent) => handlePointerUp(event)

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', handleUp)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', handleUp)
    }
  }, [activeCategoryIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.frame}`,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!detailsRef.current) return

    gsap.fromTo(
      detailsRef.current,
      { opacity: 0.75, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
    )
  }, [selectedIndex])

  useEffect(() => {
    return () => {
      stopLoop()
      void audioRef.current?.close()
    }
  }, [])

  const renderedTicks = Array.from({ length: FINE_TICKS }).map((_, index) => {
    const tickSlot = (index / FINE_TICKS) * SKILL_COUNT
    const delta = cyclicDistanceFloat(tickSlot, position, SKILL_COUNT)
    const angle = CENTER_ANGLE + delta * OUTER_STEP_ANGLE
    const distanceFromCenter = Math.abs(angle - CENTER_ANGLE)

    if (distanceFromCenter > ARC_SPAN / 2 + OUTER_STEP_ANGLE * 0.08) return null

    const centerWeight = centerWeightFromAngle(angle)
    const tickPhase = index % 11
    const isMajor = tickPhase === 0
    const isMedium = tickPhase === 5
    const innerOffsetX = isMajor ? 0 : isMedium ? 2 : 4
    const innerOffsetY = isMajor ? 0 : isMedium ? 2 : 3
    const outerOffsetX = isMajor ? 12 : isMedium ? 9 : 7
    const outerOffsetY = isMajor ? 9 : isMedium ? 7 : 5
    const inner = polarToCartesian(TICK_RX + innerOffsetX, TICK_RY + innerOffsetY, angle)
    const outer = polarToCartesian(TICK_RX + outerOffsetX, TICK_RY + outerOffsetY, angle)
    const isActive = Math.abs(delta) < (isMajor ? 0.34 : 0.15)
    const stroke = isActive
      ? selectedAccent
      : isMajor
        ? 'var(--dial-tick-major)'
        : isMedium
          ? 'var(--dial-tick-medium)'
          : 'var(--dial-tick-fine)'
    const strokeWidth = isActive ? 1.45 : isMajor ? 1.05 : isMedium ? 0.82 : 0.68
    const opacity = isActive
      ? 0.8 + centerWeight * 0.2
      : isMajor
        ? 0.42 + centerWeight * 0.32
        : isMedium
          ? 0.28 + centerWeight * 0.22
          : 0.2 + centerWeight * 0.14

    return (
      <g key={`tick-${index}`} className={styles.tickGroup} onPointerDown={handleTickPointerDown}>
        <line
          className={styles.tickHit}
          x1={inner.x}
          y1={inner.y}
          x2={outer.x}
          y2={outer.y}
          stroke="transparent"
          strokeWidth={20}
        />
        <line
          className={styles.tickMark}
          x1={inner.x}
          y1={inner.y}
          x2={outer.x}
          y2={outer.y}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
      </g>
    )
  })

  const renderedSkills = DIAL_SKILLS_WITH_CATEGORY.map(skill => {
    const delta = cyclicDistance(skill.index, position, SKILL_COUNT)
    const angle = CENTER_ANGLE + delta * OUTER_STEP_ANGLE
    const distanceFromCenter = Math.abs(angle - CENTER_ANGLE)

    if (distanceFromCenter > ARC_SPAN / 2 + OUTER_STEP_ANGLE * 0.16) return null

    const centerWeight = centerWeightFromAngle(angle)
    const isSelected = skill.index === selectedIndex
    const opacity = clamp((isSelected ? 0.5 : 0.2) + centerWeight * 0.72, 0.22, 1)
    const fontSize = estimateSkillFontSize(skill.name, isSelected, centerWeight)
    const spanDeg = estimateArcSpan(skill.name, isSelected)
    const point = polarToCartesian(OUTER_RX, OUTER_RY, angle)

    return (
      <g
        key={skill.name}
        className={styles.skillGroup}
        onPointerDown={event => handleSkillPointerDown(event, skill.index)}
      >
        <circle cx={point.x} cy={point.y} r={28} fill="transparent" className={styles.skillHit} />
        <CurvedLabel
          id={`${uid}-skill-color-${skill.index}`}
          text={skill.name}
          rx={OUTER_RX}
          ry={OUTER_RY}
          angle={angle}
          spanDeg={spanDeg}
          fill={skill.color}
          opacity={opacity}
          fontSize={fontSize}
          fontWeight={isSelected ? 700 : 550}
          letterSpacing={isSelected ? '0.02em' : '0.05em'}
        />
      </g>
    )
  })

  const renderedCategories = DIAL_CATEGORIES.map((category, index) => {
    let delta = index - categoryFloat
    if (delta > CATEGORY_COUNT / 2) delta -= CATEGORY_COUNT
    if (delta < -CATEGORY_COUNT / 2) delta += CATEGORY_COUNT

    const angle = CENTER_ANGLE + delta * INNER_STEP_ANGLE
    const distanceFromCenter = Math.abs(angle - CENTER_ANGLE)

    if (distanceFromCenter > ARC_SPAN / 2 + INNER_STEP_ANGLE * 0.12) return null

    const centerWeight = centerWeightFromAngle(angle)
    const nearestCategory = mod(Math.round(categoryFloat), CATEGORY_COUNT)
    const isActive = index === nearestCategory
    const opacity = clamp((isActive ? 0.32 : 0.16) + centerWeight * 0.6, 0.18, 0.9)
    const spanDeg = clamp(category.label.length * 2.15, 16, 30)

    return (
      <g
        key={category.id}
        className={styles.categoryGroup}
        onPointerDown={event => handleCategoryPointerDown(event, index)}
      >
        <CurvedLabel
          id={`${uid}-cat-color-${category.id}`}
          text={category.label}
          rx={INNER_RX}
          ry={INNER_RY}
          angle={angle}
          spanDeg={spanDeg}
          fill={category.color}
          opacity={opacity}
          fontSize={isActive ? 10.5 : 9.5}
          fontWeight={isActive ? 700 : 500}
          letterSpacing={isActive ? '0.14em' : '0.1em'}
          uppercase
        />
      </g>
    )
  })

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="skill-dial-context-title">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLabel}>// Color Story Dial</span>
          <div className={styles.eyebrowRule} />
        </div>

        <div className={styles.frame}>
          <h2 id="skill-dial-context-title" className={styles.hiddenHeading}>
            Color-coded skill context dial
          </h2>

          <div
            ref={stageRef}
            className={styles.stage}
            role="application"
            aria-label="Interactive color-coded skill dial. Drag the ring, tick marks, or labels to rotate."
            tabIndex={0}
            onPointerDown={handleStagePointerDown}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
          >
            <svg className={styles.svg} viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} aria-hidden="true">
              <path d={outerRailArc} fill="none" stroke="var(--dial-rail-stroke)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              <path d={tickArc} fill="none" stroke="var(--dial-tick-track)" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
              <path d={innerRailArc} fill="none" stroke="var(--dial-inner-rail-stroke)" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 6" opacity="0.4" />

              {renderedTicks}
              {renderedCategories}
              {renderedSkills}
            </svg>

            <div
              ref={detailsRef}
              className={styles.details}
              style={{
                borderColor: `${selectedAccent}33`,
                boxShadow: `0 22px 54px color-mix(in srgb, var(--bg) 58%, transparent), inset 0 1px 0 color-mix(in srgb, ${selectedAccent} 14%, white 12%)`,
              }}
            >
              <div className={styles.contextHeader}>
                <span className={styles.contextDot} style={{ background: selectedAccent }} />
                <span>Where it showed up</span>
              </div>
              <div className={styles.contextTitleRow}>
                <div className={styles.contextSkill} style={{ color: selectedAccent } as CSSProperties}>
                  {selectedSkill.name}
                </div>
                <div className={styles.contextCategory}>{activeCategory.label}</div>
              </div>
              <div className={styles.contextStack}>
                {selectedSkill.usage.map(item => (
                  <div key={`${selectedSkill.name}-${item.kind}-${item.label}`} className={styles.contextRow}>
                    <div className={styles.contextKind}>{item.kind}</div>
                    <div className={styles.contextMeta}>
                      <div className={styles.contextLabel}>{item.label}</div>
                      <div className={styles.contextDetail}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

async function unlockAudio(audioRef: RefObject<AudioContext | null>, readyRef: RefObject<boolean>) {
  if (typeof window === 'undefined') return

  if (!audioRef.current) {
    const AudioContextCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextCtor) return
    audioRef.current = new AudioContextCtor()
  }

  const ctx = audioRef.current
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch {
      return
    }
  }

  if (!readyRef.current) {
    const probe = ctx.createOscillator()
    const probeGain = ctx.createGain()
    probeGain.gain.value = 0.0001
    probe.connect(probeGain)
    probeGain.connect(ctx.destination)
    probe.start()
    probe.stop(ctx.currentTime + 0.01)
    readyRef.current = true
  }
}

async function playTick(
  audioRef: RefObject<AudioContext | null>,
  readyRef: RefObject<boolean>,
  intensity: number
) {
  await unlockAudio(audioRef, readyRef)
  const ctx = audioRef.current
  if (!ctx || ctx.state !== 'running') return

  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(2800, now)
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.018)

  const click = ctx.createOscillator()
  click.type = 'triangle'
  click.frequency.setValueAtTime(4200, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.linearRampToValueAtTime(0.055 * intensity, now + 0.001)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

  const clickGain = ctx.createGain()
  clickGain.gain.setValueAtTime(0.0001, now)
  clickGain.gain.linearRampToValueAtTime(0.028 * intensity, now + 0.0005)
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012)

  osc.connect(gain)
  click.connect(clickGain)
  gain.connect(ctx.destination)
  clickGain.connect(ctx.destination)

  osc.start(now)
  click.start(now)
  osc.stop(now + 0.04)
  click.stop(now + 0.015)
}
