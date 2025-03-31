precision highp float;

attribute vec2 a_p;
attribute vec2 a_t;

uniform mat4 umm;
uniform mat4 uvm;

uniform int t;

uniform float depth;
uniform float z;

uniform vec2 r;
uniform vec2 v;
uniform vec2 of;

varying vec2 vTexCoord;
varying vec2 vPosition;

void main() {
  vec4 pos = uvm * vec4(a_p.x, a_p.y, z, 1.0);
  gl_Position = umm * pos;
  vTexCoord = (a_t - 0.5) / r + 0.5 - of;
  vPosition = (pos.xy / v) + 0.5;
}