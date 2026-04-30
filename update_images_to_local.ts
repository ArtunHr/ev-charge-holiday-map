import fs from 'fs';

const path = 'src/data/stations.ts';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/imageUrl:\s*'.*?'/g, (match, offset, str) => {
    let nameStr = str.slice(Math.max(0, offset - 1000), offset);
    
    // Find the LAST occurrence of name: and operator: before this match
    let nameMatches = [...nameStr.matchAll(/name:\s*'([^']+)'/g)];
    let opMatches = [...nameStr.matchAll(/operator:\s*'([^']+)'/g)];
    
    if (nameMatches.length === 0) return match;
    
    let name = nameMatches[nameMatches.length - 1][1];
    let operator = opMatches.length > 0 ? opMatches[opMatches.length - 1][1] : '';
    
    let img = '';
    const op = operator.toLowerCase();
    const nm = name.toLowerCase();
    
    if (nm.includes('opet')) {
        img = '/opet.png';
    } else if (op.includes('zes')) {
        img = '/zes.png';
    } else if (op.includes('trugo')) {
        img = '/trugo.png';
    } else if (op.includes('eşarj') || op.includes('esarj')) {
        img = '/esarj.png';
    } else if (op.includes('shell')) {
        img = '/shell-recharge.png';
    } else if (op.includes('power')) {
        img = '/e-power.png';
    } else if (op.includes('astor')) {
        img = '/astor-sarj.png';
    } else if (op.includes('yakıt') || op.includes('yakit')) {
        img = '/en-yakit.png';
    } else if (op.includes('voltrun')) {
        img = '/voltrun.png';
    } else if (op.includes('porsche')) {
        img = '/porsche.png';
    } else {
        img = '';
    }
    
    if (img) {
        return `imageUrl: '${img}'`;
    }
    return match;
});

fs.writeFileSync(path, code);
console.log("Updated to exact local image paths!");
