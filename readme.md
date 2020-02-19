# The D&D 5th Edition Character Generator 

This is a web application to assist users in creating basic characters for the Role playing game Dungeons & Dragons 5th Edition (5th)

## UX

![UX Example](https://github.com/Lloldrin/Milestone2/blob/master/assets/readme/responsiveness.png)

### User Stories
 
* Player: I want to quickly be able to create a basic character for an upcoming game. I want to follow the steps in the Players Handbook but I also want to be able to go back and change my mind.  

* Site owner: Same as user 

* This site is meant as a complement to the Players Handbook. It can be used separately but to get all the rule explanations you will need the book. 

### Strategy
I really wanted to keep this as a single page application. I also wanted the controls to be basic and for everything to be obvious to the user. At the same time I wanted players to be able to experiment. See how the character changes if they go back and change their race or class.

### Scope
The way to create a character is clearly outlined in the rules of 5th. You start with a character name, then pick a race, a character class and after that you buy your abilities. The book outlines 2 other ways of allocating abilities, but this application only uses the most popular one, Points Buy. To get the data necessary I've used the 'dnd5eapi.co' api. 

### Structure 

To simplify navigation I kept the site as a single page. It really helps to be able to see all the information regarding the current step at once without having to scroll past previous segments. I also wanted to keep it as a single page so that the players never have to see the page reload. It's just there in front of them. 

## Skeleton
I created sketches of the wireframe. They have been thoroughly updated. Sadly my notebook with the sketches was lost before I was able to digitize them. If only I could git my physical papers!

### Surface
The background is taken from the starter edition of 5th. It's a picture most players are familiar with and it fits the theme very well. The yellow background with red borders is also similar so the source content and will invoke a feeling of similarity to the players.

## Features

### Existing Features

* **Navigation:** The navigation is handled by 2 buttons. Prev and Next. There is a mediaquery that changes the location of the buttons. On desktop they are on top of the content and on mobile they are fixed to the bottom on the viewscreen.

* **Pagination:** The site is all one page. To show the next or previous "page" a class of "current_page" is added to the content that is to be shown.

* **API-query:** All data is taken from www.dnd5eapi.co. I use async/await functions with fetch to ensure that the page is ready and the data has been accepted. 

* **Logic:** The page has a lot of logic
    * *Ability Page:* The ability page takes a set amount of points that the player can buy ability scores with. The different values has a differing point cost. There is also a special case in the Half-Elf. They get 2 racial bonus points that needs to be placed in different abilities. 
    * *Proficiencies:* When you collect the data from the API it hasn't sorted the available proficiencies. In the rules they are divided into 5 types, Skills, Weapons, Armor, Instruments & Tools. Skills are special in that they are always available to a player, and get a bonus if the player is proficient. The other 4 are unavailable to a player who has not selected them. To sort the blob of proficiencies that comes from the API was a challenge.
    * *characterSummary:* During development there were many versions of storing all the data necessary to create a character. The object characterSummary was the last. It contains all of the information about the character and the rest of the page logic modifies or reads the data from this in different ways. 

* **DOM Manipulation:** Some of the page is written as HTML, but most of it is dynamically created by the JavaScript depending on the coices the player makes. 

* **Hover effects:** To help newer players with some of the harder concepts there are hover effects with descriptions over some of the skills etc. 

* **Responsiveness:** The site was originally built as desktop only, but since it was built with bootstrap it was easy to add mobile functionality. 

### Features Left to Implement

* **Subraces & Classes:** Right now a player can only create basic characters. With subraces and classes the options for the characters could be extended.

* **More responsiveness:** Even though the site is fully usable on mobile, there are some css needed to make the experience more enjoyable.

* **Stringify:** The option to store a character locally and return to it later.

* **Navigation:** Gray out or hide the prev/next button on the first/last page. 

* **Page headers:** Add page headers

## Technologies Used
 
* **HTML**
* **CSS** 
* **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** 
    * This project extensivly uses JavaScript for most of the page
* **[jQuery](https://jquery.com)** 
    * This project extensivly uses jQuery throughout the entire page
* **[Bootstrap](https://getbootstrap.com/)**
	* This project uses bootstrap for the grid system.
* **Flex**
    * This project uses flex as part of Bootstrap.
* **Visual Studio Code** 
    * This is the IDE used to create the page
* **Git** 
    * For version control
    * With GitHub for deployment
* **[ami.responsivedesign.is](http://ami.responsivedesign.is/)**
    * To show the UX example.
* **Browsers** 
    * For testing
    * Chrome
    * Firefox
    * Safari
	

## Testing

* The website has been extensively tested during development. Users have been asked to try different combinations of races, classes, abilities and optional traits, skills and proficiencies. During use all the relevant values have been logged to the console and reviewed to make sure that they work. There are still some minor bugs that there have not been enough time to fix.
    
* **Buglist** 
    * If you select Dwarf and Monk you can use both optional proficiencies to get proficiency in Smiths Tools, Brewers Tools or Masonry Tools. This displays both of them in the list in the summary.
    * If you select Elf or Half-Orc they get a proficiency in Perception/Intimidation respectivly. This is not cleared when you change race again.
    * If you select Elf or Half-Orc and then choose Perception/Intimidation as your class skills and then reset your class you loose your proficiency in the skill.
    * Several issues with mobile browsers
        * On some versions on chrome for mobile the page will display under the navbar. Making some content hard to reach. 
        * On DuckDuckGo the navbar will scroll with the content. It will still be fixed to the bottom and is always visible, albeit barely. If you scroll back up, even a little bit regardless on where you are on the page, the navbar will be fully visible again.
        * Not a bug but a design issue: The page header is too big on mobile and the character name box is too small. 

   

### Browsers 
* Desktop
    * Chrome 
    * Safari
    * Firefox 
* Mobile
    * Huawei P30 Pro
        * Chrome
        * DuckDuckGo
    * iPhone 10 
        * Safari  
    * Samsung Galaxy S8 
        * Chrome  

## Deployment

The site is hosted on GitHub-Pages. 

* To deploy the site a GitHub repository was created [here](https://github.com/Lloldrin/Milestone2)
* GitHub pages was used to deploy the site. 
    * A guide on how this is done can be accessed [here](https://pages.github.com/)
* The site uses the Master branch of the repository
    * It will update automatically with new commits to the master branch
* To ensure that GitHub pages will load the page correctly the page must be named index.html 
 
To run the site locally
1. In your terminal, go to a folder you want to save the project in.
2. Make sure you have git installed and then, to download the project, in the terminal run: 
     * `git clone https://github.com/Lloldrin/Milestone2.git` 
3. The index.html file and README.md files are in the main project folder, the assets are in their respective folders.
4. To run the site open the index.html in a browser to view the site locally, or open it in an IDE to edit the code. 

## Credits

### Content
* The data is collected from **[www.dnd5eapi.co](https://www.dnd5eapi.co)**
* The content is created by **[Wizards of the Coast LLC](https://company.wizards.com/)**

### Text
* Texts and explanations are from **[Wizards of the Coast LLC](https://company.wizards.com/)**

### Photos
* The background image is from **[Wizards of the Coast LLC](https://company.wizards.com/)**
