
# Dynamic Form Builder

This is a dynamic form builder application that allows users to create, manage, and fill out custom forms. The application is built with a modern tech stack and features a flexible architecture for creating complex form layouts.

## Table of Contents

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Architecture](#architecture)
- [Modes](#modes)
- [Field Configuration](#field-configuration)
- [Validation](#validation)
- [Performance](#performance)
- [Technical Implementation](#technical-implementation)
- [Component Hierarchy Diagram](#component-hierarchy-diagram)
- [State Management](#state-management)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Future Improvements](#future-improvements)

## Features

- **Dynamic Form Creation**: Easily create forms with sections, rows, and various field types.
- **Multiple Modes**: Create, View, Edit, and Preview modes for a complete form management lifecycle.
- **Flexible Layout**: Use Sections and Rows to organize fields and create complex layouts.
- **Variety of Field Types**: Supports Text, Number, Date, Select, Textarea, and Checkbox fields.
- **Field Configuration**: Customize field sizes, validation rules, and default values.
- **Collapsible Sections**: Sections can be collapsed for better organization of large forms.
- **Validation**: Real-time validation using Zod and React Hook Form.
- **LocalStorage**: Save and load forms from the browser's localStorage.
- **Saved Forms Management**: A dedicated page to view, open, and delete saved forms.
- **UI/UX Improvements**: A clean and intuitive UI with features like Material UI Autocomplete for a better user experience.

## Technical Stack

- **React**: For building the user interface.
- **TypeScript**: For static typing and improved developer experience.
- **React Hook Form**: For managing form state and validation.
- **Zod**: For schema-based validation.
- **Tailwind CSS**: For styling the application.
- **NX**: For managing the monorepo and running tasks.
- **Material UI Autocomplete**: For a better select field experience.
- **React Router**: For handling routing in the application.

## Architecture

The form layout is based on a three-level hierarchy: **Sections → Rows → Fields**.

- **Sections**: The top-level containers that group related fields. Each section has a title and can be collapsed, edited, or deleted.
- **Rows**: Within each section, there are rows that hold the fields. Each row can contain one or more fields.
- **Fields**: The actual input elements of the form. The layout of fields within a row is determined by their specified size. The total size of fields in a row cannot exceed 12.

### Metadata Schema

The structure of the form is defined by a metadata object with the following schema:

```typescript
// Section
export interface Section {
  id: string;
  title: string;
  rows: Row[];
}

// Row
export interface Row {
  id: string;
  fields: Field[];
}

// Field
export interface Field {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
  size: number; // 1-12
  validation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    patter?: string;
  };
  options?: string[]; // for select
  defaultValue?: string | boolean;
}
```

## Modes

The application supports four different modes:

- **Create Mode**: Start with a blank canvas to build a new form from scratch.
- **View Mode**: View a saved form's structure and fill it out.
- **Edit Mode**: Modify the structure of a saved form.
- **Preview Mode**: A read-only mode to see how the form will look to the end-user.

## Field Configuration

Each field can be configured with the following options:

- **Type**: The type of the field (e.g., Text, Number, Date).
- **Size**: The width of the field in a 12-column grid system.
- **Validation**: Rules like required, min/max length, and pattern matching.
- **Select Options**: For `select` fields, you can define the list of options.
- **Default Checkbox**: For `checkbox` fields, you can set the default value.

## Validation

Form validation is handled by a combination of Zod and React Hook Form. A Zod schema is dynamically generated from the form's metadata, and React Hook Form uses this schema to perform validation.

## Performance

Performance is a key consideration in this application. Here are some of the techniques used to ensure a smooth user experience:

- **`React.memo`**: Used to memoize components and prevent unnecessary re-renders.
- **`useCallback`**: Used to memoize functions and prevent re-creation on every render.
- **`useMemo`**: Used to memoize expensive calculations.
- **`React.lazy` and `Suspense`**: Used for lazy loading components and code-splitting.
- **Lighthouse Performance Review**: It is recommended to run a Lighthouse audit to get a detailed performance report.


## Technical Implementation

### Overall Architecture

The form builder's architecture is centered around a hierarchical metadata structure that defines the form's layout and behavior. The core principle is a unidirectional data flow, where the global state is managed by a React Context and passed down to the components.

### Metadata Storage and Updates

The form's structure is stored in a JSON object called `metadata`. This object follows a `sections → rows → fields` hierarchy. The `FormBuilderProvider` component is responsible for managing this `metadata`.

All updates to the `metadata` are performed immutably using the functional update pattern of `useState` (`setMetadata(prev => ...)`). This ensures that React's change detection works efficiently and prevents unintended side effects.

### Context API for Global State

The `FormBuilderContext` is used to provide the `metadata` and the functions to manipulate it to all the components in the component tree. This avoids prop drilling and provides a clean way to access and update the global state from any component.

### Dynamic Zod Schema Generation

The application dynamically generates a Zod schema from the `metadata` using the `generateZodSchemaForForm` utility. This function iterates through the `metadata` and creates a Zod schema that reflects the validation rules defined for each field.

The `useZodSchema` custom hook memoizes the generated Zod schema, ensuring that it is only regenerated when the `metadata` changes. This is a performance optimization that prevents unnecessary schema generation on every render.

### React Hook Form Integration

React Hook Form is used for form validation. It is integrated with the dynamically generated Zod schema using the `@hookform/resolvers/zod` resolver. This allows React Hook Form to use the Zod schema to validate the form fields in real-time.

## Component Hierarchy Diagram

```
App
├── Navbar
│   ├── NavbarModes
│   ├── NavbarPreviewDots
│   └── NavbarMobileMenu
│
├── AppRoutes
│   ├── FormBuilderPage
│   │   └── SectionComponent
│   │       └── RowComponent
│   │           └── FieldComponent
│   │               └── FieldControls
│   │
│   ├── PreviewForm
│   ├── SavedFormsPage
│   └── SavedFilledFormsPage
│
└── Footer

```

## State Management

### Metadata Flow

The `FormBuilderProvider` component is the single source of truth for the form's `metadata`. It passes the `metadata` and the update functions down to the components via the `FormBuilderContext`.

The components then use the `useContext` hook to access the `metadata` and the update functions. When a user interacts with the form builder (e.g., adds a new section, deletes a field), the corresponding update function is called, which in turn updates the `metadata` in the `FormBuilderProvider`.

### Submission Handling

The form submission is handled by the `PreviewForm` component. When the user submits the form, the `onSubmit` function from React Hook Form is called. This function receives the form data, which is then validated against the Zod schema.

If the validation is successful, the form data is passed to the `setSubmittedData` function from the `FormBuilderContext`. This function stores the submitted data in the `submittedData` state variable, which can then be used to display the submitted data or send it to a server.

## Installation

To get started with the project, you need to install the dependencies. This project uses pnpm as the package manager.

```bash
pnpm install
```

## Usage

### Running in Development Mode

To run the application in development mode, use the following NX command:

Running in Development Mode
$ npx nx serve form-builder

Creating a Production Build
$ npx nx build form-builder

Previewing the Production Build
$ npx nx preview form-builder

## Folder Structure

```
form-builder-workspace/
│
├── apps/
│   └── form-builder/
│       ├── public/
│       │   └── index.html
│       │
│       └── src/
│           ├── app/
│           │   └── App.tsx
│           │
│           ├── components/
│           │   ├── Field/
│           │   │   ├── Field.tsx
│           │   │   ├── FieldControls.tsx
│           │   │   └── FieldTypes/
│           │   │       ├── TextField.tsx
│           │       │   ├── NumberField.tsx
│           │       │   ├── DateField.tsx
│           │       │   ├── SelectField.tsx
│           │       │   ├── TextareaField.tsx
│           │       │   └── CheckboxField.tsx
│           │   │
│           │   ├── Row/
│           │   │   └── Row.tsx
│           │   │
│           │   ├── Section/
│           │   │   └── Section.tsx
│           │   │
│           │   ├── Preview/
│           │   │   └── PreviewForm.tsx
│           │   │
│           │   ├── Navbar/
│           │   │   ├── Navbar.tsx
│           │   │   ├── NavbarModes.tsx
│           │   │   ├── NavbarMobileMenu.tsx
│           │   │   └── NavbarPreviewDots.tsx
│           │   │
│           │   └── Footer/
│           │       └── Footer.tsx
│           │
│           ├── context/
│           │   ├── FormBuilderContext.tsx
│           │   └── FormBuilderProvider.tsx
│           │
│           ├── pages/
│           │   ├── FormBuilderPage.tsx
│           │   ├── SavedFormsPage.tsx
│           │   └── SavedFilledFormsPage.tsx
│           │
│           ├── routes/
│           │   └── AppRoutes.tsx
│           │
│           ├── types/
│           │   └── form.ts
│           │
│           ├── utils/
│           │   └── getExactWidth.ts
│           │
│           ├── validation/
│           │   └── validateMetadata.ts
│           │
│           ├── main.tsx
│           └── styles.css
│
├── package.json
├── nx.json
├── tsconfig.json
├── tsconfig.base.json
├── vite.config.mts
└── eslint.config.mjs

```

## Future Improvements

- **Drag and Drop**: Implement drag-and-drop functionality to re-order sections, rows, and fields.
- **Undo/Redo**: Add undo/redo functionality for a better user experience during form creation.
- **Backend Storage**: Integrate with a backend to store forms in a database instead of localStorage.
- **More Field Types**: Add more field types like file uploads, rich text editors, etc.
- **Theming**: Allow users to customize the look and feel of their forms.
- **Analytics**: Track form submissions and provide analytics.
