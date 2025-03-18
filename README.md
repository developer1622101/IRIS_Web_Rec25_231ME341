# IRIS_Web_Rec25_231ME341 

- Backend in src directory.     
  - Express 
- Frontend in views directory.  
  - React 

- No feature is completed yet and refining is required for existing code.  

## Commands 

### To start 
- cd views 
- npm run build 
- cd .. 
- npm run build 
- npm run start 

### To generate prisma client and create migration file
- npm  run  migrate 
    

## File Structure explained 

- src 
  - index.ts --> initialise the server  , routes defined. 
  - server.ts --> Dedicated to start the server.
  - controllers 
     - auth 
  - models  
    - crud operation  functions.
    - seeding the database. 
  - routes 

- Model 
  - used prisma for generating schema and making quries to  the database.
  - Database platform  - Neon DB 
  - Seeding the books database. 
    - Data collected using OpenLibrary Api.
    - Not completed yet.  

- Views
  - used create-react-app for react frontend
  - go to views 
    - npm install  
    - npm run build 
  - serving the static  build files from  views/build  
  - any get requests to the server return the index.html from  build folder.
  - ``` javascript 
        app.use(express.static(path.resolve(__dirname, '../views/build')))

        app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/build/index.html'))
        }) ```
        
- .env file not added in .gitignore as repo is private. 

- Issues 
  - TypeScript compiler is compiling node_modules even  after adding ["node_modules"] in exclude section.
