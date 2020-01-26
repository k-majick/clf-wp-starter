export default class Form {

  constructor(selector) {
    this.form = document.querySelector(selector);
    this.fileInput = document.querySelector(selector + "__file");
    this.fileLabelTxt = document.querySelector(selector + "__labelTxt");
    this.fileLabelDefault = this.fileLabelTxt.innerHTML;
    this.formSubmitBtn = document.querySelector(selector + "__btn");
    this.imgWs = new Array();
    this.imgHs = new Array();
    this.init();
  }

  init() {
    let fileInput = this.fileInput;
    fileInput.addEventListener('change', (e) => this.uploadFiles(e));
    this.formSubmit();
  }

  uploadFiles(e) {
    let fileName = '';
    let fileInput = this.fileInput;
    let files = fileInput.files;
    let fileLabelDefault = this.fileLabelDefault;
    let fileLabelTxt = this.fileLabelTxt;
    let imgWs = this.imgWs;
    let imgHs = this.imgHs;
    let i = 0;

    console.dir(fileInput)

    for (let file of files) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.src = e.target.result;
        img.onload = function() {
          var w = this.width;
          var h = this.height;
          imgWs.push(w);
          imgHs.push(h);
        }
      }
      i += 1;
      reader.readAsDataURL(file);
    }

    if (files && files.length > 1) {
      fileName = (fileInput.getAttribute('data-multiple-caption') || '').replace('{count}', files.length);
    } else if (e.target.value) {
      fileName = e.target.value.split('\\').pop();
    }

    if (fileName) {
      fileLabelTxt.innerHTML = fileName;
    } else {
      fileLabelTxt.innerHTML = fileLabelDefault;
    }

    setTimeout(() => {
      this.validateFiles(fileInput, files, imgWs, imgHs);
    }, 100);

  }

  validateFiles(fileInput, files, imgWs, imgHs) {

    Array.from(files).forEach((file) => {
      let fileSize = file.size;
      let fileName = file.name;
      let fileExt = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);

      console.log(file.name + ' size: ' + file.size + ' bytes');
      console.log(fileExt);

      if (fileExt != 'jpg') {
        fileInput.setCustomValidity("Niewłaściwy format pliku");
      }
    });

    Array.from(imgWs).forEach((imgW) => {
      console.log(imgW);
    });

    Array.from(imgHs).forEach((imgH) => {
      console.log(imgH);
    });

  }

  formSubmit() {
    let btn = this.formSubmitBtn;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('submit')
    });
  }

}
