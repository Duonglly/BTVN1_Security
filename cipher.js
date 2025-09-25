function showKeyFields() {
    const method = document.getElementById('method').value;
    const keyFields = document.getElementById('key-fields');
    keyFields.innerHTML = '';
    if (method === 'caesar') {
        keyFields.innerHTML = '<label>Khoa (số):</label><input id="key" type="number" value="3">';
    } else if (method === 'affine') {
        keyFields.innerHTML = '<label>a (nguyên tố cùng 26):</label><input id="a" type="number" value="5"><label>b:</label><input id="b" type="number" value="8">';
    } else if (method === 'permutation') {
        keyFields.innerHTML = '<label>Khoa hoán vị (vd: 2,0,1):</label><input id="perm" type="text" value="2,0,1">';
    } else if (method === 'vigenere' || method === 'playfair') {
        keyFields.innerHTML = '<label>Khoa (chuỗi):</label><input id="key" type="text" value="KEY">';
    }
}
document.getElementById('method').addEventListener('change', showKeyFields);
showKeyFields();

function caesar(text, key) {
    return text.replace(/[a-z]/gi, c => {
        let base = c >= 'a' ? 97 : 65;
        return String.fromCharCode((c.charCodeAt(0) - base + key) % 26 + base);
    });
}
function caesarDecrypt(text, key) {
    return caesar(text, (26 - (key % 26)) % 26);
}

function affine(text, a, b) {
    return text.replace(/[a-z]/gi, c => {
        let base = c >= 'a' ? 97 : 65;
        return String.fromCharCode((a * (c.charCodeAt(0) - base) + b) % 26 + base);
    });
}
function affineDecrypt(text, a, b) {
    let a_inv = -1;
    for (let i = 0; i < 26; i++) {
        if ((a * i) % 26 === 1) {
            a_inv = i;
            break;
        }
    }
    if (a_inv === -1) return "a không nguyên tố cùng 26!";
    return text.replace(/[a-z]/gi, c => {
        let base = c >= 'a' ? 97 : 65;
        let y = c.charCodeAt(0) - base;
        let x = (a_inv * (y - b + 26)) % 26;
        return String.fromCharCode(x + base);
    });
}

function permutation(text, perm) {
    let n = perm.length;
    let result = '';
    for (let i = 0; i < text.length; i += n) {
        let block = text.substr(i, n).padEnd(n, ' ');
        for (let idx of perm) result += block[idx];
    }
    return result;
}
function permutationDecrypt(text, perm) {
    let n = perm.length;
    let result = '';
    let inv = [];
    for (let i = 0; i < n; i++) inv[perm[i]] = i;
    for (let i = 0; i < text.length; i += n) {
        let block = text.substr(i, n).padEnd(n, ' ');
        let orig = [];
        for (let j = 0; j < n; j++) orig[inv[j]] = block[j];
        result += orig.join('');
    }
    return result.trimEnd();
}

function vigenere(text, key) {
    key = key.toUpperCase();
    let j = 0, result = '';
    for (let c of text) {
        if (/[a-z]/i.test(c)) {
            let base = c >= 'a' ? 97 : 65;
            let k = key[j % key.length].charCodeAt(0) - 65;
            result += String.fromCharCode((c.charCodeAt(0) - base + k) % 26 + base);
            j++;
        } else result += c;
    }
    return result;
}
function vigenereDecrypt(text, key) {
    key = key.toUpperCase();
    let j = 0, result = '';
    for (let c of text) {
        if (/[a-z]/i.test(c)) {
            let base = c >= 'a' ? 97 : 65;
            let k = key[j % key.length].charCodeAt(0) - 65;
            result += String.fromCharCode((c.charCodeAt(0) - base - k + 26) % 26 + base);
            j++;
        } else result += c;
    }
    return result;
}

function playfair(text, key) {
    key = key.toUpperCase().replace(/J/g, 'I');
    let matrix = [];
    let used = {};
    for (let c of key + 'ABCDEFGHIKLMNOPQRSTUVWXYZ') {
        if (/[A-Z]/.test(c) && !used[c]) {
            matrix.push(c); used[c] = true;
        }
    }
    matrix = Array.from({length:5}, (_,i)=>matrix.slice(i*5,i*5+5));
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let prepared = '';
    for (let i = 0; i < text.length; i += 2) {
        let a = text[i], b = text[i+1] || 'X';
        if (a === b) b = 'X';
        prepared += a + b;
    }
    let result = '';
    for (let i = 0; i < prepared.length; i += 2) {
        let a = prepared[i], b = prepared[i+1];
        let [r1, c1] = [0,0], [r2, c2] = [0,0];
        for (let r = 0; r < 5; r++)
            for (let c = 0; c < 5; c++) {
                if (matrix[r][c] === a) [r1, c1] = [r, c];
                if (matrix[r][c] === b) [r2, c2] = [r, c];
            }
        if (r1 === r2) {
            result += matrix[r1][(c1+1)%5] + matrix[r2][(c2+1)%5];
        } else if (c1 === c2) {
            result += matrix[(r1+1)%5][c1] + matrix[(r2+1)%5][c2];
        } else {
            result += matrix[r1][c2] + matrix[r2][c1];
        }
    }
    return result;
}
function playfairDecrypt(text, key) {
    key = key.toUpperCase().replace(/J/g, 'I');
    let matrix = [];
    let used = {};
    for (let c of key + 'ABCDEFGHIKLMNOPQRSTUVWXYZ') {
        if (/[A-Z]/.test(c) && !used[c]) {
            matrix.push(c); used[c] = true;
        }
    }
    matrix = Array.from({length:5}, (_,i)=>matrix.slice(i*5,i*5+5));
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    let result = '';
    for (let i = 0; i < text.length; i += 2) {
        let a = text[i], b = text[i+1];
        let [r1, c1] = [0,0], [r2, c2] = [0,0];
        for (let r = 0; r < 5; r++)
            for (let c = 0; c < 5; c++) {
                if (matrix[r][c] === a) [r1, c1] = [r, c];
                if (matrix[r][c] === b) [r2, c2] = [r, c];
            }
        if (r1 === r2) {
            result += matrix[r1][(c1+4)%5] + matrix[r2][(c2+4)%5];
        } else if (c1 === c2) {
            result += matrix[(r1+4)%5][c1] + matrix[(r2+4)%5][c2];
        } else {
            result += matrix[r1][c2] + matrix[r2][c1];
        }
    }
    return result;
}

function encrypt() {
    const method = document.getElementById('method').value;
    const text = document.getElementById('input').value;
    let output = '';
    if (method === 'caesar') {
        const key = parseInt(document.getElementById('key').value);
        output = caesar(text, key);
    } else if (method === 'affine') {
        const a = parseInt(document.getElementById('a').value);
        const b = parseInt(document.getElementById('b').value);
        output = affine(text, a, b);
    } else if (method === 'permutation') {
        const perm = document.getElementById('perm').value.split(',').map(Number);
        output = permutation(text, perm);
    } else if (method === 'vigenere') {
        const key = document.getElementById('key').value;
        output = vigenere(text, key);
    } else if (method === 'playfair') {
        const key = document.getElementById('key').value;
        output = playfair(text, key);
    }
    document.getElementById('output').innerText = "Kết quả mã hóa: " + output;
}

function decrypt() {
    const method = document.getElementById('method').value;
    const text = document.getElementById('input').value;
    let output = '';
    if (method === 'caesar') {
        const key = parseInt(document.getElementById('key').value);
        output = caesarDecrypt(text, key);
    } else if (method === 'affine') {
        const a = parseInt(document.getElementById('a').value);
        const b = parseInt(document.getElementById('b').value);
        output = affineDecrypt(text, a, b);
    } else if (method === 'permutation') {
        const perm = document.getElementById('perm').value.split(',').map(Number);
        output = permutationDecrypt(text, perm);
    } else if (method === 'vigenere') {
        const key = document.getElementById('key').value;
        output = vigenereDecrypt(text, key);
    } else if (method === 'playfair') {
        const key = document.getElementById('key').value;
        output = playfairDecrypt(text, key);
    }
    document.getElementById('output').innerText = "Kết quả giải mã: " + output;
}