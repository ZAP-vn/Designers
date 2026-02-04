---
name: git-workflow
description: Official Git & GitHub workflow standard for Antigravity Engineering Team. Use this skill for any git operations including setup, committing, branching, and merging logic to ensure team consistency.
---

# 🚀 Antigravity Git Skill Handbook

> **Purpose**: Standardize all Git & GitHub workflows for the Antigravity Engineering Team.

---

## 1️⃣ Git Repository Setup

Initialize and connect:
```bash
git init
git branch -M main
git remote add origin https://github.com/ORG/antigravity-project.git
git push -u origin main
```

Clone:
```bash
git clone https://github.com/ORG/antigravity-project.git
cd antigravity-project
```

---

## 2️⃣ Branching Strategy (Company Standard)

### Branch Types
```text
main        → Production (Stable)
develop     → Integration (Active Dev)
feature/*   → New features (e.g., feature/auth-middleware)
hotfix/*    → Production hotfixes (e.g., hotfix/login-crash)
release/*   → Release preparation (e.g., release/v1.2.0)
```

**Commands:**

Create feature branch:
```bash
git checkout -b feature/auth-jwt
```

Delete branch (after merge):
```bash
git branch -d feature/auth-jwt
git push origin --delete feature/auth-jwt
```

---

## 3️⃣ Commit Convention

Follow **Conventional Commits**: `type(scope): short description`

### Types
- `feat`: New feature
- `fix`: Bug fix
- `chore`: Config changes, dependency updates
- `docs`: Documentation only
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests
- `ci`: CI/CD config changes

**Example:**
```bash
git commit -m "feat(auth): add jwt middleware implementation"
```

---

## 4️⃣ Sync & Rebase Workflow

**Pull with rebase** (Recommended to keep history linear):
```bash
git pull --rebase origin develop
```

**Rebase feature on develop:**
```bash
git checkout feature/payment
git rebase develop
```

---

## 5️⃣ Merge & Release Flow

**Merge feature → develop:**
```bash
git checkout develop
git merge feature/payment
```

**Release Flow:**
```bash
git checkout -b release/v1.2.0
# ... perform final checks ...
git tag v1.2.0
git push origin v1.2.0
```

---

## 6️⃣ Conflict Resolution

1. Check status: `git status`
2. Fix files manually.
3. Continue rebase:
   ```bash
   git add .
   git rebase --continue
   ```
4. Or abort:
   ```bash
   git rebase --abort
   ```

---

## 7️⃣ History & Debugging

Visual log:
```bash
git log --oneline --graph --decorate --all
```

Trace changes:
```bash
git diff
git blame <filename>
```

---

## 8️⃣ Undo & Rollback

Undo last commit (keep changes):
```bash
git reset --soft HEAD~1
```

Revert pushed commit (safe for shared branches):
```bash
git revert <commit-id>
```

---

## 9️⃣ GitHub Pull Request Rules

- **Base branch**: `develop`
- **Reviewers**: At least 1
- **Status Checks**: CI must pass
- **Merge Strategy**: Squash merge only

Push feature for PR:
```bash
git push origin feature/auth-jwt
```

---

## 🔟 Security & .gitignore

**NEVER Commit:**
- `.env`, `.env.local`
- `node_modules/`
- `secrets.yaml`

Generate standard ignore:
```bash
npx gitignore node
# or
dotnet new gitignore
```

---

## ✅ Antigravity Best Practices

- **Small Commits**: Atomic changes are easier to review.
- **Clear Messages**: Explain the "why", not just the "what".
- **Rebase First**: Always rebase your feature branch/sync with develop before pushing.
- **No Direct Push to Main**: Always use PRs.

---

## 📦 Ownership

- **Maintainer**: Antigravity Engineering
- **Scope**: Backend, Frontend, DevOps, AI
