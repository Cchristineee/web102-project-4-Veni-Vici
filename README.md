# Web Development Project 4 - *Veni Vici*

Submitted by: **Christine Grimadeau**

This web app: **Paws & Pals** is an interactive, dynamic web application designed for dog lovers to explore canine breeds, personalities, and traits in a fun, gamified way. Inspired by the classic "StumbleUpon" discovery format, the app serves up random, high-quality dog profiles dynamically fetched from The Dog live public API. 🐶

Time spent: **25** hours spent in total

## Required Features 🐶

The following **required** functionality is completed: 

- [✅] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [✅] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time 
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [✅] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [✅] **Clicking on a displayed value for one attribute adds it to a displayed ban **list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should imnmediately add it to the ban list 
  - Clicking on an attribute in the ban list should immediately remove it from the ban list 
- [✅] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  -  [✅] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_


The following **optional** features are implemented:

- [✅] Multiple types of attributes are clickable and can be added to the ban list
- [✅] Users can see a stored history of their previously displayed  results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough 🐶

Here's a walkthrough of implemented user stories:
<img width="1424" height="730" alt="Paws Pals" src="https://github.com/user-attachments/assets/160fa706-c8a8-4245-869e-4eb3c72a3bfc" />


<!-- Replace this with whatever GIF tool you used! -->
GIF created with LICEcap

## Notes 🐶
This project was pretty challanging as there aren't many times where I'm dealing with APIs. Those challanges are included and how I fixed them:

### 1. Handling Asynchronous Data & Conditional Rendering
When the app first loaded, React tried to render the HTML layout immediately. Because the API fetch takes a brief moment to complete, currentDog was initially null, causing the app to crash with a TypeError: Cannot read properties of null error when trying to display properties like .name or .image. 
<br>
**Solution:**
I Implemented conditional rendering guards ({currentDog && (...)}) and fallback loading states. This made sure that the UI layout safely waits until the asynchronous async/await fetch block resolves and commits data to the state hook before attempting to draw the breed panel.

### 2. Mitigating the API "Missing Data" Infinite Loop
The Dog API contained thousands of user-submitted images, many of which lacked any attached breed or temperament metadata. Originally, the code was written to aggressively reject any profile missing this information and force an immediate recursive re-fetch. This caused a massive hidden loop that fetched dozens of blank objects in milliseconds, freezing the web browser.
<br>
**Solution:**
I Refactored the data extraction logic to include default fallback structures. If an image is fetched without metadata, the code safely intercepts it and injects default text metrics (e.g., 'Mixed Breed Pup', 'Friendly, Playful, Loyal') rather than spinning into an unrestricted network cycle. This kept the app fast and stable.

### 3. Implementing Client-Side Filtering for the Ban List
Since public APIs typically do not accept query parameters to exclude things (e.g., you cannot send a request asking for a dog that is not part of the Toy group). This meant all the ban logic had to happen purely on the frontend.
<br>
**Solution:**
I utilized JavaScript array methods (.some() and .includes()) to parse through the dynamically separated temperament arrays before updating the React state. If a match is found on the client side, the function skips the state commit entirely and cleanly triggers a safe background re-fetch until an unbanned profile lands.

## License 🐶

    Copyright 2026 Christine Grimadeau

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
