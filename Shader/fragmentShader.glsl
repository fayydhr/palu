uniform vec3 lightPosition;
uniform vec3 lightColor;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    float diff = max(dot(normalize(vNormal), normalize(lightPosition - vPosition)), 0.0);
    vec3 color = lightColor * diff;
    gl_FragColor = vec4(color, 1.0);
}
