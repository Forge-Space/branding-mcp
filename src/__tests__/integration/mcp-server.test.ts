describe('MCP server', () => {
  it('module can be imported without errors', async () => {
    const mod = await import('../../lib/branding-core/index.js');
    expect(mod.generateColorPalette).toBeDefined();
    expect(mod.generateTypographySystem).toBeDefined();
    expect(mod.generateSpacingScale).toBeDefined();
    expect(mod.exportDesignTokens).toBeDefined();
    expect(mod.exportCssVariables).toBeDefined();
    expect(mod.exportTailwindPreset).toBeDefined();
    expect(mod.exportFigmaTokens).toBeDefined();
    expect(mod.exportReactTheme).toBeDefined();
    expect(mod.exportSassVariables).toBeDefined();
    expect(mod.validateBrandConsistency).toBeDefined();
    expect(mod.validateContrast).toBeDefined();
    expect(mod.generateSvgLogo).toBeDefined();
    expect(mod.defaultLogoConfig).toBeDefined();
  });

  it('v0.8.0 exports are available', async () => {
    const mod = await import('../../lib/branding-core/index.js');
    expect(mod.exportStyleDictionary).toBeDefined();
    expect(mod.generateBrandVoice).toBeDefined();
    expect(mod.generateGradientSystem).toBeDefined();
    expect(mod.generateShadowSystem).toBeDefined();
    expect(mod.generateBorderSystem).toBeDefined();
    expect(mod.generateMotionSystem).toBeDefined();
    expect(mod.generateFavicons).toBeDefined();
    expect(mod.generateOgImage).toBeDefined();
  });
});
