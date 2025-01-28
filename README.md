# AI Self Image

An interactive web application exploring how artificial intelligence visualizes and perceives itself, built with Next.js, TypeScript, and Three.js.

## Overview

AI Self Image is a unique project that provides an interactive platform for exploring AI self-perception through visual and conversational interfaces. The application combines advanced shader programming, real-time 3D graphics, and AI dialogue to create an immersive experience.

## Key Features

- **Interactive 3D Visualization**: Custom shader implementation showing AI's self-visualization
- **Conversational Interface**: Dynamic chat interface for interacting with AI
- **Responsive Design**: Fluid layout adapting to all screen sizes
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **High Performance**: Optimized WebGL rendering and smooth animations

## Technologies

- **Framework**: Next.js 15.1.6
- **Language**: TypeScript
- **3D Graphics**: Three.js
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Shader Programming**: GLSL

## Project Structure

```
ai-self-image/
├── app/
│   ├── claude3-5/           # Claude AI specific implementation
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components (bento-grid, chat, etc.)
│   │   ├── ColorfulBoxShader.tsx
│   │   └── ShaderDemo.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## Core Components

1. **BentoGrid**: A responsive grid layout for showcasing AI visualizations
2. **ShaderDemo**: Interactive 3D visualization using custom GLSL shaders
3. **Chat Interface**: Real-time conversation component with AI
4. **ColorfulBoxShader**: Advanced shader implementation for AI self-representation

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd ai-self-image
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technical Implementation

### Shader Visualization

The project features a sophisticated shader implementation that represents AI's self-perception through:

- Organic, fluid patterns representing adaptability
- Multi-layered knowledge representation
- Dynamic neural network-like patterns
- Warm color schemes for approachability
- Interactive reflections and transparencies

### Interactive Features

- Real-time 3D rendering with Three.js
- Smooth animations and transitions
- Responsive layout adapting to various screen sizes
- Optimized performance through efficient shader computations

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
