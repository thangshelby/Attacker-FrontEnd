# Types Structure

This directory contains all TypeScript type definitions organized by functionality.

## File Structure

### Core Types
- **`user.ts`** - User authentication and identity profile types
  - `User` - User interface
  - `AuthError` - Authentication error types
  - `IdentityProfile` - Identity profile interface
  - `Role`, `Gender` - Utility types

- **`student.ts`** - Student-related types
  - `Student` - Student interface

- **`academic.ts`** - Academic profile and document types
  - `AcademicProfile` - Academic profile interface
  - `AcademicDocument` - Academic document interface

- **`loan.ts`** - Loan and document types
  - `Loan` - Loan interface
  - `LoanApplication` - Loan application interface
  - `Document` - Document interface
  - `Status`, `DocumentType` - Utility types

### UI and Component Types
- **`ui.ts`** - UI components and form types
  - `Toast`, `Modal` - Notification types
  - `FormField` - Form field interface
  - `ButtonProps`, `InputProps`, `SelectProps`, `TableProps` - Component props
  - `LayoutProps`, `Theme` - Layout and theme types
  - `ToastType`, `ModalType` - Utility types

### API and Communication Types
- **`api.ts`** - API response and Web3 types
  - `ApiResponse<T>`, `PaginatedResponse<T>` - API response types
  - `Web3State` - Web3 state interface
  - `SocketEvent` - Socket event interface

### Notification and Chat Types
- **`notification.ts`** - Notification and chatbot types
  - `Notification` - Notification interface
  - `ChatMessage`, `ChatSession` - Chatbot types
  - `NotificationType` - Utility type

### Store Types
- **`store.ts`** - State management store types
  - `AuthStore` - Authentication store interface
  - `AppStore` - Application store interface
  - `NotificationStore` - Notification store interface
  - `Web3Store` - Web3 store interface

### Index File
- **`index.ts`** - Re-exports all types for easy importing
  - Use `import { User, Loan } from '@/types'` to import from any file

## Usage Examples

```typescript
// Import specific types
import { User, AuthError } from '@/types/user';
import { Loan, Document } from '@/types/loan';
import { Toast, ButtonProps } from '@/types/ui';

// Import from index (recommended for most cases)
import { User, Loan, Toast, AuthStore } from '@/types';
```

## Benefits of This Structure

1. **Modularity** - Types are organized by functionality
2. **Maintainability** - Easy to find and update specific types
3. **Scalability** - Easy to add new type files
4. **Import Flexibility** - Can import from specific files or index
5. **Type Safety** - Proper TypeScript support with no conflicts

## Adding New Types

1. Create a new file in the appropriate category
2. Export the types from that file
3. Add the export to `index.ts` if you want it available from the main import
4. Update this README if needed 