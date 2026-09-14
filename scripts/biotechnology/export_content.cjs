const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, '../../app/research/biotechnology/content.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const result = { exports: {} };
new Function('exports', 'module', compiled)(result.exports, result);
process.stdout.write(JSON.stringify({ pieces: result.exports.pieces, thesis: result.exports.thesis, campaign: result.exports.campaign }));
