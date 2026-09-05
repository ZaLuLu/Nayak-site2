import React, { useEffect, useRef } from 'react'

export interface MoltenMetalProps {
  className?: string
  speed?: number
  viscosity?: number
  metallic?: number
  roughness?: number
  mode?: 'dark' | 'light' | 'auto'
  tint?: [number, number, number] // RGB normalized 0-1
  interactive?: boolean
  opacity?: number
}

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uTint;
  uniform float uViscosity;
  uniform float uMetallic;
  uniform float uIsLight;
  uniform float uOpacity;
  varying vec2 vUv;

  // Simplex-inspired noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
    vec2 mouse = (uMouse * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);

    float distToMouse = length(uv - mouse);
    float mouseWave = sin(distToMouse * 8.0 - uTime * 2.5) * exp(-distToMouse * 2.5) * 0.18;

    // Slow, fluid layered motion
    float t = uTime * uViscosity;
    float n1 = snoise(uv * 1.8 + vec2(t * 0.15, t * 0.12));
    float n2 = snoise(uv * 3.0 - vec2(n1 * 0.4, t * 0.2) + mouseWave);
    float n3 = snoise(uv * 5.0 + vec2(n2 * 0.3, -t * 0.15));

    // Finite differences normal vector calculation
    float eps = 0.008;
    float hL = snoise((uv - vec2(eps, 0.0)) * 1.8 + vec2(t * 0.15, t * 0.12));
    float hR = snoise((uv + vec2(eps, 0.0)) * 1.8 + vec2(t * 0.15, t * 0.12));
    float hD = snoise((uv - vec2(0.0, eps)) * 1.8 + vec2(t * 0.15, t * 0.12));
    float hU = snoise((uv + vec2(0.0, eps)) * 1.8 + vec2(t * 0.15, t * 0.12));
    vec3 normal = normalize(vec3(hL - hR, hD - hU, 0.18));

    // Specular lighting & metallic reflection
    vec3 lightDir = normalize(vec3(0.4, 0.7, 0.9));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);

    float spec = pow(max(dot(normal, halfDir), 0.0), 28.0);
    float diffuse = max(dot(normal, lightDir), 0.0) * 0.4 + 0.6;
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.5);

    vec3 finalColor;

    if (uIsLight > 0.5) {
      // Light Mode: Cool pearl paper, crisp violet-silver specular sheen
      vec3 lightBase = vec3(0.98, 0.98, 0.99) * diffuse;
      vec3 lightHighlight = vec3(1.0, 1.0, 1.0) * spec * uMetallic * 1.3;
      vec3 lightRim = vec3(0.43, 0.16, 0.85) * fresnel * 0.45;
      finalColor = lightBase + lightHighlight + lightRim;
    } else {
      // Dark Mode: Cool obsidian-graphite with subtle violet-600 luminescence
      vec3 darkBase = (uTint * 0.22 + vec3(0.05, 0.04, 0.08)) * diffuse;
      vec3 darkHighlight = vec3(0.95, 0.94, 1.0) * spec * uMetallic * 1.7;
      vec3 darkRim = vec3(0.26, 0.22, 0.79) * fresnel * 0.9;
      finalColor = darkBase + darkHighlight + darkRim;
    }

    gl_FragColor = vec4(finalColor, uOpacity);
  }
`

export function MoltenMetal({
  className = '',
  speed = 0.18,
  viscosity = 0.68,
  metallic = 0.95,
  mode = 'auto',
  tint = [0.48, 0.22, 0.92], // Violet-600
  interactive = true,
  opacity = 0.75,
}: MoltenMetalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true }) || 
      (canvas.getContext('experimental-webgl', { alpha: true }) as WebGLRenderingContext | null)
    if (!gl) return

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const posAttr = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posAttr)
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)

    const uTimeLoc = gl.getUniformLocation(program, 'uTime')
    const uResLoc = gl.getUniformLocation(program, 'uResolution')
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse')
    const uTintLoc = gl.getUniformLocation(program, 'uTint')
    const uViscosityLoc = gl.getUniformLocation(program, 'uViscosity')
    const uMetallicLoc = gl.getUniformLocation(program, 'uMetallic')
    const uIsLightLoc = gl.getUniformLocation(program, 'uIsLight')
    const uOpacityLoc = gl.getUniformLocation(program, 'uOpacity')

    gl.uniform3f(uTintLoc, tint[0], tint[1], tint[2])
    gl.uniform1f(uViscosityLoc, viscosity)
    gl.uniform1f(uMetallicLoc, metallic)
    gl.uniform1f(uOpacityLoc, opacity)

    // Check light mode
    const checkIsLight = () => {
      if (mode === 'light') return 1.0
      if (mode === 'dark') return 0.0
      return document.documentElement.getAttribute('data-theme') === 'light' ? 1.0 : 0.0
    }
    gl.uniform1f(uIsLightLoc, checkIsLight())

    // Theme change observer
    const themeObserver = new MutationObserver(() => {
      if (gl && program) {
        gl.useProgram(program)
        gl.uniform1f(uIsLightLoc, checkIsLight())
      }
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let animationId: number
    let startTime = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uResLoc, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      mousePos.current.targetX = (e.clientX - rect.left) * dpr
      mousePos.current.targetY = (rect.height - (e.clientY - rect.top)) * dpr
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render)
        return
      }

      const now = (performance.now() - startTime) * 0.001 * speed

      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05

      gl.uniform1f(uTimeLoc, now)
      gl.uniform2f(uMouseLoc, mousePos.current.x, mousePos.current.y)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      if (interactive) window.removeEventListener('mousemove', handleMouseMove)
      themeObserver.disconnect()
      observer.disconnect()
      cancelAnimationFrame(animationId)
      if (program) gl.deleteProgram(program)
    }
  }, [speed, viscosity, metallic, mode, tint, interactive, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
