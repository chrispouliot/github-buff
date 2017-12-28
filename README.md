# github-buff

Buff your Github contributor graph with daily commits to a repository of your choosing.

## Usage

Required environment variables

```bash
REPO_URL      # URL
GITHUB_TOKEN  # API Token
REPO_NAME     # Name of repository
COMMIT_FILE   # Name of file to write to
AUTHOR_NAME   # Your name
AUTHOR_EMAIL  # Your email address
```

Easily run on a schedule of your choosing using AWS Lamba and a CloudWatch scheduled event as a trigger. Upload release zip as code.
