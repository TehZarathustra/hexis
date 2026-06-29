import {spawnSync} from 'node:child_process'

export const tsSandbox = () => {
  console.log('TS sandbox launching...', process.cwd())

  const cwd = process.cwd();
  const scriptPath = `${cwd}/src/commands/sandbox/ts/start_session.sh`;

  const res = spawnSync('sh', [scriptPath], {
    env: {
      ...process.env,
      hexis_path: cwd
    },
    stdio: 'pipe',
    encoding: 'utf8'
  })

  // debug
  console.log({
    error: res.error,
    status: res.status,
    signal: res.signal,
    stdout: res.stdout,
    stderr: res.stderr,
  });
}
