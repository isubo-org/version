import { execSync } from 'child_process';

const cmd = `rm -rf dist && rollup -c rollup.config.js && sed -i '1i#!/usr/bin/env node' dist/bin/index.js`;
execSync(cmd, { stdio: 'inherit' })