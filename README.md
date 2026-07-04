# set-your-outfit
Website link:
dh-set-your-oufit.netlify.app

## Wireframes

### Desktop Wireframe

![Desktop Wireframe](src/assets/Screenshot%202026-07-04%20094819.png)
![Desktop Wireframe](src/assets/Screenshot%202026-07-04%20094827.png)

### Mobile Wireframe

![Mobile Wireframe](src/assets/Screenshot%202026-07-04%20100825.png)
![Mobile Wireframe](src/assets/Screenshot%202026-07-04%20100835.png)

### Typography

| Role | Color | Description |
| --- | --- | --- |
| **Primary Color** | ``#1E1E2F`` | Used for header, navigation, and primary actions |
| **Secondary Color** | ``#F5F5F5`` | Used for backgrounds, cards, and neutral sections |
| **Accent Color** | ``#FF6B35`` | Used for highlights, CTAs, and promotional elements |
| **Background Color** | ``#FFFFFF`` | Main page background for clean readability |
| **Text Color** | ``#222222`` | High‑contrast text for strong legibility |

### Heading Font
#### Poppins  
Source: Google Fonts
Used for titles, navigation labels, and section headers.

### Body Font
#### Inter  
Source: Google Fonts
Used for paragraphs, product descriptions, and general content.

## Planned Pages and Application Structure

For this project, I will use a single main page that dynamically updates its content using JavaScript. The page will also include a modal for the sign‑up and login sections. After evaluating different approaches and discussing ideas with AI tools, I decided that the best solution is to use hash routing.

Because my website contains many categories and users will constantly click between sections, hash routing allows me to change the displayed content without reloading multiple HTML files. This approach improves performance, keeps the experience smooth, and makes better use of the API.

### Planned JavaScript Modules
I will use the following JavaScript files:

main.js
data.js
render.js
storage.js
auth.js

##### main.js
This file initializes the application and connects all events from the different JavaScript modules.
It also listens for user interactions (clicks, navigation changes) and coordinates the logic between the API, rendering functions, and stored user data.
If hash routing is used, main.js will detect changes in the URL hash and load the correct category or section.

#### data.js
Since the project uses multiple product categories and relies on an external API, this module handles all data fetching.
It retrieves product information, organizes it by category or product ID, and prepares the data so it can be rendered on the page.
This file contains the main fetch calls and any data‑processing logic.

#### render.js
This module manages everything related to the DOM.
It displays products, categories, forms, modals, and any UI elements on the page.
render.js controls how information is visually structured and ensures that the layout matches the wireframes.

#### storage.js
Because the website will include features like “Interested In” or “Recently Viewed,” this module handles localStorage.
It saves the user’s last visited categories, recent searches, or other personalized data.
The information stored here is used to fill certain sections of the page automatically.

#### auth.js
This module manages the simple authentication system.
It allows users to create an account and log in.
It validates basic input fields and stores the user’s information (such as name, email, gender, or age) in localStorage.
This data is later used to personalize the experience, such as greeting the user by name or showing clothing recommendations based on their profile.

## Planned Data Structure

For this project, I will use the DummyJSON API as the main data source. The API already provides a complete JSON structure for all products, including details such as ID, title, price, category, images, reviews, and metadata. Because the data is already structured, I do not need to create my own JSON files.

My application will retrieve product information based on the category selected by the user. One of the endpoints I will use is:

https://dummyjson.com/products/category/mens-shoes

This endpoint returns a JSON object containing all products within the selected category.
A representative example of the JSON structure is:

#### json
{
  "id": 88,
  "title": "Nike Air Jordan 1 Red And Black",
  "price": 149.99,
  "category": "mens-shoes",
  "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp"
}

