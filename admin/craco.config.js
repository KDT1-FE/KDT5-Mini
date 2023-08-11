import CracoAlias from 'craco-alias'

export const plugins = [
  {
    plugin: CracoAlias,
    options: {
      source: 'tsconfig',
      baseUrl: './',
      tsConfigPath: 'tsconfig.path'
    }
  }
]
