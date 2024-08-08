# CSV Tool for finance management
- side project for personal use
- analyzes and visualizes finance data from csv files
- makes my monthly finance overview easier
- Terminal1: `npm run json-server`
- Terminal2: `npm run dev`

# Features and Ideas
  **V1**
- [x] Upload CSV file
    - [x] Remove File button
- [x] Display CSV data
- [x] Analyze CSV data
- [x] Visualize transaction in a table
- [x] hide/show table columns
- [x] categorize transactions (YouPay, GetBack, Income)
  - [x] color code categories
- [x] change category of transaction
- [x] calculate expenses and income
  - [x] calculate for each basic category
- [x] Export monthly finance overview (PDF)

----

**V2** 
- [ ] upload File using Drag and drop
- [x] add transactions manually
- [ ] delete transactions (+ undo)
- [x] ability to change keywords for getBack category
- [x] persist data in local storage (json-server)
- [ ] expense categories: Groceries, Free Time, Subscriptions etc.
  - [ ] KI Categorization  
  - [x] icon-coded categories
  - [ ] change category manually (DropDown)
  - [x] calculate expenses for each category
  - [ ] Visualize category data using charts TODO:
  - [ ] ability to add, change, delete categories (category name, keywords, icon)
- [ ] flash message to undo change
- [ ] clean up code, split up context, components

## Tech
- Frontend-only web app
- TechStack: React (JS), Vite, Bootstrap
- json-server to simulate backend