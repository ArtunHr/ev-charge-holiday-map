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
    if (name.toLowerCase().includes('opet')) {
        img = 'https://placehold.co/800x500/0A1622/22C55E/webp?text=OPET\\nŞARJ+NOKTASI';
    } else if (operator === 'ZES') {
        img = 'https://placehold.co/800x500/0A1622/3B82F6/webp?text=ZES\\nHIZLI+ŞARJ';
    } else if (operator === 'Trugo') {
        img = 'https://placehold.co/800x500/0A1622/4FD8FF/webp?text=TRUGO\\nEV+STATION';
    } else if (operator === 'Eşarj') {
        img = 'https://placehold.co/800x500/0A1622/F59E0B/webp?text=EŞARJ\\nNETWORK';
    } else if (operator === 'Shell Recharge') {
        img = 'https://placehold.co/800x500/0A1622/EF4444/webp?text=SHELL\\nRECHARGE';
    } else if (operator.toLowerCase().includes('power')) {
        img = 'https://placehold.co/800x500/0A1622/F8FAFC/webp?text=E-POWER\\nSTATION';
    } else {
        img = 'https://placehold.co/800x500/0A1622/94A3B8/webp?text=EV\\nSTATION';
    }
    
    if (img) {
        return `imageUrl: '${img}'`;
    }
    return match;
});

fs.writeFileSync(path, code);
console.log("Updated with placehold.co images!");
