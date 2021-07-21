export const formatAuthor = (string) => {
  return string.split(",").map((author) => {
    const githubUserName = author.match(/\@([^)]+)[^\)]/g);
    const regexToRemoveGithubUserName = /\s*\(([^)]+)\)\s*/g;
    const name = author.replace(regexToRemoveGithubUserName, "");

    return [name, githubUserName !== null ? githubUserName[0].replace("@", "") : null];
  });
};
