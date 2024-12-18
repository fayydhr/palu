// main.js
import { WebGLUtils, MathUtils } from './webgl-utils.js';
import ShaderManager from './shader.js';
import ParseUtility from './parse.js';

class WebGLRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.gl = this.canvas.getContext('webgl');
    
    if (!this.gl) {
      console.error('WebGL not supported');
      return;
    }

    this.shaderManager = new ShaderManager(this.gl);
    this.initializeRenderer();
  }

  initializeRenderer() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  async loadModel(objUrl) {
    const model = await ParseUtility.loadOBJ(objUrl);
    this.setupModelBuffers(model);
  }

  setupModelBuffers(model) {
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(model.vertices.flat()), this.gl.STATIC_DRAW);
  }

  createPerspectiveMatrix() {
    const fieldOfViewRadians = MathUtils.degToRad(60);
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    return MathUtils.perspective(fieldOfViewRadians, aspect, 1, 2000);
  }

  render() {
    WebGLUtils.resizeCanvasToDisplaySize(this.canvas);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Render logic here
    requestAnimationFrame(this.render.bind(this));
  }

  start() {
    this.render();
  }
}

export default WebGLRenderer;