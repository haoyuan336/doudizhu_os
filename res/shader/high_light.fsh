#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord;
uniform float u_degree;

void main()
{
    vec4 texColor = texture2D(CC_Texture0, v_texCoord);
    float r = texColor.r * 0.5 + 0.2;
    float g = texColor.g * 0.5 + 0.5;
    float b = texColor.b * 0.5 + 0.5;
    gl_FragColor = mix(texColor, vec4(r, g, b, texColor.a), u_degree);
}