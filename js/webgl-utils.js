// webgl-utils.js
class WebGLUtils {
    static createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }
  
    static createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
  
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
  
      return program;
    }
  
    static createTexture(gl, image) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return texture;
    }
  
    static resizeCanvasToDisplaySize(canvas) {
      const realToCSSPixels = window.devicePixelRatio;
      const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
      const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
  
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        return true;
      }
      return false;
    }
  
    static generateRandomData(count) {
      const data = new Float32Array(count * 3);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      return data;
    }
  }
  
  // Advanced matrix and vector math utilities
  class MathUtils {
    static degToRad(degrees) {
      return degrees * Math.PI / 180;
    }
  
    static perspective(fieldOfViewInRadians, aspect, near, far) {
      const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
      const rangeInv = 1.0 / (near - far);
  
      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ];
    }
  
    static multiply4x4Matrices(a, b) {
      const result = new Float32Array(16);
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          let sum = 0;
          for (let k = 0; k < 4; k++) {
            sum += a[row * 4 + k] * b[k * 4 + col];
          }
          result[row * 4 + col] = sum;
        }
      }
      return result;
    }
  }
  
  export { WebGLUtils, MathUtils };