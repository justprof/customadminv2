
# CustomAdmin v2

CustomAdmin v2 is a modern React 19 + Chakra UI v3 based admin dashboard template designed for building highly customizable, accessible, and responsive admin panels. This version is a complete redesign and migration of the earlier Chakra UI v2 + React 17 implementation, leveraging slot-based API, new theming structure, and full dark/light mode support.

## 🧩 Technologies Used

- **React 19**
- **Vite**
- **Chakra UI v3**
- **Redux Toolkit**
- **React Router DOM v7**
- **PropTypes**
- **Framer Motion**
- **React Icons**

## ⚙️ Features

- 💡 Light/Dark Mode toggle using `useColorModeValue`
- 🔧 Fully customizable form inputs: `TextBox`, `NumberBox`, `TextArea`, `SelectBox`, `FileUpload`
- 📋 DataTable with:
  - Sorting
  - Pagination
  - Column visibility toggling
  - Search/filter
  - Right-click ContextMenu
  - Toolbar buttons (Add, Export, Import)
  - Drawer and Modal support for forms
- 🎨 Chakra UI v3 theming using `colorPalette` tokens
- 🔄 Lazy loading images
- 🗂 Slot-based Chakra components: `Table.Root`, `Dialog.Root`, `Drawer.Root`, `Accordion.Root`
- ✅ Form validation and accessibility
- 📁 Favorites page with `Accordion`, `Menu`, and `Modal` examples
- 🧪 Clean architecture with reusable components and scoped props

Form Component
The Form component allows for dynamic form creation and management. Inputs received from the user are automatically collected into a state object within the component and processed through the onSubmit function. Components used inside the Form component receive custom props specific to the form, allowing for customization and validation.


const handleSubmit = (values) => {
    console.log("Form values:", values);
    alert(JSON.stringify(values, null, 2));
};

## 📁 Folder Structure

```
src/
├── admin/
│   └── pages/
│       └── dashboard/
│       └── favorites/
├── components/
│   ├── datatable/
│   ├── menu/
│   ├── modal/
│   ├── list/
│   ├── accordion/
│   ├── form/
│   ├── textbox/
│   ├── fileupload/
├── theme/
├── store/
├── App.jsx
```

## 📌 Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

## 🗃 Example Usage

```jsx
<DataTable
  columns={columns}
  data={tableData}
  totalCount={totalCount}
  rowsPerPage={5}
  onDataChange={fetchData}
  handleRefresh={() => data}
  deleteActive
  onDelete={(e) => console.log(e)}
  editActive
  onDeleteSelected={(e) => console.log(e)}
  contextMenuItems={contextMenuItems}
  onItemClick={handleItemClick}
  toolbarButtons={toolbarButtons}
  onToolbarButtonClick={(key) =>
    handleToolbarButtonClick(
      key,
      tableData.filter((row) => row.selected)
    )
  }
  defaultAddButton
  onSave={handleSaveData}
  showOn="drawer"
/>
```

## 👨‍💻 Author & Credits

This project was originally developed during a university internship at **Bimser Çözüm** in 2025.




- Onur ALTUNTAŞ – for project mentorship and guidance



