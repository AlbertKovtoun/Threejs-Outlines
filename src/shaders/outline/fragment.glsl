uniform sampler2D tDiffuse;
uniform vec3 uTintColor;

varying vec2 vUv;

void main()
{
    vec4 color = texture2D(tDiffuse, vUv);

    color.rgb *= uTintColor;

    gl_FragColor = color;
}

