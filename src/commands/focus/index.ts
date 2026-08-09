import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const {dirname} = import.meta;

const shScripts = {
  clear: resolve(dirname, 'clear.awk'),
  hostsToBlock: resolve(dirname, 'hosts_to_block'),
  blockHosts: resolve(dirname, 'block_hosts.sh'),
  unblockBlockHosts: resolve(dirname, 'unblock_hosts.sh'),
} as const;

const runProcess = (scriptPath: string) => {
  const res = spawnSync('sh', [scriptPath], {
    env: {
      ...process.env,
      clear: shScripts.clear,
      hostsToBlock: shScripts.hostsToBlock,
    },
    stdio: 'inherit',
    encoding: 'utf8'
  });

  return res.status;
};

const isSuccess = (processStatus: number | null) =>
  processStatus === 0;

const commands = {
  start: () => {
    const process = runProcess(shScripts.blockHosts);

    return isSuccess(process)
      ? 'hosts has been blocked. restart the browser'
      : 'error: could not block the host';
  },
  stop: () => {
    const process = runProcess(shScripts.unblockBlockHosts);

    return isSuccess(process)
      ? 'hosts has been unblocked. restart the browser'
      : 'error: could not unblock the host';
  },
} as const;

type Commands = typeof commands;

const isSupported = (cmd: string): cmd is keyof Commands =>
  Object.hasOwn(commands, cmd);

export const focus = () => {
  return {
    focus: ([cmd]: string[]) => {
      return isSupported(cmd)
        ? commands[cmd]()
        : `${cmd}: unsupported cmd`;
    }
  }
}
