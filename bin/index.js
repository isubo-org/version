import fs from 'fs';
import yargs from 'yargs';
import { selectCmd } from '../main.js';
import standardVersion from 'standard-version';
import standardVersionArgs from 'standard-version/command.js';

const {
  version
} = JSON.parse(fs.readFileSync('package.json', 'utf8'));

yargs(process.argv.slice(2))
  .usage(
    `$0`,
    `Exec default cmd: 'isubo publish' to select posts for publishing.`,
    function builder(yargs) {
      return yargs;
    },
    async function handler() {
      const ret = await selectCmd(version);
      if (!Object.values(ret.args).length) {
        return;
      }
      console.info(`✔ ${ret.cmd}`);

      await standardVersion({
        ...standardVersionArgs.parse(),
        ...ret.args
      })
    }
  )
  .parse()
