#!/usr/bin/env node

/**
 * Create Task with Unique ID
 * Generates CURRENT_TASK.md in project root with unique task ID
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

function generateTaskId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `TASK-${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function createTaskFile() {
    const taskId = generateTaskId();
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Read project version from package.json
    let projectVersion = 'unknown';
    try {
        const pkgPath = join(process.cwd(), 'package.json');
        const pkgContent = readFileSync(pkgPath, 'utf-8');
        const pkg = JSON.parse(pkgContent);
        projectVersion = `v${pkg.version}`;
    } catch (error) {
        // Use unknown if can't read package.json
    }

    const content = `# Current Task

**Task ID:** ${taskId}  
**Created:** ${timestamp}  
**Status:** Active  
**Project Version:** ${projectVersion} (from package.json)

## Objective

[Description of what you're working on]

## Task Breakdown

- [ ] [List your tasks here]

## Current Work

[What you're currently doing]

## Constraints

[Any constraints or limitations]

## Notes

- Task ID links to project version shown at bottom of app
- [Additional notes or context]
`;

    const taskPath = join(process.cwd(), 'CURRENT_TASK.md');
    writeFileSync(taskPath, content, 'utf-8');

    console.log(`✅ Created task file: ${taskPath}`);
    console.log(`📋 Task ID: ${taskId}`);
    console.log(`📦 Project Version: ${projectVersion}`);

    return taskId;
}

createTaskFile();
