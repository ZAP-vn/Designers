# Recovery & Rollback Guide

This guide ensures you can safely recover your project state using the automated GitHub tagging system.

## 1. Automated Backups (Tags)

Every successful merge to the `main` branch triggers an automatic tag.
Tags follow the format: `v<version>-build-<timestamp>`

## 2. Recovery Procedure (Rollback)

If a breaking change is merged and you need to roll back:

### Method A: Local Rollback (For Development)

1. Fetch latest tags:

   ```bash
   git fetch --tags
   ```

2. Checkout the specific tag:

   ```bash
   git checkout tags/v1.0.3-build-20231027120000
   ```

3. (Optional) Create a new branch from this tag:

   ```bash
   git checkout -b fix/recovery-from-failed-deploy
   ```

### Method B: GitHub Verification

1. Go to the **Actions** tab in GitHub.
2. Select **Recovery Verification**.
3. Click **Run workflow**, enter the `tag_name`, and run.
4. If it passes, you know this version is safe to redeploy.

## 3. Best Practices

- Always verify a recovery tag using the **Recovery Verification** workflow before deploying it to production.
- Never delete automated tags; they serve as your project's history and backup points.
