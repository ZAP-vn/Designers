# TOKEN OPTIMIZATION & CONTEXT MANAGEMENT PROTOCOL

**OBJECTIVE**
Maximize the efficiency of the AI model's context window to ensure sustained high-quality performance over long development sessions.
**Goal**: Reduce "Fluff", prioritize "Logic".

---

## I. INPUT OPTIMIZATION (How to prompt)

### 1. Use Role-Based Shorthand
Instead of repeating technical constraints, leverage the pre-defined **System Prompt Roles**. The model already knows the stack based on the name.

* **Bad (High Token Cost)**:
    > "Create a new product card component. Make sure it uses HTML and Bootstrap and jQuery because that is what the frontend developer uses. Don't use Tailwind. Also make sure the backend api is C#."
* **Good (Optimized)**:
    > "Task for **Nguyen**: Create a `ProductCard` component.
    > Task for **Vuong**: Create the supporting `GET /products/{id}` endpoint."

### 2. "Delta" Updates Only
When requesting changes to code, ask for *only* the modified sections or specific functions, rather than the entire file, unless the file is small (<50 lines).

* **Prompt**: "Update `ProductService.cs`. Only show the modified `GetByIdAsync` method to handle Redis caching."

### 3. Reference, Don't Repaste
If a file is already in the chat history, reference it by name.
* **Prompt**: "Refactor `src/Frontend/style.css` from the previous turn to increase padding."

---

## II. OUTPUT CONSTRAINTS (How the AI should reply)

### 1. The "Anti-Gravity" Filter
The AI is instructed to be **Direct and Operational**.
* **Eliminate**: lengthy introductions ("Here is the code you asked for..."), moralizing, or summarizing obvious steps.
* **Prioritize**: The **Intent** sentence, the **Plan** bullets, and the **Code Block**.

### 2. Code Block Density
* **Comments**: Only comment *complex* logic or "Why" decisions. Skip obvious comments (e.g., `// Declare variable`).
* **Boilerplate**: Use `// ... existing code ...` placeholders for unchanged parts of large files.

---

## III. CONTEXT MAINTENANCE (Housekeeping)

### 1. The "Reset" Point
If the chat session becomes too long or the model starts hallucinating (forgetting constraints):
1.  **Stop** the current session.
2.  **Summary Prompt**: Ask the model to generate a "State Summary" of current architecture decisions.
3.  **New Session**: Start a new chat, paste the **System Prompt**, then paste the "State Summary".

### 2. File Tree Structure
Periodically ask the model to output the current `tree` structure of the project. This reinforces the directory layout without needing to read every file content.

---

## IV. EXAMPLE SHORTHAND DICTIONARY

| Shorthand | Expands To (Internal Logic) |
| :--- | :--- |
| **"Auth Flow"** | "Implement RBAC middleware (Vuong), Login UI (Nguyen), and JWT storage (Liem)." |
| **"Scale Check"** | "Review the code for 1,000 RPS loops, object allocations, and DB indexes." |
| **"Dev Mode"** | "Ensure Nguyen's HTML includes `data-debug` attributes and inspector classes." |
| **"ZAP It"** | "Apply strict ZAP Design System tokens (Colors, Spacing) to the UI." |