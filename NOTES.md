NOTES.md


There was a problem!  My formatter was messing up my .html <script> tags that included {% nunjucks %}

As suggested int the eseom nunjucks extension, I installed .

"files.associations": {
  "*.html": "njk"
},

after adding
    "html.format.endWithNewline": true,
    "html.format.indentInnerHtml": true,
    "html.format.templating": true,

as suggested [here](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/15/)


gulp-imagemin ^7 is ok as a CJS, ^8 is a module !

