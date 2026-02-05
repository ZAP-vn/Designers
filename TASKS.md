# Feature: Customer List Implementation

## Overview
Implement a premium, high-performance Customer List view for the ZAP Design Engine. This component will serve as the central hub for managing merchant customers, featuring advanced filtering, search, and a polished UI consistent with the ZAP Design System.

## Status: 🏗️ In Progress
**Branch**: `feature/customer_list`

---

## 🛠 Task List

### 1. Foundation & Infrastructure
- [x] **Define Types**: Added `CustomerListEntry` and `PaginatedResponse` to `types.ts`.
- [x] **Service Layer**: Enhanced `customerApi` with `getCustomerList` method.
- [x] **Mock Data**: Created `customer.mock.ts` with high-fidelity customer records.

### 2. UI Components (ZAP Design System)
- [ ] **List Container**: Create a responsive container with ZAP-specific padding and spacing.
- [ ] **Customer Card/Row**:
    - [ ] Design a dense yet readable row item.
    - [ ] Add **Identity Pills** for status (Active, Inactive, Pending).
    - [ ] Include micro-animations (hover transitions, subtle entry effects).
- [ ] **Search & filter Bar**:
    - [ ] Implement a sticky search bar with loading states.
    - [ ] Add filter dropdowns (Status, Interest Grade, Join Date).

### 3. Logic & Interaction
- [ ] **Data Fetching**: Use `swr` or `react-query` patterns for efficient state management.
- [ ] **Pagination**: Implement "Load More" or Infinite Scroll with framer-motion loading skeletons.
- [ ] **Navigation**: Link row items to the Customer Detail view (drawer or page).

### 4. Polish & Visual Excellence
- [ ] **Glassmorphism**: Apply subtle glass effects to header/filter bars.
- [ ] **Transitions**: Smooth layout transitions when filtering or searching.
- [ ] **Responsive Design**: Ensure perfect layout from mobile to ultra-wide displays.

### 5. Testing & Quality Assurance
- [ ] **Unit Tests**: Test service calls and filtering logic.
- [ ] **Component Tests**: Ensure UI renders correctly across states (Loading, Empty, Error).
- [ ] **ZAP Inspector**: Add ZAP Inspector controls if this list needs theme customization.

---

## 🎨 Design Reference
- **Theme**: ZAP Dark Mode (Primary: #8B5CF6 / Violet-500)
- **Icons**: Lucide React
- **Animations**: Framer Motion (Presets from `@/lib/animations.ts`)

---

## 📝 Notes
- Use the `authService` for all API calls to ensure token persistence.
- Prioritize visual "Wow" factor in the list entry animations.
