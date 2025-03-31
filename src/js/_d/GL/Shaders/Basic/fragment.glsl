#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform sampler2D texture;

varying vec2 vTexCoord;
varying vec2 vPosition;

uniform int t;

uniform float o;
uniform float g;
uniform float k;
uniform float mM;

uniform vec2 s;
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

vec2 coverTexture(vec2 imageSize, vec2 uvCoords, vec2 mouse) {
  vec2 canvasSize = s;

  uvCoords.x -= mouse.x * 1.0;

  float canvasAspect = canvasSize.x / canvasSize.y;
  float imageAspect = imageSize.x / imageSize.y;
  vec2 adjustedSize = canvasAspect < imageAspect 
      ? vec2(imageSize.x * canvasSize.y / imageSize.y, canvasSize.y) 
      : vec2(canvasSize.x, imageSize.y * canvasSize.x / imageSize.x);
  
  vec2 offset = canvasAspect < imageAspect 
      ? vec2((adjustedSize.x - canvasSize.x) / 2.0, 0.0) 
      : vec2(0.0, (adjustedSize.y - canvasSize.y) / 2.0);
  
  offset /= adjustedSize; 
  
  vec2 resultUV = uvCoords * canvasSize / adjustedSize + offset;
  return resultUV;
}

void main() {
  vec3 color;
  float alpha = 1.0;

  if (t == 2) {
    float col = 5.0;

    vec2 textureSize = s;
    textureSize.x *= 1.0 + abs(mM);
    vec2 cover = coverTexture(textureSize, vTexCoord, vec2(mM, 0.0));

    vec2 cols = vec2(col, col);
    vec2 mouse = vTexCoord + vec2(mM * 0.5, 0.0);

    float horizontalOffset = abs(vTexCoord.x + mM);
    horizontalOffset += -0.5 + abs(mM) * 2.4;
    horizontalOffset *= 3.;

    float centralOffset = abs(1.0 - vTexCoord.x);
    centralOffset += -0.5 + abs(mM) * 0.5;
    centralOffset *= 3.0;

    float columnOffset = floor(centralOffset * cols.x) / cols.x;
    cover.x -= columnOffset / 2.;
    cover.x += abs(mM) * columnOffset * 0.2;
    cover.x += horizontalOffset * 1.2 * abs(mM) * columnOffset * 0.1;
    cover.x += columnOffset / 2.;

    color = texture2D(texture, cover).rgb;
    color = mix(color, computeGrayscale(color), g);
  } else {
    color = texture2D(texture, vTexCoord).rgb;
    color = mix(color, computeGrayscale(color), g);
  }
  
  alpha = computeSmoothstep(mTB.x, 1.0 - vPosition.y) * computeSmoothstep(mTB.y, vPosition.y);
  alpha *= computeSmoothstep(mLR.x, vPosition.x) * computeSmoothstep(mLR.y, 1.0 - vPosition.x);

  gl_FragColor = vec4(color, o * alpha);
}
