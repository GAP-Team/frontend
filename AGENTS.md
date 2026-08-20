Git workflow rules:

- NEVER make changes directly on the `developer` branch.
- NEVER commit changes to `developer`.
- Before making any code changes, check the current Git branch.
- If currently on `developer`, create and switch to a new feature branch first.
- Branch names should follow this convention:
  - feature/<short-description> for new features
  - fix/<short-description> for bug fixes
  - refactor/<short-description> for refactoring
  - chore/<short-description> for maintenance
- Always create the branch from the latest `developer` branch.
- Keep frontend and backend Git repositories independent. Create the appropriate branch in each repository that needs changes.
- Before modifying files, confirm that the working branch is NOT `developer`.
- Never push directly to `developer`.