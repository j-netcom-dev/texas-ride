import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { Logo } from './Logo'


export default defineConfig({
  name: 'default',
  title: 'Joyful Rides Studio',
  // icon: <Logo />,
  projectId: 'y20qg5is',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
})
