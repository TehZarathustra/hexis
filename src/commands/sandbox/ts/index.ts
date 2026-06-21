import {spawnSync} from 'node:child_process'

export const tsSandbox = () => {
  console.log('TS sandbox launching...')

  spawnSync('./builder.sh')
}
