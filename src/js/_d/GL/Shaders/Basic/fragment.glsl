#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform sampler2D texture;

varying vec2 vTexCoord;
varying vec2 vPosition;

uniform int t;

uniform float o;
uniform float g;

uniform vec2 mTB;
uniform vec2 mLR;
uniform float mY;

float computeSmoothstep(float edge, float value) {
  float fwidthValue = fwidth(value);
  return smoothstep(edge - fwidthValue, edge + fwidthValue, value);
}

vec3 computeGrayscale(vec3 color) {
  return vec3((color.r + color.g + color.b) / 3.0);
}

void main() {
  vec3 color;
  float alpha = 1.0;

  color = texture2D(texture, vTexCoord).rgb;
  color = mix(color, computeGrayscale(color), g);
  
  alpha = computeSmoothstep(mTB.x, 1.0 - vPosition.y) * computeSmoothstep(mTB.y, vPosition.y);
  alpha *= computeSmoothstep(mLR.x, vPosition.x) * computeSmoothstep(mLR.y, 1.0 - vPosition.x);

  gl_FragColor = vec4(color, o * alpha);
}
