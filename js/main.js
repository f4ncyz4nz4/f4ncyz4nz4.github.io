var app = document.getElementById("app");

var typewriter = new Typewriter(app, {
  loop: false,
  delay: 75,
  autoStart: true,
  cursor: "█",
  strings: [
    "My name is Lorenzo, and I'm currently a double degree master student between Politecnico di Torino, Italy and Eurecom, France.",
  ],
});

typewriter
  .deleteAll(1)
  .pauseFor(50)
  // .typeString('My name is Lorenzo, and I am a student and wannabe hacker.')
  .deleteAll(1)
  // .typeString("")
  .pauseFor(300)
  .deleteAll(1)
  .typeString("Find me online: <br />")
  .pauseFor(300)
  //.typeString('<a href="https://tiffanywhite.dev">Blog</a> <br />')
  //.typeString('<a href="https://www.tiffanyrwhite.com">Portfolio</a> <br />')
  //.typeString('<a href="https://resume.tiffanyrwhite.com">Resume</a> <br />')
  .typeString(
    '<a href="https://linkedin.com/in/lorenzo-ippolito">LinkedIn</a> <br />'
  )
  .typeString('<a href="https://twitter.com/Ippo_99">Twitter</a> <br />')
  //.typeString('<a href="https://codepen.io/tiffanywhitedev">CodePen</a> <br />')
  //.typeString('<a href="https://codesandbox.io/u/twhite96">Codesandbox</a> <br />')
  .typeString('<a href="https://github.com/f4ncyz4nz4">GitHub</a> <br />')
  .pauseFor(1000);
