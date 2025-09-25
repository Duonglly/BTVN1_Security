#include <iostream>
#include <string>
using namespace std;

string vigenereEncrypt(const string& text, const string& key) {
    string result = "";
    int keyLen = key.length();
    int j = 0;
    for (char c : text) {
        if (isupper(c)) {
            char k = toupper(key[j % keyLen]) - 'A';
            result += char((c - 'A' + k) % 26 + 'A');
            j++;
        } else if (islower(c)) {
            char k = toupper(key[j % keyLen]) - 'A';
            result += char((c - 'a' + k) % 26 + 'a');
            j++;
        } else {
            result += c;
        }
    }
    return result;
}

int main() {
    string text, key;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap khoa: ";
    getline(cin, key);
    cout << "Ma hoa: " << vigenereEncrypt(text, key) << endl;
    return 0;
}