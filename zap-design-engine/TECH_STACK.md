# Technology Stack

## Core Framework

- **Runtime**: Node.js (Latest LTS)
- **Framework**: Next.js (Canary - `16.1.6`)
- **Library**: React 19 (`19.0.0`)
- **Language**: TypeScript (`^5.8.3`)

## Styling

- **Engine**: Tailwind CSS (`^4.0.0`)
- **Icons**: Lucide React (`^0.474.0`)
- **Animation**: CSS Variables + Transitions

## Testing

- **Runner**: Vitest (`^4.0.18`)
- **Playground**: Vitest UI (`^4.0.18`)
- **Browser**: Playwright (`^1.58.1`)
- **Environment**: JSDOM (`^28.0.0`)
- **Library**: React Testing Library (`^16.3.2`)

## CI/CD Infrastructure

- **Platform**: GitHub Actions
- **Quality Pipeline**: `ci.yml` (Lint, Type Check, Vitest)
- **Production Pipeline**: `build.yml` (Next.js Build Verification)
- **Environment**: Node.js 20 (Active LTS)

## Version Control Strategy (Hybrid)

Our ecosystem balances local design flexibility with repository-grade stability.

### 1. Internal History (Local Snapshots)

- **Role**: High-frequency iteration and "undo/redo".
- **Storage**: Browser `localStorage`.
- **Action**: Use the **"Save Version"** button in the Header.
- **Purpose**: Ideal for prototyping different themes without cluttering the Git history.

### 2. Cloud Integration (Source of Truth)

- **Engine**: MongoDB (via API Endpoint)
- **Status**: Transitioning from LocalStorage.
- **Process Owners**: Vuong and Linh (Reference: [MongoDB Integration Process](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/docs/mongodb-migration.md))
- **CI/CD Triggers**: Successful push to GitHub triggers the Quality and Build pipelines.

---

## AI Integration

- **SDK**: Google GenAI (`^1.38.0`)
- **Environment Strategy (AI Envelope)**:
  - **Local Development**: `.env.local` for developer-specific API keys. **(Recommended: Never commit this file)**.
  - **Staging**: GitHub Repository Secrets → GitHub Environment for staging-specific keys.
  - **Production**: Managed via Vercel Environment Variables.
- **App Settings Integration**:
  - The ZAP Design Engine will include a dedicated **"AI Settings"** module within the Workspace Settings UI.
  - This UI acts as a local bridge, allowing users to verify their AI configuration status without exposing sensitive keys in the codebase.
- **Goal**: Full separation of AI contexts between local, staging, and production tiers while providing a seamless builder experience.

## State Architecture (ZAP Store)

The `useStore` hook manages application state using a **3-Layer Inheritance Model** to support Admin control and Merchant customization.

### 1. Master Config (Layer 1)

- **Role**: Admin Only.
- **Purpose**: Defines the structural blueprint and default design tokens.
- **Persistence**: Persisted to local storage.

### 2. Merchant Override (Layer 2)

- **Role**: Merchant (and Admin simulation).
- **Purpose**: specific brand overrides (Colors, Fonts).
- **Logic**: Sparse object. Only contains keys that *differ* from Master.
- **Undefined Handling**: The store uses a **Smart Merge** strategy. If a merchant key is explicitly set to `undefined`, the store ignores it, allowing the Master value to shine through.

### 3. Computed Theme (Layer 3)

- **Role**: Consumption (UI).
- **Purpose**: The final merged object consumed by components.
- **Formula**: `Computed = Master + (Merchant - Undefined)`
- **Optimization**: Updates are debounced and CSS variables (`--primary`, `--radius`) are injected into the document root for Tailwind consumption.

---

## Development Skills & Workflows (MCP)

Our department uses standardized **Skills** to ensure consistency and speed. Developers are required to follow the **"1% Rule"**: If a skill might apply, you MUST use it.

### Core Skills Reference

- **[using-superpowers](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/using-superpowers/SKILL.md)**: The foundational skill for finding and using departmental workflows.
- **[skill-creator](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/skill-creator/SKILL.md)**: Standardized guide for creating and extending departmental skills.
- **[zap-integration](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/zap-integration/SKILL.md)**: Standardizes "ZAP-ifying" components with DevWrappers and Identity Pills.
- **[zap-testing](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/zap-testing/SKILL.md)**: Standardized Jest + RTL test generation for ZAP components.
- **[zap-inspector-icons](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/zap-inspector-icons/SKILL.md)**: Standardized procedure for adding visual icons to Inspector Accordions.
- **[frontend-motion](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/frontend-motion/SKILL.md)**: Centralized animation library using `@/lib/animations.ts` presets.
- **[frontend-component-refactor](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/frontend-component-refactor/SKILL.md)**: Rules for splitting high-complexity React components.
- **[devops-server-reset](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/devops-server-reset/SKILL.md)**: Robustly resets the local development environment.
- **[devops-clear-cache](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills/devops-clear-cache/SKILL.md)**: Safely clears the local Antigravity application cache.

### Workflow Integration

All skills are located in the [`.agent/skills`](file:///c:/Users/kayvi/AppData/Local/Programs/Antigravity/anti-gravity-projects/zap-design-engine/.agent/skills) directory. Use your agent's `view_file` tool to read the `SKILL.md` for any workflow before starting a task.
