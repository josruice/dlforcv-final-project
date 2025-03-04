var fs = require('fs');

const VALIDATION_PERC = 0.2;

var originFolderPath = process.argv[2];  // Without / in the end.
var trainFolderPath = process.argv[3];
var validationFolderPath = process.argv[4];

// From http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

fs.readdir(originFolderPath, (err, categoryFolders) => {
  // Remove hidden folders.
  categoryFolders = categoryFolders.filter(x => x[0] != '.');

  for (let categoryFolder of categoryFolders) {
    console.log(`Processing ${categoryFolder}`);
    var sourceCategoryFolderPath = `${originFolderPath}/${categoryFolder}`;
    var trainCategoryFolderPath = `${trainFolderPath}/${categoryFolder}`;
    var validationCategoryFolderPath = `${validationFolderPath}/${categoryFolder}`;
    
    var images = fs.readdirSync(sourceCategoryFolderPath);
    
    // Remove hidden elements.
    var images = images.filter(x => x[0] != '.');
    var numImages = images.length;
    var shuffledImages = shuffleArray(images);

    var numImagesValidation = Math.ceil(numImages * VALIDATION_PERC);
    var validationImages = shuffledImages.slice(0, numImagesValidation);
    var trainImages = shuffledImages.slice(numImagesValidation);

    for (let validationImage of validationImages) {
      var sourceImagePath = `${sourceCategoryFolderPath}/${validationImage}`;
      var destImagePath = `${validationCategoryFolderPath}/${validationImage}`;
      fs.renameSync(sourceImagePath, destImagePath);
    }

    for (let trainImage of trainImages) {
      var sourceImagePath = `${sourceCategoryFolderPath}/${trainImage}`;
      var destImagePath = `${trainCategoryFolderPath}/${trainImage}`;
      fs.renameSync(sourceImagePath, destImagePath);
    }
  }
});