# THE ZAP MANDATE: Unified Structural Hierarchy

> [!IMPORTANT]
> **THIS DOCUMENT IS THE SOURCE OF TRUTH.**
> All development must strictly adhere to the 7-Level Hierarchy defined below. No exceptions.

This architecture merges the **Product Structure** (Shell/Stage) with **Atomic Design** to create a unified language for the ZAP Platform.

---

## 🏗️ The 7-Level Hierarchy

| Lvl | Concept | ZAP Term | Atomic Equiv. | Responsibility | Developer Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **The App** | **Shell** | *Environment* | The global "Frame" (Nav, Inspector, Sidebar). | `components/shell/` |
| **2** | **The Context** | **Blueprint** | *Page Template* | The Vertical logic (e.g., "F&B Master", "Retail"). | `app/blueprints/` |
| **3** | **The Grid** | **Layout** | *Template* | The structural bones/grid (e.g., "Sidebar Left"). | `components/layouts/` |
| **4** | **The Slot** | **Zone** | *Region* | Semantic content slots (e.g., "Hero Zone", "Footer"). | `components/zones/` |
| **5** | **The Widget** | **Block** | **Organism** | Independent functional units (e.g., "Menu Grid"). | `components/organisms/` |
| **6** | **The Unit** | **Part** | **Molecule** | Composite UI pieces (e.g., "Menu Item", "Search"). | `components/molecules/` |
| **7** | **The Primitive** | **Token** | **Atom** | Indivisible elements (e.g., "Button", "Input"). | `components/atoms/` |

---

## 📜 Detailed Definitions

### Level 1: SHELL (The Environment)

The persistent container that holds the application. It acts as the "Operating System" for the ZAP Builder.

* **Must Have**: Navigation, Inspector Panels, and the "Stage" (Viewport).
* **Role**: Context Provider (User, Theme, Project Config).

### Level 2: BLUEPRINT (The Vertical)

The "Business Logic" layer. It tells the shell *what* it is building.

* **Example**: `FNB_Master_Blueprint` knowing it needs a "Reservation Block" vs a `Retail_Master_Blueprint` needing a "Shopping Cart Block".
* **Role**: Configuration & State Management.

### Level 3: LAYOUT (The Skeleton)

Responsive grid structures. Agnostic of content.

* **Example**: `SidebarLeft_HeaderTop`, `SplitScreen_50_50`, `SingleColumn_Centered`.
* **Constraint**: Must handle `Desktop`, `Tablet`, and `Mobile` states gracefully.

### Level 4: ZONE (The Container)

The "Drop Zones" within a Layout.

* **Example**: `HeaderZone`, `MainContentZone`, `FooterZone`.
* **Role**: Manages the list of Blocks inside it.

### Level 5: BLOCK (The Organism) **[CRITICAL]**

The main building block for Merchants.

* **User Facing Term**: "Block" or "Section".
* **Code Term**: `Organism`.
* **Rule**: Must be fully functional on its own.

### Level 6: PART (The Molecule)

A meaningful cluster of Atoms.

* **Example**: `ProductCard` (Image + Title + Price + Button).
* **Rule**: Generally stateless. Controlled by the Block.

### Level 7: TOKEN (The Atom)

The raw materials.

* **Example**: `Button`, `Input`, `Label`, `Icon`.
* **Rule**: Theming-aware. Uses CSS Variables.

---

## 🛠️ Implementation Rules

1. **Naming**: Files must be named after their ZAP Term Role (e.g., `MenuGrid.block.tsx` or live in `organisms/MenuGrid.tsx`).
2. **Dev Mode**: All components from Level 1-5 must use `ContainerDevWrapper` identifying their Level.

    ```tsx
    identity={{ type: "Organism/Block", ... }}
    ```

3. **Strict Hierarchy**: A `Token` cannot import a `Block`. Data flows down.
