---
name: zap-inspector-development
description: Guide for building and refactoring ZAP Inspector components (Admin/Merchant controls).
---

# ZAP Inspector Development Skill

This skill defines the standard architecture for **Inspector** components in the ZAP Design Engine. Inspectors are the control panels used by Admins and Merchants to configure the Design System.

## 1. Architecture

Inspectors must be **standalone components**, typically located in `components/[Name]Inspector.tsx`.
Do NOT define them inline within Page or Section files.

```tsx
// ✅ Correct: components/ButtonInspector.tsx
export const ButtonInspector = ({ themeState, setThemeState }) => { ... }

// ❌ Incorrect: Inline inside UiKitSection.tsx
const InlineInspector = () => { ... }
```

## 2. Wrappers & Identity

Inspectors use a specific set of wrappers to enable AI-Context and visual hierarchy.

### A. The Main Container (`ContainerDevWrapper`)

Wraps the entire Inspector panel.

- **Identity Type**: `"Info/Legend"` (Triggers Pink Styling)
- **Display Name**: e.g. `"ButtonInspector"`
- **Atomic Rank**: `"Organism"`

```tsx
<ContainerDevWrapper
    identity={{
        displayName: "ButtonInspector",
        type: "Info/Legend", // Critical for Pink Theme
        filePath: "components/ButtonInspector.tsx"
    }}
    // ...
>
    {/* Content */}
</ContainerDevWrapper>
```

### B. Input Controls (`ControlDevWrapper`)

Wraps individual inputs (sliders, color pickers) to provide token-level context.

- **Required Prop**: `tokenKey` (Matches `themeState` property).
- **Visual**: Pink dashed border.

```tsx
<ControlDevWrapper 
    active={showClassNames} 
    tokenKey="borderRadius" 
    filePath="components/ButtonInspector.tsx"
>
    <RangeInput label="Radius" ... />
</ControlDevWrapper>
```

## 3. Visual Styling

Inspectors use a **Pink** color scheme to differentiate them from the **Blue** preview components.

- **Borders**: `border-pink-300` (Applied automatically by `Info/Legend` type).
- **Pills**: `bg-pink-50`, `text-pink-700`.

## 4. State Management

Inspectors must support the Dual-Role model (Admin vs Merchant).

### Accessing Roles

Use the global store to determine permissions.

```tsx
const { userRole, setMasterConfig, setMerchantOverride } = useStore();

const updateTheme = (update) => {
    // Admin writes to MasterConfig, Merchant writes to Override
    const action = userRole === 'admin' ? setMasterConfig : setMerchantOverride;
    action(update);
};
```

### Admin-Only Controls

Wrap layout/physics controls in a role check.

```tsx
{userRole === 'admin' && (
    <InspectorAccordion title="Physics">
        {/* Sliders for padding, radius, etc. */}
    </InspectorAccordion>
)}
```

## 5. Learning: Streamlined vs. Modular Identity

When developing complex inspectors, choose the identity granularity carefully to balance **AI Visibility** with **Visual Noise**.

### A. The "Legend" Standard (Streamlined)

For most inspectors, use a **single root `ContainerDevWrapper`** and **multiple internal `ControlDevWrapper`** components.

- **Root**: Shows the specialized Pink identity pill (Legend).
- **Tokens**: Hovering surfaces the specific token key (e.g., `primary`) without cluttering the UI with multiple large section headers.
- **Best for**: Standard tool panels (Project, Sitemap, Typography).

### B. Modular Identity (Advanced)

Only use nested `ContainerDevWrapper` sections when a specific sub-domain is so complex it needs its own independent `displayName` or `type` (e.g., `GeometryEngine`).

- **Caution**: Nested wrappers add multiple "ORGANISM" pills. If this causes visual clutter, revert to the **Legend Standard** (Root + Atomic Tokens).

## 6. Cleanup Protocol

Always perform a full audit after removing UI elements:

1. **State**: Remove unused `useState` hooks (e.g., view toggles).
2. **Handlers**: Delete dead logic (e.g., JSON stringifiers).
3. **Icons**: Clean up `lucide-react` imports to keep the bundle lean.
4. **Build**: Verify with `tsc` to ensure no orphan references remain.

## 7. Checklist for Refactoring

When converting or updating an inspector:

1. [ ] Extract to valid file `components/[Name]Inspector.tsx`.
2. [ ] Replace inline styles with `ControlDevWrapper` for all tokens.
3. [ ] Apply `Info/Legend` identity type to the root container.
4. [ ] **Audit Clutter**: Remove redundant section identity pills if they overlap with component content.
5. [ ] **AI Fidelity**: Ensure `tokenKey` accurately reflects the `themeState` property for high-fidelity LLM interaction.
