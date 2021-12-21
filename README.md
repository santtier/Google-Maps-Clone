# Google Maps
![](https://learnjavascript.today/images/comps/google-map.gif)
This clone does a small subset of what Google Maps does. It only lets you search for driving directions between 2 places.
## General Info
In this project I use the **[ Google Maps JavaScript API Guide](https://developers.google.com/maps/documentation/javascript/overview " Google Maps JavaScript API Guide")**.
I use JASONP bacause this API uses JASONP. To get and plot directions between two points on the map I use the **[Google’s direction API](https://developers.google.com/maps/documentation/javascript/directions "Google’s direction API")** 
To let users search for directions from one place to another I use the **Places** library with the autocomplete widget and I create a search panel that allows users to enter two addresses.
Also the Google Maps API lets you create a directions panel that shows you turn-by-turn instructions so I do it. I handle all the errors than can be occur. Lastly there is a feature 
in Google Maps called waypoints. A waypoint is an intermediate point between the start and end of a journey so if you want to travel to three places, for example, the route created is going to be plotted to all three places
## Technologies
A list of technologies used within the project:
- HTML
- CSS
- JavaScript
- ZlFetch lbrary (You do not have to install because it is inside the project with the script tag)

## Installation
A little intro about the installation. 
```
$ git@github.com:santtier/Google-Maps-clone
$ cd Todolist Google-Maps-clone
```

## Collaboration
Give instructions on how to collaborate with your project.
There are a set of rules to keep in mind:

- Perform work in a feature branch.
  _Why:_
  > Because this way all work is done in isolation on a dedicated branch rather than the main branch. It allows you to submit multiple pull requests without confusion. You can iterate without polluting the master branch with potentially unstable, unfinished code. [read more...](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow)
- Branch out from `main`

  _Why:_

  > This way, you can make sure that code in master will almost always build without problems, and can be mostly used directly for releases (this might be overkill for some projects).

- Never push into `main` branch. Make a Pull Request.

  _Why:_

  > It notifies team members that they have completed a feature. It also enables easy peer-review of the code and dedicates forum for discussing the proposed feature.

- Delete local and remote feature branches after merging.
  _Why:_
  > It will clutter up your list of branches with dead branches. It ensures you only ever merge the branch back into (`main`) once. Feature branches should only exist while the work is still in progress.

- Comment your code. Try to make it as clear as possible.
- Don't use comments as an excuse for a bad code. Keep your code clean.
- Don't use clean code as an excuse to not comment at all.
- Keep comments relevant as your code evolves.
- Recommended using [JSDoc](https://www.youtube.com/watch?v=r0H-acWQS6c)

## Demo
If you want to see the demo of this proyect deployed, you can visit [Google Maps Clone](https://santtier.github.io/Google-Maps-Clone/ "Google Maps Clone")
