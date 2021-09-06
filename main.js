/**
 * @type {HTMLCanvasElement} canvas
 */
const canvas = document.getElementById('mycanvas');

/**
 * @type {WebGLRenderingContext} gl
 */
const gl = canvas.getContext('experimental-webgl');

var vertices = [-0.5, 0.5, 0.0, 0.0, 0.5, 0.0, -0.25, 0.25, 0.0];

// Create an empty buffer object to store the vertex buffer
var vertex_buffer = gl.createBuffer();

//Bind appropriate array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

const vertexShaderCode = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_Pointsize = 10.0;
  }
`;

// Create a vertex shader object
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
// Attach vertex shader source code
gl.shaderSource(vertexShader, vertexShaderCode);
// Compile the vertex shader
gl.compileShader(vertexShader);

const fragmentShaderCode = `
  void main() {
    gl_FragColor = verc4(0.0, 1.0, 1.0, 1.0);
  }
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderCode);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
// Get the attribute location
var coord = gl.getAttribLocation(shaderProgram, 'coordinates');
// Point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
// Enable the attribute
gl.enableVertexAttribArray(coord);

gl.clearColor(1.0, 1.0, 0.0, 0.0);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, 1);
