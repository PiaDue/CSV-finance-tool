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
- [ ] add transactions manually
- [ ] delete transactions manually (+ undo)
- [x] ability to change keywords for getBack category
- [x] persist data in local storage (json-server)
- [ ] expense categories: Food, free time, subscriptions etc.
  - [ ] icon-coded categories
  - [ ] calculate expenses for each category
  - [ ] Visualize category data using charts
  - [ ] ability to add categories (category name, keywords, icon)
  - [ ] ability to change categories
  - [ ] ability to delete categories
- [ ] flash message to undo change

## Tech
- Frontend-only web app
- TechStack: React (JS), Vite, Bootstrap
- json-server to simulate backend