import { ctx, defineConstStruct } from "../util/index.js";

export const enumRealeaseTag = defineConstStruct({
  ALPHA: 'alpha',
  BETA: 'beta',
  RC: 'rc'
});

export const enumSingleRCmd = defineConstStruct({
  MAJOR: 'major',
  MINOR: 'minor',
  PATCH: 'patch'
});

export const enumBeforePrereleaseCmd = defineConstStruct({
  PREPATCH: 'prepatch',
  PREMINOR: 'preminor',
  PREMAJOR: 'premajor'
});

export const enumPrereleaseCmd = defineConstStruct({
  PRERELEASE: 'prerelease',
  STAGE_NEXT: 'stage-next',
  RELEASE: 'release',
});

export const enumCmd = defineConstStruct({
  ...enumBeforePrereleaseCmd,
  ...enumPrereleaseCmd
});
