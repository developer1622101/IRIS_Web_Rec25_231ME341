

# IRIS_Web_Rec25_231ME341  


## screen recordings in public directory 

## installation instructions :  
   -  git clone ...link... 
   -  from root 
       -   1. npm install 
           2. cd views && npm install
 
## To run  
 -   Build frontend files and run server , if changes to frontend  -> npm run start   

 -   If changes in backend -> tsc  

 -   run the app  -> npm run server 



## Implemented features : 
   -  Authentication / Authorisation  
      -  All features listed  in  docs.
      -  Except:   
            - Librarian can add new books and journals.
            - No duration for ban.
   -  Books and Journals 
       - All features listed  in  docs.
       - Except: 
            - No further borrowing can be done of the same book
            - No implementation of journals.
   -  Dues Management 
       - Automatic dues updating  using node-cron. file location : /src/models/schedules/updateDues.ts
       


# references 
- 'https://medium.com/developer-rants/   follow-up-how-to-tell-if-an-object-conforms-to-a-typescript-interface-f99b4b77d602' 
   To match object keys with an interface.
- api for books data - 'https://openlibrary.org' , Data seeded -> /src/models/seed/bookData2.js


# extra..


- Backend in src directory.     
  - Express 
- Frontend in views directory.  
  - React 

- No feature is completed yet and refining is required for existing code.  

## Commands 

### To start 
- cd views
- npm install
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

## 20 March 

- Database seeding completed for books completed.  
- Schema Explained 
- Books
  - Consist of unique books , this does not include editions.
  - id
    - Identifier of book.  
  - BookId  
    - Used to relate a book with its editions. 
    - All the editions of a book will share same bookId. 
    - But each edition has its unique identifier id.
     
  
  
- BooksWithEdition
  - Suppose there are 5 editions of BookA. Only one of those editions will be in       Books and rest will be in BookWithEditions. 
    - BookA will be present in both Books and BookWithEditions tables. 
    - BookA will have the same id  in both tables.
  - An entry in this table will have 
    - id        Different for all the tables.          6 digits 
    - bookId    Same for  all the editions of a book.  4 digits 
    - editionId Starts from 1 for the first edition    1 digit 
  - In a way ,  Books is subset of BooksWithEditions. 
  
- Relations from Books and BooksWithEditions
  - Books to Authors                   => Many to Many 
  - Books to Publications              => Many to Many 
  - Books to Covers                    => One  to Many 
  - BooksWithEditions to Authors       => Many to Many 
  - BooksWithEditions to Publications  => Many to Many 
  - BooksWithEditions to Covers        => One  to Many   


- From now onwards book will mean  both Book and BooWithEdition. 
- Covers 
  - coverId is the main property. 
  - For a bookA , take its id say 123456  and find the covers where bookId is equal to 123456 and select coverId.  
  - Use of coverId 
    - Source of image = 'https://covers.openlibrary.org/b/id/${coverId}-S.jpg 
    - S can be replaced with M and L. Represents size of image.
  - We can obtain all the images of a particular book using its 'id' this way. 


## Utility Function 
- encrypt.ts       --> exports both encrypt and decrypt functions.
- isTSInterface.ts --> To check if an object conforms on a given interface.  src= 'https://medium.com/developer-rants/follow-up-how-to-tell-if-an-object-conforms-to-a-typescript-interface-f99b4b77d602'
- ParsedUserCookieInterface.ts 
- userCookieValidator.ts  --> Takes a string ,  first decrypt it and then parse it  and obtain the object and validate it if it conforms ParsedUserCookieInterface. Return either the valid cookie object or false if cookie is invalid/tampered. 
- Valid cookie object => { id : .. , email : ..  } 
 

## Authentication 
 
 - Controllers     /src/controllers/auth
   - userLogin     /userLogin 
   - userLogout    /userLogout 

- AuthRoutes    
 
- Login flow 
 - Get email/RollNo and password from user.
 - Validate email/RollNo  and password  from database.
 - Create a new session in database , with id and email as entries. 
 - Stringify the session object -> Encrypt it   -> Set cookie, with key as 'userCookie' and value as the hex string from encryption.   

- Logout flow 
 - Delete the session and clear the cookie. 

## Route distribution 
- /auth -> All auth flow  
- /app  -> All content of the web-app. 


## Middlware  
### checkLoggedInMiddleware.ts 
- Applied on all the requests to the /app requests.
- Read the signed cookie.Validate it using UserCookieValidator function. 
- Valid Cookie Object --> findFirst on the Sessions table. 
- Authorizing the user.  
   - Then use the email to obtain the role of the user. 
   - Auth object signature --> { loggedIn : boolean  ,email  ,  role  } 
- Stringify and  encrypt the Auth object.  -> AuthHexString 
- set headers  : key => authorization , value => AuthHexString. 
- /decrypt route setup to decrypt the authHeaders. 
- From frontend we will send post request to check if AuthHeader  is valid. 

# 23 March 
## There were few issues here in this above authentication Approach. 

## I was trying to incorrectly read the headers in the frontend , I assumed that if I do  res.setHeaders()  for the get requests using the checkLoggedIn middleware   , then I can just access those headers in  my react frontend once the page loads. If I want to read those headers  then I will have to do a get request from frontend , using useEffect hook. 
## So I have decided to set up an api ,  and I will do a fetch request from the root App file. Rest of the app is nested in this route using react-router-dom.
   -- <Route path='/' element = { <App/> } >  ...Rest of the routes.. </Route>
## CheckedLoggin2  api route 
## The fetch request will check  if the user is logged in  by validated the encrypted cookie. If the cookie is valid then the api sends basic userInfo in json model.
## This data is stored and modified  using the useUser hook from userContext. 


## Backend of Auth is completed , Frontend of auth  is incomplete so errors are present in few frontend files.  

# 31 march 
##  A lot of changes made. Refactored backend. Just finished on 31 march.


