const fs = require('fs');
const path = require('path');
const htmlDir = path.join(__dirname, 'html');
if (fs.existsSync(htmlDir)) {
    const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
    files.forEach(f => {
        let content = fs.readFileSync(path.join(htmlDir, f), 'utf8');
        content = content.replace(/href="\.\.\/css\//g, 'href="css/');
        content = content.replace(/src="\.\.\/js\//g, 'src="js/');
        fs.writeFileSync(path.join(__dirname, f), content);
        fs.unlinkSync(path.join(htmlDir, f)); // remove from html folder
    });
    fs.rmdirSync(htmlDir); // remove html folder
    console.log('HTML files moved back to root and paths updated!');
} else {
    console.log('HTML folder not found.');
}
