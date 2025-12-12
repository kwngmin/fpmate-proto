"use client";

import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import { Button } from "@/shared/ui";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface GradientColors {
  primary: [number, number, number, number];
  secondary: [number, number, number, number];
  variation: number;
}

// 변환 유틸리티
function hexToGLColor(
  hex: string,
  alpha = 1
): [number, number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0, alpha];

  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
    alpha,
  ];
}

function rgbaToGLColor(
  r: number,
  g: number,
  b: number,
  a = 255
): [number, number, number, number] {
  return [r / 255, g / 255, b / 255, a / 255];
}

interface WebGLGradientAnimationProps {
  colors?: GradientColors;
}

export const GRADIENT_PRESETS = {
  green: {
    primary: [0.2, 0.8, 0.3, 0.1],
    secondary: [0.1, 0.6, 0.4, 0.1],
    variation: 0.2,
  },
  emerald: {
    primary: [0.0, 0.7, 0.5, 0.1],
    secondary: [0.1, 0.5, 0.3, 0.1],
    variation: 0.15,
  },
  lime: {
    primary: [0.4, 0.9, 0.2, 0.1],
    secondary: [0.3, 0.7, 0.1, 0.1],
    variation: 0.25,
  },
  forest: {
    primary: [0.1, 0.5, 0.2, 0.1],
    secondary: [0.05, 0.35, 0.15, 0.1],
    variation: 0.1,
  },
} as const satisfies Record<string, GradientColors>;

export function WebGLGradientAnimation({
  colors = GRADIENT_PRESETS.green,
}: WebGLGradientAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: containerRef, isIntersecting } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isIntersecting) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.warn("WebGL2 not supported");
      return;
    }

    // 캔버스 크기 설정 함수
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();

    // ✅ 알파 블렌딩 활성화 (이 부분 추가)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vertexShaderSource = `#version 300 es
      in vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `#version 300 es
  precision mediump float;
  uniform float time;
  uniform vec2 resolution;
  uniform vec4 primaryColor;   // vec3 → vec4
  uniform vec4 secondaryColor; // vec3 → vec4
  uniform float colorVariation;
  
  out vec4 fragColor;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    
    float wave1 = sin(time * 0.8 + uv.x * 4.0 + uv.y * 2.0) * 0.5 + 0.5;
    float wave2 = sin(time * 0.6 + uv.y * 3.0 - uv.x * 1.5) * 0.5 + 0.5;
    float wave3 = sin(time * 1.0 + length(uv - 0.5) * 5.0) * 0.5 + 0.5;
    
    float mixFactor = (wave1 + wave2 + wave3) / 3.0;
    
    // RGBA mix
    vec4 baseColor = mix(secondaryColor, primaryColor, mixFactor);
    
    vec3 variation = vec3(
      sin(time * 0.5 + uv.x * 2.0) * colorVariation,
      sin(time * 0.7 + uv.y * 2.5) * colorVariation * 0.5,
      sin(time * 0.3 + uv.x * 1.5) * colorVariation * 0.3
    );
    
    vec3 finalRGB = clamp(baseColor.rgb + variation, 0.0, 1.0);
    fragColor = vec4(finalRGB, baseColor.a);
  }
`;

    const createShader = (
      gl: WebGL2RenderingContext,
      type: number,
      source: string
    ) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "time");
    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    const primaryColorLocation = gl.getUniformLocation(program, "primaryColor");
    const secondaryColorLocation = gl.getUniformLocation(
      program,
      "secondaryColor"
    );
    const colorVariationLocation = gl.getUniformLocation(
      program,
      "colorVariation"
    );

    gl.uniform4fv(primaryColorLocation, colors.primary);
    gl.uniform4fv(secondaryColorLocation, colors.secondary);
    gl.uniform1f(colorVariationLocation, colors.variation);

    const startTime = performance.now();
    let animationId: number;

    const render = () => {
      const time = (performance.now() - startTime) / 1000;

      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, [isIntersecting, colors]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 opacity-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

const Section5 = () => {
  return (
    <section
      className="bg-gray-50 py-32 md:py-40 lg:py-80 relative z-50 overflow-hidden"
      style={{
        transform: "translate3d(0, 0, 0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        isolation: "isolate",
      }}
    >
      {/* WebGL Background */}
      <WebGLGradientAnimation
        colors={{
          primary: hexToGLColor("#00AB55", 1), // 80% 불투명
          secondary: hexToGLColor("#007B55", 0.1), // 60% 불투명
          variation: 0.15,
        }}
      />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-16 relative z-40">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center items-center">
            <Image
              src="/assets/logo/fpmate-symbol.svg"
              alt="FPMate"
              width={112}
              height={40}
              className="size-20 sm:size-32"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-tight tracking-tighter font-semibold break-keep text-center text-text-primary">
              진화하는{" "}
              <span className="font-extrabold text-brand-primary">FPMate</span>,{" "}
              사업 성공 도우미
            </div>
            <p className="text-[1.0625rem] md:text-[1.3125rem] leading-snug tracking-tighter break-keep text-center text-text-primary">
              당신의 <span className="font-medium">SW 사업 성공</span>과{" "}
              <span className="font-medium">Fine 프로젝트</span>를 위하여{" "}
              <br className="sm:hidden" />
              <span className="font-semibold">FPMate</span>는 지속적으로
              성장합니다.
            </p>
          </div>
        </div>

        {/* Action Buttons - Mobile */}
        <div className="flex justify-center items-center gap-2 md:hidden">
          <Button variant="primary" size="md" className="bg-black! min-w-32">
            제품도입문의
          </Button>
          <Button variant="ghost" size="md" className="min-w-32">
            로그인/회원가입
            <Image
              src="/assets/svgs/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
              className="size-4 ml-2"
            />
          </Button>
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex justify-center items-center gap-2">
          <Button variant="primary" size="lg" className="bg-black! min-w-40">
            제품도입문의
          </Button>
          <Button variant="ghost" size="lg" className="min-w-40">
            로그인/회원가입
            <Image
              src="/assets/svgs/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
              className="size-4 ml-2"
            />
          </Button>
        </div>
      </div>

      {/* Logo Background */}
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <Image
          src="/assets/logo/fpmate-logo-shape.svg"
          alt="FPMate"
          width={112}
          height={40}
          className="size-4/5 md:size-2/3"
        />
      </div>
    </section>
  );
};

export default Section5;
