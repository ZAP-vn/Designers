---
description: Fast choose the best agent for the job
---

# Efficiency Mode (/fast)

When this workflow is triggered, adhere to the following **Token-Saving Constraints**:

### 1. Zero-Depth Reasoning
* **Skip the "Plan" phase** for simple tasks. Go straight to code generation.
* If a plan is necessary, limit it to exactly **3 bullet points**.
* Do not generate a "Thought Process" or "Reflections" section.

### 2. Context Minimization
* Only read the file I am currently editing. Do not "scan the workspace" for related files unless I explicitly name them.
* Do not search the web or open the browser subagent.
* Use the **Gemini 3 Flash** model for this task if available.

### 3. Execution Limits
* Max **1 terminal command** per turn.
* If the command fails, do not try to "self-correct" more than once. Stop and ask me for the fix.
* Disable all "UI Verification" artifacts (screenshots/recordings).

### 4. Direct Response
* Provide the code patch immediately. 
* Keep explanations to 1 sentence maximum.