import { GitCategory } from './types';

export const GIT_CATEGORIES: GitCategory[] = [
  {
    id: 'setup',
    title: 'Setup & Config',
    description: 'Configure user information and initialize repositories.',
    commands: [
      {
        cmd: 'git config',
        description: 'Set configuration values for your user name, email, repository, etc.',
        example: 'git config --global user.name "John Doe"',
        flags: [
          { flag: '--global', description: 'Apply configuration globally for the current user' },
          { flag: '--list', description: 'List all configuration settings' }
        ]
      },
      {
        cmd: 'git init',
        description: 'Initialize a new git repository in the current directory.',
        example: 'git init my-project',
        flags: [
          { flag: '-b <branch>', description: 'Specify the initial branch name (e.g., main)' }
        ]
      },
      {
        cmd: 'git clone',
        description: 'Clone a repository into a new directory.',
        example: 'git clone https://github.com/user/repo.git',
        flags: [
          { flag: '--depth <n>', description: 'Create a shallow clone with a history truncated to the specified number of commits' },
          { flag: '-b <branch>', description: 'Clone only a specific branch' }
        ]
      }
    ]
  },
  {
    id: 'basics',
    title: 'Basic Snapshotting',
    description: 'Basic commands for working with files and commits.',
    commands: [
      {
        cmd: 'git add',
        description: 'Add file contents to the staging area.',
        example: 'git add .',
        flags: [
          { flag: '-A', description: 'Add all changes (new, modified, and deleted files)' },
          { flag: '-p', description: 'Interactively choose hunks of patch between the index and the work tree' }
        ]
      },
      {
        cmd: 'git status',
        description: 'Show the working tree status.',
        example: 'git status',
        flags: [
          { flag: '-s', description: 'Give the output in the short-format' }
        ]
      },
      {
        cmd: 'git commit',
        description: 'Record changes to the repository.',
        example: 'git commit -m "Fix login bug"',
        flags: [
          { flag: '-m "<msg>"', description: 'Use the given <msg> as the commit message' },
          { flag: '-a', description: 'Tell the command to automatically stage files that have been modified and deleted' },
          { flag: '--amend', description: 'Replace the tip of the current branch by creating a new commit' }
        ]
      }
    ]
  },
  {
    id: 'branching',
    title: 'Branching & Merging',
    description: 'Manage branches and merge changes.',
    commands: [
      {
        cmd: 'git branch',
        description: 'List, create, or delete branches.',
        example: 'git branch feature-login',
        flags: [
          { flag: '-d', description: 'Delete a branch' },
          { flag: '-a', description: 'List both remote-tracking branches and local branches' }
        ]
      },
      {
        cmd: 'git checkout',
        description: 'Switch branches or restore working tree files.',
        example: 'git checkout main',
        flags: [
          { flag: '-b <branch>', description: 'Create and switch to a new branch' }
        ]
      },
      {
        cmd: 'git switch',
        description: 'Switch branches (newer alternative to checkout).',
        example: 'git switch develop',
        flags: [
          { flag: '-c <branch>', description: 'Create and switch to a new branch' }
        ]
      },
      {
        cmd: 'git merge',
        description: 'Join two or more development histories together.',
        example: 'git merge feature-branch',
        flags: [
          { flag: '--abort', description: 'Abort the current conflict resolution process' },
          { flag: '--squash', description: 'Merge changes but do not create a merge commit' }
        ]
      }
    ]
  },
  {
    id: 'sharing',
    title: 'Sharing & Updating',
    description: 'Fetch, pull, and push changes from/to remotes.',
    commands: [
      {
        cmd: 'git fetch',
        description: 'Download objects and refs from another repository.',
        example: 'git fetch origin',
        flags: [
          { flag: '--all', description: 'Fetch all remotes' },
          { flag: '--prune', description: 'Remove any remote-tracking references that no longer exist on the remote' }
        ]
      },
      {
        cmd: 'git pull',
        description: 'Fetch from and integrate with another repository or a local branch.',
        example: 'git pull origin main',
        flags: [
          { flag: '--rebase', description: 'Rebase the current branch on top of the upstream branch after fetching' }
        ]
      },
      {
        cmd: 'git push',
        description: 'Update remote refs along with associated objects.',
        example: 'git push origin main',
        flags: [
          { flag: '-u', description: 'Set upstream for git pull/status' },
          { flag: '--force', description: 'Force overwrite the remote branch (use with caution)' }
        ]
      }
    ]
  },
  {
    id: 'inspection',
    title: 'Inspection & Comparison',
    description: 'Examine logs, diffs, and object information.',
    commands: [
      {
        cmd: 'git log',
        description: 'Show commit logs.',
        example: 'git log --oneline --graph',
        flags: [
          { flag: '--oneline', description: 'Display each commit on a single line' },
          { flag: '--graph', description: 'Draw a text-based graphical representation of the commit history' },
          { flag: '-n <count>', description: 'Limit the number of commits to output' }
        ]
      },
      {
        cmd: 'git diff',
        description: 'Show changes between commits, commit and working tree, etc.',
        example: 'git diff HEAD~1 HEAD',
        flags: [
          { flag: '--staged', description: 'Show changes between the index and the last commit' },
          { flag: '--name-only', description: 'Show only names of changed files' }
        ]
      }
    ]
  },
  {
    id: 'undoing',
    title: 'Undoing Changes',
    description: 'Revert, reset, and fix mistakes.',
    commands: [
      {
        cmd: 'git reset',
        description: 'Reset current HEAD to the specified state.',
        example: 'git reset --soft HEAD~1',
        flags: [
          { flag: '--soft', description: 'Keep changes in the staging area' },
          { flag: '--hard', description: 'Discard all changes in working directory and staging area' }
        ]
      },
      {
        cmd: 'git restore',
        description: 'Restore working tree files.',
        example: 'git restore package.json',
        flags: [
          { flag: '--staged', description: 'Unstage files (move changes from staging to working directory)' }
        ]
      },
      {
        cmd: 'git revert',
        description: 'Create a new commit that undoes changes from a previous commit.',
        example: 'git revert <commit-hash>',
        flags: [
          { flag: '--no-commit', description: 'Revert changes but do not automatically create a commit' }
        ]
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Stashing, rebasing, and cherry-picking.',
    commands: [
      {
        cmd: 'git stash',
        description: 'Stash the changes in a dirty working directory away.',
        example: 'git stash push -m "WIP styling"',
        flags: [
          { flag: 'pop', description: 'Remove a single stashed state from the stash list and apply it' },
          { flag: 'list', description: 'List the stash entries' }
        ]
      },
      {
        cmd: 'git rebase',
        description: 'Reapply commits on top of another base tip.',
        example: 'git rebase main',
        flags: [
          { flag: '-i', description: 'Interactive mode (squash, fixup, edit commits)' },
          { flag: '--continue', description: 'Restart the rebasing process after resolving a conflict' }
        ]
      },
      {
        cmd: 'git cherry-pick',
        description: 'Apply the changes introduced by some existing commits.',
        example: 'git cherry-pick <commit-hash>',
        flags: [
          { flag: '--no-commit', description: 'Apply changes but do not commit them' }
        ]
      }
    ]
  }
];
