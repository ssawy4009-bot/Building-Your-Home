const fs = require('fs');
const path = require('path');
const htmlDir = path.join(__dirname, 'html');
if (fs.existsSync(htmlDir)) {
    const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
    files.forEach(f => {
        let content = fs.readFileSync(path.join(htmlDir, f), 'utf8');
        let updated = false;
        if (content.includes('href="css/')) {
            content = content.replace(/href="css\//g, 'href="../css/');
            updated = true;
        }
        if (content.includes('src="js/')) {
            content = content.replace(/src="js\//g, 'src="../js/');
            updated = true;
        }
        if (updated) {
            fs.writeFileSync(path.join(htmlDir, f), content);
            console.log('Fixed paths in: ' + f);
        }
    });
}
