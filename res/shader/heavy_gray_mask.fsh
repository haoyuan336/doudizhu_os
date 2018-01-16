#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord;

void main()
{
    vec4 texColor = texture2D(CC_Texture0, v_texCoord);
    gl_FragColor = mix(texColor, vec4(0.1, 0.1, 0.1, texColor.a), 0.7);
    gl_FragColor.a = texColor.a;
}