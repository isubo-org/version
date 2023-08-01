import prompts from 'prompts';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { enumPrereleaseCmd, enumBeforePrereleaseCmd, enumCmd, enumRealeaseTag } from './src/constant/enum.js';
import { getVersionNUms, isReleaseVersion } from './src/util/common.js';

export async function selectCmd(version) {
  const cmds = isReleaseVersion(version)
    ? enumBeforePrereleaseCmd
    : enumPrereleaseCmd;
  const choices = Object.values(cmds).map(cmd => ({
    title: cmd,
    value: cmd
  }));
  const cmd = (await prompts({
    type: 'select',
    name: 'value',
    message: `${chalk.greenBright('The current version is')} ${chalk.bgWhite(chalk.black(` ${version} `))}`,
    choices: choices
  })).value;

  let lastCmd = '';
  let args = {};
  switch (cmd) {
    case enumCmd.PREPATCH:
      lastCmd = `-r patch -p alpha`;
      args = { releaseAs: 'patch', prerelease: 'alpha' };
      break;
    case enumCmd.PREMINOR:
      lastCmd = `-r minor -p alpha`;
      args = { releaseAs: 'minor', prerelease: 'alpha' };
      break;
    case enumCmd.PREMAJOR:
      lastCmd = `-r major -p alpha`;
      args = { releaseAs: 'major', prerelease: 'alpha' };
      break;
    case enumCmd.PRERELEASE:
      lastCmd = `-p`;
      args = { prerelease: '' };
      break;
    case enumCmd.STAGE_NEXT: {
      if (version.includes(enumRealeaseTag.ALPHA)) {
        lastCmd = `-p ${enumRealeaseTag.BETA}`;
        args = { prerelease: enumRealeaseTag.BETA };
        break;
      } else if (version.includes(enumRealeaseTag.BETA)) {
        lastCmd = `-p ${enumRealeaseTag.RC}`;
        args = { prerelease: enumRealeaseTag.RC };
        break;
      } else {
        const verNums = getVersionNUms(version);
        const lastVersion = verNums.join('.');
        lastCmd = `-r ${lastVersion}`;
        args = { releaseAs: lastVersion };
        break;
      }
    }
    case enumCmd.RELEASE: {
      const verNums = getVersionNUms(version);
      const lastVersion = verNums.join('.');
      lastCmd = `-r ${lastVersion}`;
      args = { releaseAs: lastVersion };
      break;
    }
  }

  lastCmd = `standard-version ${lastCmd}`;
  return { cmd: lastCmd, args };
}

export function execmdSync(cmd) {
  try {
    execSync(cmd, {
      stdio: "inherit"
    }) 
  } catch (error) {
    
  }
}