# Gigswap

## Application Description
This is a web application that connect freelance talents and hirers for gigs with features of reviews, gigs matching based on skills, and in-app chats.


## User Stories
There are three levels of user roles. 

### Admin
1. Admin can view stats of application in dashboard
2. Admin can deactivate and re-activate users
3. Admin can view all list of users, and gigs
4. Admin can create, read, edit and delete category and subcategory
5. Admin can delete gigs which are flagged by users

### Talents
1. User is able to register account
2. User is able to create profile with skill sets and set preference of gigs 
3. User is able to search and filter gigs posting
4. User is able to view recommended gigs based on preference
5. User is able to apply gig after profile completion
6. User is able to save and un-save gigs
7. User is able to review hirer
8. User is able to receive notifications
9. User is able to flag gig posting which is inappropriate 
10. User is able to chat with hirer

### Hirers
1. User is able to register account
2. User is able to create profile
3. User is able to create, edit, delete gig
4. User is able to search and filter talents
5. User is able to set skill set requirement for gig
6. User is able to save talent and invite talent to apply gig
7. User is able to review talent after gig completion
8. User is able to receive notifications
9. User is able to initiate chats with applicants


## Link to Live Site

[Gigswap](https://gigswap-app.herokuapp.com/)


## Technology

This repo is for front end application. Please refer another [repo](https://github.com/jesstoh/gigswap_api) for back end api built with Django.

### Main Tech Stack
1. **Django** - Back end api
2. **React** - Front end framework
3. **Postgresql** - Database

### Authentication
1. Access and Refresh tokens with JWT

### Other Technologies
1. **React-Redux** - State Management for React
2. **Firebase** - Database to implement real time chat 
3. **React Boostrap** - CSS Framework for front end
4. **React-router-dom*** - Handling route in React app
4. **Axios** 
5. **Cloudinary** - Cloud storage of uploaded images and videos
6. **Cloudinary Upload Widget** 
7. **Heroku** - Cloud platform for deployment of Front End app and Back End api


## Architecture
The approach is to develop architecture of full application including back end api, front end routes, ERM of database and Wireframe for MVP before proceeding to coding. 

[**List of Back End Route**](documentation/Gigswap_Back_End_API_Routes.pdf)

[**List of Front End Route**](documentation/Gigswap_Front_End_Routes.pdf)

[**ERM**](documentation/Gigswap_ERM.png) 

[**Wireframe**](documentation/Gigswap_Wireframe.pdf) - Simple wireframes to include all MVP pages of front end app for a quick development. Refer to live site or [**UI Set**](documentation/Gigswap_UI.pdf) for some pictures of eventual UI. 


## How to Run Application

### Front End
1.  After downloading codes from this repo, create an .env file in root directory with following environment variables.

This is the back end api domain url
```
REACT_APP_API_URL
```

After registering an account and firestore at Firebase, set up variables in .env file with corresponding details in firebase account setting.
```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

Set up an account in Cloudinary and unsigned preset.
```
REACT_APP_CLOUDINARY_UPLOAD_PRESET
REACT_APP_CLOUDINARY_CLOUD_NAME
```

2. Run ```npm install``` in terminal to install all the packages and dependencies specified in package.json file
3. Run ```npm start``` in terminal to start server. This shall open a browser window with application landing page.
4. For deployment not in local host, please follow respective service provider instruction, but need to set up environment variables as mentioned above. 


*NOTE: Need to set up backend api first for front end to perform CRUD with data in database.*

### Back End
1. Download codes from [back end repo](https://github.com/jesstoh/gigswap_api).
2. Create an .env file in root directory with following environment variables.


```
SECRET_KEY
DATABASE_URL
BASE_URL
PAGE_ITEMS_COUNT
```
```SECRET_KEY``` is for Django application settings.py file. <br/>
For ```DATABASE_URL```, if using postgresql. Set it up as following with your selected username, password, host, and database name. 
```
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/NAME
```
```BASE_URL``` can leave it empty as react-router-dom is implemented for routing in react front end app
```PAGE_ITEMS_COUNT``` sets number of items displayed per page in front end hirer and talent landing page.  


3. Configure CORS headers at settings.py file by updating ```CORS_ALLOWED_ORIGINS```. Add domain of front end app urls in the list if different from the existing list.
4. Run ```pipenv shell``` in terminal to start virtual environment
5. Run ```python3 manage.py makemigrations``` followed by ```python3 manage.py migrate``` to create models in database
6. Create an admin or superuser by running ```python3 manage.py createsuperuser``` and follow instruction in command line to set up superuser. (Admin user can access admin page in backend domain at relative path /admin)
7. Start back end server with ```python3 manage.py runserver```, the route will be served via https://localhost:8000/
8. For deployment not in local host, please follow respective service provider instruction, but need to set up environment variables as mentioned above. 

## How to Use
This is web application, please go to current live site [Gigswap](https://gigswap-app.herokuapp.com/) or front end app url set up above. Register account as talent or hirer, and navigate like any web application. <br/><br/>
Note that admin user pages are protected, not accessible to login normal users. Only superuser or user with role is_staff can access the page. 

Refer here for some pictures of the [**UI**](documentation/Gigswap_UI.png).

## Future Features 

* Add payment feature with stripe for hirer to pay talent
* Hirer is able to set up video call from app. 
* Machine learning to improve algorithm of recommended gigs
* Further optimize front end app
* Improve search algorithm 
* Improve admin dashboard with graph displaying stats over the time and filtering function
* Talent to track earning and analysis.
* Further improve chat and include subscription option to allow talent with premium plan to contact hirer directly.


Please do indicate references when using the codes in this repo and back end api repo. 

<hr>  
