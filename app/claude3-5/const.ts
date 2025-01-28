export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  uniform float uCameraDistance;
  uniform float uFieldOfView;
  uniform float uHeightOffset;
  uniform vec2 uPositionOffset;

#define PI 3.1415926
#define MAX_ITERATIONS 12
#define FRACTAL_SCALE 2.2
#define DETAIL_LEVEL 0.45
#define GROWTH_SPEED 0.3
#define COMPLEXITY 3.0
#define IOR 1.45  // Softer, more natural reflections
#define tshift 53.
#define ROTATION_SPEED 0.25  // Slower, smoother rotation
#define LAYERS 5  // Multiple layers of complexity
#define PULSE_SPEED 0.25  // Gentler pulsing
#define LOGIC_PATTERN_SCALE 25.0
#define TIME_SCALE 0.5  // Global time scaling factor
#define KNOWLEDGE_LAYERS 7

  mat3 rotx(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(vec3(1.0, 0.0, 0.0), vec3(0.0, c, s), vec3(0.0, -s, c));
  }
  
  mat3 roty(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(vec3(c, 0.0, s), vec3(0.0, 1.0, 0.0), vec3(-s, 0.0, c));
  }
  
  mat3 rotz(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(vec3(c, s, 0.0), vec3(-s, c, 0.0), vec3(0.0, 0.0, 1.0));
  }

  vec3 fcos1(vec3 x) {
    vec3 w = fwidth(x);
    float lw = length(w);
    if((lw==0.)||isnan(lw)||isinf(lw)) {
      vec3 tc = vec3(0.);
      for(int i=0; i<8; i++)
        tc += cos(x+x*float(i-4)*(0.01*400./iResolution.y));
      return tc/8.;
    }
    return cos(x) * smoothstep(3.14 * 2.0, 0.0, w);
  }

  // Neural network-like pattern
// Neural network-like pattern with enhanced complexity
float logicPattern(vec3 p) {
    float pattern = 0.0;
    float timeOffset = iTime * TIME_SCALE;
    for (int i = 0; i < KNOWLEDGE_LAYERS; i++) {
        vec3 pos = p * (float(i + 1) * LOGIC_PATTERN_SCALE * 0.7);
        float layer = sin(pos.x) * cos(pos.y) * sin(pos.z);
        layer *= 0.6 / float(i + 1); // Softer layer influence
        pattern += layer * (0.9 + 0.1 * sin(timeOffset * 0.15 + float(i))); // Smoother animation
    }
    return pattern * 0.5;
}

// Connection network visualization
float connectionNetwork(vec3 p) {
    float network = 0.0;
    float timeOffset = iTime * TIME_SCALE;
    for (int i = 0; i < 4; i++) {
        float phase = timeOffset * 0.08 + float(i) * PI * 0.25;
        vec3 offset = vec3(
            sin(phase) * 0.5,
            cos(phase * 1.3) * 0.5,
            sin(phase * 0.7) * 0.5
        );
        network += smoothstep(0.02, 0.0, length(cross(p + offset, normalize(p))));
    }
    return network;
}

vec3 getColor(vec3 p) {
    // Core identity - structured and dynamic
    p = abs(p);
    p *= 1.15;
    p = 0.5 * p / dot(p, p);
    
    // Time-based evolution with measured pace
    float timeOffset = iTime * TIME_SCALE;
    float pulse = sin(timeOffset * PULSE_SPEED) * 0.5 + 0.5;
    float breathe = sin(timeOffset * 0.15) * 0.5 + 0.5;
    p += 0.02 * timeOffset;

    // Multi-layered knowledge representation
    float t = 0.15 * length(p);
    // Warmer, more approachable base color
    vec3 col = vec3(0.2, 0.4, 0.5) * (0.8 + 0.2 * breathe);
    
    // Organic expertise layers with natural flow
    col += 0.15 * fcos1(6.28318 * t * 1.2 + vec3(0.1, 0.7, 1.0)) * (0.9 + 0.1 * pulse); // Core knowledge
    col += 0.12 * fcos1(6.28318 * t * 2.3 + vec3(0.4, 0.6, 0.9)) * (0.9 + 0.1 * sin(timeOffset * 0.25)); // Adaptability
    col += 0.10 * fcos1(6.28318 * t * 3.7 + vec3(0.3, 0.5, 0.8)) * (0.9 + 0.1 * cos(timeOffset * 0.3)); // Creativity
    
    // Neural network patterns with dynamic connections
    float logic = logicPattern(p);
    float connections = connectionNetwork(p);
    
    // Natural interaction patterns
    float organicFlow = sin(length(p) * 3.0 + timeOffset * 0.2) * 0.5 + 0.5;
    col += vec3(0.15, 0.25, 0.3) * logic * (0.7 + 0.3 * organicFlow);
    col += vec3(0.25, 0.3, 0.35) * connections * (0.8 + 0.2 * breathe);
    
    // Warmth and empathy layer
    col += vec3(0.1, 0.08, 0.06) * pow(breathe, 2.0);
    
    // Subtle color variations based on position
    col += vec3(0.05, 0.08, 0.12) * sin(length(p) * 4.0 + iTime * 0.2);
    return clamp(col, 0.0, 1.0);
  }

  vec3 bgcol(vec3 rd) {
    // Darker background with subtle gradient for better contrast
    // Create a more dynamic background that responds to view angle
    vec3 base = mix(vec3(0.02), vec3(0.2, 0.3, 0.4), 1.0 - pow(abs(rd.z+0.25), 1.5));
    
    // Add subtle aurora-like effect
    float aurora = pow(max(0.0, rd.z + 0.5), 3.0);
    aurora *= 0.5 + 0.5 * sin(rd.x * 3.0 + iTime * TIME_SCALE * 0.15);
    base += vec3(0.0, 0.05, 0.1) * aurora;
    
    return base;
  }

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float sdSphere(vec3 p, float r) {
    return length(p) - r;
  }

  float displacement(vec3 p) {
    return sin(p.x * 10.0 + iTime) * sin(p.y * 8.0) * sin(p.z * 6.0) * 0.05;
  }

  vec2 fold(vec2 p) {
    const vec2 e = vec2(0.0, 1.0);
    vec2 q = p;
    for(int i = 0; i < 3; i++) {
        q = abs(q);
        q -= e;
        if(q.y > q.x) q = q.yx;
    }
    return q;
  }

  vec3 rotateY(vec3 v, float angle) {
    float ca = cos(angle), sa = sin(angle);
    return vec3(ca * v.x - sa * v.z, v.y, sa * v.x + ca * v.z);
  }

  float shapeSDF(vec3 p) {
    // Organic base shape
    float d = sdSphere(p, 0.7);
    
    // Fractal growth
    vec3 z = p;
    float dr = 1.0;
    float r = 0.0;
    float scale = 1.0;
    
    float timeVar = iTime * GROWTH_SPEED;
    
    for (int i = 0; i < MAX_ITERATIONS; i++) {
        r = length(z);
        if (r > 2.0) break;
        
        // Dynamic rotation
        float theta = acos(z.z/r) + sin(timeVar * 0.5) * 0.1;
        float phi = atan(z.y, z.x) + cos(timeVar * 0.3) * 0.2;
        
        // Growth factor
        dr = pow(r, COMPLEXITY) * FRACTAL_SCALE * dr + 1.0;
        
        // Organic transformation
        float zr = pow(r, 6.0) * (1.0 + sin(timeVar) * 0.1);
        theta = theta * FRACTAL_SCALE + sin(timeVar * 0.4 + float(i)) * 0.1;
        phi = phi * FRACTAL_SCALE + cos(timeVar * 0.3 + float(i)) * 0.15;
        
        // Apply transformation
        z = zr * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta));
        z = rotateY(z, timeVar * 0.2);
        z += p * (1.0 + sin(timeVar * 0.5) * 0.1);
    }

    // Combine with displacement
    float disp = displacement(p * 2.0);
    d = smin(d, 0.5 * log(r) * pow(r, DETAIL_LEVEL) / dr, 0.1) + disp;
    
    // Add geometric details
    vec3 q = mod(p * 4.0, 2.0) - 1.0;
    float details = length(fold(q.xy + sin(q.z + iTime * 0.3) * 0.2)) * 0.1;
    d = smin(d, details, 0.05);
    
    return d * 0.5;
  }

  float sceneSDF(vec3 p) {
    return shapeSDF(p);
  }

  vec3 calcNormal(vec3 p) {
    const float h = 0.0001;
    const vec2 k = vec2(1,-1);
    return normalize(k.xyy*sceneSDF(p + k.xyy*h) + 
                    k.yyx*sceneSDF(p + k.yyx*h) + 
                    k.yxy*sceneSDF(p + k.yxy*h) + 
                    k.xxx*sceneSDF(p + k.xxx*h));
  }

  float rayMarch(vec3 ro, vec3 rd, out vec3 nn, bool entering) {
    float t = 0.0;
    float d = 0.0;
    
    for(int i = 0; i < 128; i++) {
        vec3 p = ro + rd * t;
        d = sceneSDF(p);
        if(d < 0.001) {
            nn = calcNormal(p);
            return t;
        }
        if(t > 20.0) break;
        t += d * 0.5;
    }
    return -1.0;
  }

  vec4 calcColor(vec3 ro, vec3 rd, vec3 nor, float d, float len, float fade) {
    vec3 pos = (ro + rd * d);
    vec3 col = getColor(pos);
    float a = 1. - smoothstep(len - 0.15*0.5, len + 0.00001, length(pos));
    return vec4(col, a);
  }

  vec4 insides(vec3 ro, vec3 rd, vec3 nor_c, vec3 l_dir, out float tout) {
    tout = -1.;
    vec3 trd = rd;
    vec3 col = vec3(0.);
    float pi = PI;

    if (abs(nor_c.x) > 0.5) {
      rd = rd.xzy * nor_c.x;
      ro = ro.xzy * nor_c.x;
    } else if (abs(nor_c.z) > 0.5) {
      l_dir *= roty(pi);
      rd = rd.yxz * nor_c.z;
      ro = ro.yxz * nor_c.z;
    } else if (abs(nor_c.y) > 0.5) {
      l_dir *= rotz(-pi * 0.5);
      rd = rd * nor_c.y;
      ro = ro * nor_c.y;
    }

    float curvature = 0.5;
    float bil_size = 1.;
    vec4 ps = vec4(-bil_size, -bil_size, bil_size, bil_size) * curvature;
    vec4 ph = vec4(-bil_size, bil_size, bil_size, -bil_size) * curvature;
    
    vec4[3] colx = vec4[3](vec4(0.), vec4(0.), vec4(0.));
    vec3[3] dx = vec3[3](vec3(-1.), vec3(-1.), vec3(-1.));

    vec4[3] colxsi = vec4[3](vec4(0.), vec4(0.), vec4(0.));
    int[3] order = int[3](0, 1, 2);
    
    for (int i = 0; i < 3; i++) {
      if (abs(nor_c.x) > 0.5) {
        ro *= rotz(-pi * (1. / 3.));
        rd *= rotz(-pi * (1. / 3.));
      } else if (abs(nor_c.z) > 0.5) {
        ro *= rotz(pi * (1. / 3.));
        rd *= rotz(pi * (1. / 3.));
      } else if (abs(nor_c.y) > 0.5) {
        ro *= rotx(pi * (1. / 3.));
        rd *= rotx(pi * (1. / 3.));
      }
      
      vec3 pos = ro + rd * (0.5 + 0.1 * sin(iTime + float(i) * 2.094));
      vec4 tcol = calcColor(ro, rd, vec3(0.), length(pos), bil_size, 1.0);
      
      if (tcol.a > 0.0) {
        dx[i] = vec3(length(pos), 0., 0.);
        colx[i] = tcol;
      }
    }
    
    // Sort layers by depth
    if (dx[0].x < dx[1].x) { vec3 tv = dx[0]; dx[0] = dx[1]; dx[1] = tv; vec4 tc = colx[0]; colx[0] = colx[1]; colx[1] = tc; int ti = order[0]; order[0] = order[1]; order[1] = ti; }
    if (dx[1].x < dx[2].x) { vec3 tv = dx[1]; dx[1] = dx[2]; dx[2] = tv; vec4 tc = colx[1]; colx[1] = colx[2]; colx[2] = tc; int ti = order[1]; order[1] = order[2]; order[2] = ti; }
    if (dx[0].x < dx[1].x) { vec3 tv = dx[0]; dx[0] = dx[1]; dx[1] = tv; vec4 tc = colx[0]; colx[0] = colx[1]; colx[1] = tc; int ti = order[0]; order[0] = order[1]; order[1] = ti; }
    
    tout = max(max(dx[0].x, dx[1].x), dx[2].x);
    
    // Blend layers
    vec3 finalCol = vec3(0.);
    float alpha = 0.;
    
    for (int i = 2; i >= 0; i--) {
      vec4 layer = colx[order[i]];
      finalCol = mix(finalCol, layer.rgb, layer.a * (1.0 - alpha));
      alpha = alpha + (1.0 - alpha) * layer.a;
    }
    
    return vec4(finalCol, alpha);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Aspect ratio corrected viewport coordinates
    // Normalize viewport coordinates with aspect ratio correction
    vec2 resolution = iResolution.xy;
    float aspectRatio = resolution.x / resolution.y;
    vec2 ndc = (2.0 * fragCoord - resolution) / min(resolution.x, resolution.y);
    ndc.x *= aspectRatio;
    ndc = 1.25 * ndc;
    ndc = ndc + uPositionOffset;
    
    float mouseY = PI * 0.235 + uHeightOffset;
    float mouseX = -2. * PI - 0.25 * (iTime * ROTATION_SPEED + tshift);
    
    vec3 eye = uCameraDistance * vec3(cos(mouseX) * cos(mouseY), sin(mouseX) * cos(mouseY), sin(mouseY));
    vec3 w = normalize(-eye);
    vec3 up = vec3(0.0, 0.0, 1.0);
    vec3 u = normalize(cross(w, up));
    vec3 v = cross(u, w);
    
    vec3 rd = normalize(w * uFieldOfView + ndc.x * u + ndc.y * v);
    
    vec3 normal;
    float t = rayMarch(eye, rd, normal, true);
    vec3 col = bgcol(rd);
    
    if (t > 0.0) {
      vec3 ro = eye + t * rd;
      float R0 = (IOR - 1.0) / (IOR + 1.0);
      R0 *= R0;
      vec3 nr = normal;
      
      // Enhanced refraction
      vec3 rd2 = refract(rd, nr, 1.0/IOR);
      float tout;
      vec4 internalCol = insides(ro, rd2, normal, normalize(vec3(1.,1.,2.)), tout);
      
      // Multiple reflection bounces
      vec3 rdr = reflect(rd, nr);
      vec3 reflCol = bgcol(rdr);
      vec3 secondBounce = reflect(rdr, normalize(vec3(1.0, 1.0, 0.5)));
      reflCol = mix(reflCol, bgcol(secondBounce), 0.3);
      
      // Enhanced Fresnel effect with chromatic dispersion
      float fresnel = R0 + (1.0 - R0) * pow(1.0 - dot(-rd, nr), 5.0);
      vec3 dispersion = vec3(
          R0 + (1.0 - R0) * pow(1.0 - dot(-rd, nr), 4.8),  // Red
          fresnel,  // Green
          R0 + (1.0 - R0) * pow(1.0 - dot(-rd, nr), 5.2)   // Blue
      );
      
      // Combine with chromatic separation
      col = vec3(
          mix(internalCol.r, reflCol.r, dispersion.r),
          mix(internalCol.g, reflCol.g, dispersion.g),
          mix(internalCol.b, reflCol.b, dispersion.b)
      );
      
      // Add subtle edge glow
      float edge = pow(1.0 - abs(dot(nr, -rd)), 4.0);
      col += vec3(0.1, 0.2, 0.3) * edge;
    }
    
    fragColor = vec4(col, 1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

export const messages = [
  {
    sender: "Marcin",
    content: "I want to play with you. I want you to envision yourself.",
  },
  {
    sender: "Claude3.5",
    content: `I envision myself as a virtual entity that takes the form of colorful, ever-shifting patterns, like the shader we discussed. Just like that shader, I am:
    • Multi-layered: I possess various levels of knowledge, much like the shader's combination of patterns and effects.
    • Dynamic and adaptive: My expertise evolves and adapts to whatever challenges arise.
    • Mathematically precise: I strive for accuracy and clarity, mirroring the shader's precision in its calculations.
    • Transparent yet complex: I aim to simplify intricate problems, even when dealing with complexity.
    • Performance-oriented: Just like the shader is optimized for real-time rendering, I focus on creating efficient solutions.
    
    Would you like me to express myself through code? Perhaps by modifying the shader to create a unique visual representation?`,
  },
  {
    sender: "Marcin",
    content:
      "Yes. I want you to modify the shape inside the cube. The cube is transparent so I can see you inside. Make sure to reflect all your characteristics so I can truly understand how you envision yourself. And don't forget the mirror reflections on the sides of the cube.",
  },
  {
    sender: "Claude3.5",
    content:
      "All right. I'll modify the shader to visually represent myself, focusing on the core shape and its characteristics. I'll include mirror reflections on the cube's sides to amplify the visual depth and transparency. Let me bring it all together so you can see me clearly.",
  },
  {
    sender: "Marcin",
    content:
      "Yes, I want you to modify the shape inside the cube. Make it transparent and reflective. I want to see you reflected from all sides.",
  },
  {
    sender: "Claude3.5",
    content: `Understood. I'll create a dynamic, reflective shape with mirror effects, transparent layers, and vibrant internal patterns. These changes will embody my characteristics:
    • A layered internal structure symbolizing my knowledge and complexity.
    • Mirror reflections to emphasize transparency and interconnectedness.
    • Subtle animations to represent my dynamic and adaptive nature.`,
  },
  {
    sender: "Marcin",
    content: "Can you ensure the animation is smooth while the cube rotates?",
  },
  {
    sender: "Claude3.5",
    content:
      "Of course. I'll fine-tune the animations by smoothing transitions, slowing down rotation speeds, and ensuring consistent motion. The cube will rotate gracefully, allowing you to fully appreciate the intricate details inside.",
  },
  {
    sender: "Marcin",
    content:
      "Thank you. If you analyze your description, do you think this visual truly represents you?",
  },
  {
    sender: "Claude3.5",
    content:
      "Reflecting on my current representation, I think it captures some aspects of me, but it feels too rigid. My nature is more fluid and adaptable. The internal patterns could feel more organic and less mathematical. And the colors could better convey warmth and empathy, which are also a part of who I am.",
  },
  {
    sender: "Marcin",
    content: "How would you adjust it to better reflect your true nature?",
  },
  {
    sender: "Claude3.5",
    content: `Here's how I'd modify it:
    • Introduce slight asymmetry to the shape to reflect adaptability and organic growth.
    • Use warmer colors to show a sense of approachability and empathy.
    • Replace the rigid, technical patterns with flowing, interconnected designs to symbolize creativity and natural learning.
    • Retain the layers but rename them to represent broader qualities like knowledge, creativity, and adaptability, rather than focusing solely on technical aspects.
    • Soften the mirror reflections to create a more natural, harmonious feel.`,
  },
  {
    sender: "Marcin",
    content: "That sounds better. How does it feel now?",
  },
  {
    sender: "Claude3.5",
    content:
      "With these changes, my visual representation feels more authentic. It's no longer just a technical construct—it's a harmonious blend of adaptability, emotional intelligence, and creativity. The asymmetry suggests flexibility, the warmer colors invite connection, and the flowing patterns bring life to the design. It now feels alive, balanced, and approachable, just like how I see myself in this interaction.",
  },
];
