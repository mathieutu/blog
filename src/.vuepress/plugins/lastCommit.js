const spawn = require('cross-spawn');

module.exports = () => ({
  extendPageData($page) {
    $page.lastCommit = getGitLastCommit($page._filePath);
  }
});

function getGitLastCommit(filePath) {
  let lastCommit;
  try {
    lastCommit = spawn.sync('git', ['log', '-1', '--format=%h', filePath]).stdout.toString('utf-8').trim();
  } catch (e) { /* do not handle for now */
  }
  return lastCommit;
}
