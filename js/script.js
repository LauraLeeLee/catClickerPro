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
    adminView.init();
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
  },

  //opens admin view
  currentCatInfo: function() {
    return model.currentCat;
  },

  //saves user input to model data
  saveCatInfo: function(inputName, inputImg, inputCount) {
    model.currentCat.name = inputName;
    model.currentCat.img = inputImg;
    model.currentCat.count = inputCount;
  },
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
    this.catListElement.innerHTML = '';

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

//---------Admin view
var adminView = {
  init: function() {
    //saves DOM elems for the admin view
    this.adminBtn = document.getElementById('admin-btn');
    this.adminForm = document.getElementById('admin-form');
    this.adminName = document.getElementById('admin-name');
    this.adminImg = document.getElementById('admin-img');
    this.adminCount = document.getElementById('admin-count');
    this.adminSave = document.getElementById('admin-save');
    this.adminCancel = document.getElementById('admin-cancel');
    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    //set the admin form to hidden
    this.adminForm.style.visibility = 'hidden';
    var adminForm = this.adminForm;
    var save = this.adminSave;
    var cancel = this.adminCancel;

    //show the main form and update input values to reflect current cat name, img src and count
    this.adminBtn.addEventListener('click', function() {
      var currentCatInfo = octopus.currentCatInfo();
      adminForm.style.visibility = 'visible';
      adminView.adminName.value = currentCatInfo.name;
      adminView.adminImg.value = currentCatInfo.img;
      adminView.adminCount.value = currentCatInfo.count;
    });

    save.addEventListener('click', function(){
      //creates var for current cat information
      var currentCatInfo = octopus.currentCatInfo();
      //saves input information from user
      inputName = adminView.adminName.value;
      inputImg = adminView.adminImg.value;
      inputCount = adminView.adminCount.value;
      console.log(inputName, inputImg,inputCount);
      //saves input info to ocotopus to model data
      octopus.saveCatInfo(inputName, inputImg, inputCount);

      //renders cat view area and cat list to update with saved input info
      catListView.render();
      catView.render();
      //rehides the admin form after saving
      adminForm.style.visibility = 'hidden';
    });

    cancel.addEventListener('click', function(){
      adminForm.style.visibility = 'hidden';
    });
  }
};

//initialize it all
octopus.init();
