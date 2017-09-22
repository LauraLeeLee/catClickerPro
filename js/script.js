//--------------Model
var model = {
  currentCat: null,
  //array for crazy lady cat collection
   cats: [
    { img: "images/catclicker.jpg",
      name: "Kitty",
      count: 0,
      id: 1
    },
    { img: "images/catclicker2.jpg",
      name: "Mr. Tipps",
      count: 0,
      id: 2
    },
    { img: "images/catclicker3.jpg",
      name: "FraidyCat",
      count: 0,
      id: 3
    },
    { img: "images/catclicker4.jpg",
      name: "MsClawz",
      count: 0,
      id: 4
    },
    { img: "images/catclicker5.jpg",
      name: "ZsaZsa",
      count: 0,
      id:5
    }
  ]
};

//------------Octopus

var octopus = {
  init: function() {
    //sets current cat on page load to the first cat in list
    model.currentCat = model.cats[0];

    //intructs initialize of views
    catListView.init();
    catView.init();
  },

//retrieves the current cat
  getCurrentCat: function() {
    return model.currentCat;
  },

//retrieves the cat array
  getCats: function() {
    return model.cats;
  },

  //sets current selected cat to the object passed in
    //what does this do? why is it needed?
    //How would we know it is needed?
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  //increases the counter for the current cat
  increaseCounter: function(){
    model.currentCat.count++;
    catView.render();
  }
};

//-----------View
var catView = {
  init: function() {
    //store elements from the DOM for recall later
    //for selected cat
    this.catNameElement = document.getElementById('name');
    this.catImageElement = document.getElementById('cat-image');
    this.catCountElement = document.getElementById('count');

    //on click increase the current cat count
    this.catImageElement.addEventListener('click', function(){
      octopus.increaseCounter();
    });

    //render view- update DOM elements
    this.render();
  },

  render: function() {
    //update the DOM with information from current selected catView
    var currentCat = octopus.getCurrentCat();
    this.catNameElement.textContent = currentCat.name;
    this.catImageElement.src = currentCat.img;
    this.catCountElement.textContent = currentCat.count;
  }
};

var catListView = {

  init: function() {
    //stores DOM element(the ul) to access later
    this.catListElement = document.getElementById('cat-list');

    //render the view updates the DOM element for the list
    this.render();
  },

  render: function() {
    var cat, liElement, i;

    //gets the cat names to render in list
    var cats = octopus.getCats();

    // empty the cat list- page seems to work without this line of code
    //this.catListElement.innerHTML = '';

    //loop over the cats
    for (i = 0; i < cats.length; i++) {
      cat = cats[i];

      //make a new list item and give it its cat name
      liElement = document.createElement('li');
      liElement.textContent = cat.name;

      // on a click set the selected current cat and render its catView
      //-use closure-in-a-loop
      liElement.addEventListener('click', (function(clickedCat){
        return function() {
          octopus.setCurrentCat(clickedCat);
          catView.render();
        }
      })(cat));

      //append element to DOM
      this.catListElement.appendChild(liElement);
    }
  }
};

//initialize it all
octopus.init();
