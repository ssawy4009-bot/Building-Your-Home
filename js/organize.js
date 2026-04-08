const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const jsDir = path.join(__dirname, 'js');

if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);

const files = fs.readdirSync(__dirname).filter(f => f.toLowerCase().endsWith('.html') && !f.toLowerCase().includes('organized'));

function extractBlocks(content, tag) {
    let lowerContent = content.toLowerCase();
    let parts = [];
    let extracted = [];
    let searchIndex = 0;
    
    let openTag = '<' + tag;
    let closeTag = '</' + tag + '>';
    let isScript = (tag === 'script');
    
    while (true) {
        let openIdx = lowerContent.indexOf(openTag, searchIndex);
        if (openIdx === -1) {
            parts.push(content.substring(searchIndex));
            break;
        }
        
        let closeIdx = lowerContent.indexOf(closeTag, openIdx);
        if (closeIdx === -1) {
            // Unclosed tag
            parts.push(content.substring(searchIndex));
            break;
        }
        
        // Find the end of the opening tag (the >)
        let endOfOpenTagIdx = lowerContent.indexOf('>', openIdx);
        if (endOfOpenTagIdx === -1 || endOfOpenTagIdx > closeIdx) {
            // Malformed
            parts.push(content.substring(searchIndex, closeIdx + closeTag.length));
            searchIndex = closeIdx + closeTag.length;
            continue;
        }
        
        // Check if it has 'src='
        let openingTagContent = lowerContent.substring(openIdx, endOfOpenTagIdx + 1);
        if (isScript && openingTagContent.includes('src=')) {
            parts.push(content.substring(searchIndex, closeIdx + closeTag.length));
            searchIndex = closeIdx + closeTag.length;
            continue;
        }
        
        // Match found!
        parts.push(content.substring(searchIndex, openIdx));
        if (extracted.length === 0) {
            parts.push('___REPLACE_ME_' + tag.toUpperCase() + '___'); // Placeholder for <link> or <script>
        }
        
        let innerContent = content.substring(endOfOpenTagIdx + 1, closeIdx);
        if (innerContent.trim()) {
            extracted.push(innerContent.trim());
        }
        
        searchIndex = closeIdx + closeTag.length;
    }
    
    return {
        newContent: parts.join(''),
        extracted: extracted
    };
}

files.forEach(file => {
    console.log(`Processing ${file}...`);
    let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    const baseName = file.replace(/\.html$/i, '');
    const normalizedName = encodeURIComponent(baseName.replace(/\s+/g, '-'));
    let modified = false;
    
    let styleData = extractBlocks(content, 'style');
    if (styleData.extracted.length > 0) {
        let cssContent = styleData.extracted.join('\n\n/* --- Next Style Block --- */\n\n');
        fs.writeFileSync(path.join(cssDir, `${normalizedName}.css`), cssContent);
        content = styleData.newContent.replace('___REPLACE_ME_STYLE___', `<link rel="stylesheet" href="css/${normalizedName}.css">`);
        modified = true;
    } else {
        content = styleData.newContent.replace('___REPLACE_ME_STYLE___', '');
    }
    
    let scriptData = extractBlocks(content, 'script');
    if (scriptData.extracted.length > 0) {
        let jsContent = scriptData.extracted.join('\n\n/* --- Next Script Block --- */\n\n');
        fs.writeFileSync(path.join(jsDir, `${normalizedName}.js`), jsContent);
        content = scriptData.newContent.replace('___REPLACE_ME_SCRIPT___', `<script src="js/${normalizedName}.js"></script>`);
        modified = true;
    } else {
        content = scriptData.newContent.replace('___REPLACE_ME_SCRIPT___', '');
    }
    
    if (modified) {
        fs.writeFileSync(path.join(__dirname, file), content);
        console.log(`Updated ${file}`);
    }
});
console.log('Done organizing!');
