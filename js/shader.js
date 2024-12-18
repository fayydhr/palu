// shader.js
class ShaderManager {
    constructor(gl) {
      this.gl = gl;
      this.shaderCache = new Map();
    }
  
    loadShader(type, source) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
  
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
      }
  
      return shader;
    }
  
    createProgram(vertexShaderSource, fragmentShaderSource) {
      const cacheKey = vertexShaderSource + fragmentShaderSource;
      
      if (this.shaderCache.has(cacheKey)) {
        return this.shaderCache.get(cacheKey);
      }
  
      const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
      
      const program = this.gl.createProgram();
      this.gl.attachShader(program, vertexShader);
      this.gl.attachShader(program, fragmentShader);
      this.gl.linkProgram(program);
  
      if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        console.error('Program linking error:', this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
        return null;
      }
  
      this.shaderCache.set(cacheKey, program);
      return program;
    }
  
    static vertexShaders = {
      basic: `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_matrix;
        varying vec4 v_color;
        void main() {
          gl_Position = u_matrix * a_position;
          v_color = a_color;
        }
      `,
      textured: `
        attribute vec4 a_position;
        attribute vec2 a_texcoord;
        uniform mat4 u_matrix;
        varying vec2 v_texcoord;
        void main() {
          gl_Position = u_matrix * a_position;
          v_texcoord = a_texcoord;
        }
      `
    }
  
    static fragmentShaders = {
      basic: `
        precision mediump float;
        varying vec4 v_color;
        void main() {
          gl_FragColor = v_color;
        }
      `,
      textured: `
        precision mediump float;
        varying vec2 v_texcoord;
        uniform sampler2D u_texture;
        void main() {
          gl_FragColor = texture2D(u_texture, v_texcoord);
        }
      `
    }
  }
  
  export default ShaderManager;