#include <iostream>
#include <string>
using namespace std;

string caesarEncrypt(const string& text, int key) {
    string result = "";
    key = key % 26;
    for (char c : text) {
        if (isupper(c))
            result += char((c - 'A' + key + 26) % 26 + 'A');
        else if (islower(c))
            result += char((c - 'a' + key + 26) % 26 + 'a');
        else
            result += c;
    }
    return result;
}

int main() {
    string text;
    int key;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap khoa: ";
    cin >> key;
    cout << "Ma hoa: " << caesarEncrypt(text, key) << endl;
    return 0;
}