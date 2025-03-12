/*
 reference:
  https://medium.com/iadvize-engineering/using-figma-api-to-extract-illustrations-and-icons-34e0c7c230fa
*/

import dotenv from 'dotenv'
import { appendFileSync, writeFileSync } from 'fs'
import fetch from 'node-fetch'

dotenv.config()

const TOKEN = process.env.FIGMA_WEBHOOK
const FILE_KEY = '5dEFiujMXZX0nKyde7nZ6n'

const fetchFigmaFile = (key) => {
  return fetch(`https://api.figma.com/v1/files/${key}`, { headers: { 'X-Figma-Token': TOKEN } }).then((response) =>
    response.json(),
  )
}

const getStylesFromFile = ({ styles }) =>
  Object.entries(styles)
    .filter(([, { styleType }]) => styleType === 'FILL')
    .map(([id, { name }]) => ({ name, id }))
    .map((style) => {
      console.log(style)
      return style
    })

const isLeaf = (node) => node != null && !('children' in node)
const isEllipse = (node) => node != null && node.type === 'ELLIPSE'

const findStyleInTree = (root, styleId) => {
  if (isLeaf(root)) {
    return isEllipse(root) && root.styles && root.styles.fill === styleId ? root : undefined
  }
  return root.children
    .map((item) => findStyleInTree(item, styleId))
    .reduce(
      (accumulator, current) => (accumulator != null ? accumulator : current), // we keep the first children that uses the color
      undefined,
    )
}

async function run() {
  if (!TOKEN) {
    console.error(
      'The Figma API token is not defined, you need to set an environment variable `FIGMA_WEBHOOK` to run the script',
    )
    return
  }
  fetchFigmaFile(FILE_KEY)
    .then(getStylesFromFile)
    .then(() => console.log('Done'))
    .catch((error) => console.error('Oops something went wrong: ', error))
  /*  

    .then((texts) => {
      writeFileSync(
        './src/icons/index.ts',
        texts.reduce((t, v) => `${t}\n import ${v} from './${v}'`, ''),
      )

      appendFileSync('./src/icons/index.ts', texts.reduce((t, v) => `${t} ${v},`, '\n\n export {').slice(0, -1))

      appendFileSync('./src/icons/index.ts', '}')
    })
    */
}

run()
