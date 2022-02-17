import { $ } from 'zx';

function parseLsTreeOutput(output) {
  console.log('output:', output.length, output);
  const last = output[output.length - 1];
  console.log('output last:', last.length, last.charCodeAt(0), last);
  const lines = output.split('\x00');
  console.log('lines=', lines.length);
  return lines.map(line => {
    const [mode, type, object, file] = line.split(/[ \t]/, 4);
    return { mode, type, object, file };
  });
}

async function listTree(repoPath, treePath = '') {
  const options = [
    '-z', // \0 line termination on output and do not quote filenames
    // '-r',
    // '-t',
  ];
  const args = [
    `master:${treePath}`,
  ];

  let output;
  try {
    output = await $`git -C ${repoPath} ls-tree ${options} master:${treePath}`;
  } catch (p) {
    throw new Error('list tree error: ' + p.toString());
  }
  return parseLsTreeOutput(output.stdout);
}

const results = await listTree('/home/ubuntu/myproject');
