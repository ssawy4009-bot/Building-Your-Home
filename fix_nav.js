const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace each top nav link by removing data-page and adding real href
  const replacements = [
    { target: 'data-page="home">Home</a>', replaceUrl: 'index.html', title: 'Home' },
    { target: 'data-page="property-types">Property Types</a>', replaceUrl: 'Property%20Types.html', title: 'Property Types' },
    { target: 'data-page="gallery">Design Gallery</a>', replaceUrl: 'New%20Design%20garaly.2.html', title: 'Design Gallery' },
    { target: 'data-page="consultation">Free Consultation</a>', replaceUrl: '#', title: 'Free Consultation' },
    { target: 'data-page="design">Start Designing</a>', replaceUrl: '#', title: 'Start Designing' },
    { target: 'data-page="signup">SignUp</a>', replaceUrl: 'sign%20up.1.html', title: 'SignUp' },
    { target: 'data-page="login">Login</a>', replaceUrl: 'Login.1.html', title: 'Login' }
  ];

  replacements.forEach(r => {
    // Regex matches the whole anchor tag that has the specific target data-page
    const regex = new RegExp('<a href="[^"]*" class="nav-link([^"]*)" ' + r.target, 'g');
    content = content.replace(regex, `<a href="${r.replaceUrl}" class="nav-link$1">${r.title}</a>`);
  });

  if (original !== content) {
    fs.writeFileSync(f, content);
    console.log('Fixed links in ' + f);
  }
});
