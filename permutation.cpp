#include <iostream>
#include <string>
#include <vector>
using namespace std;

string permutationEncrypt(const string& text, const vector<int>& key) {
    int n = key.size();
    string result = "";
    for (size_t i = 0; i < text.length(); i += n) {
        string block = text.substr(i, n);
        while (block.length() < n) block += ' ';
        for (int idx : key) {
            if (idx >= 0 && idx < n)
                result += block[idx];
        }
    }
    return result;
}

int main() {
    string text;
    int n;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap do dai khoa: ";
    cin >> n;
    vector<int> key(n);
    cout << "Nhap khoa hoan vi (vd: 2 0 1): ";
    for (int i = 0; i < n; ++i) cin >> key[i];
    cin.ignore();
    cout << "Ma hoa: " << permutationEncrypt(text, key) << endl;
    return 0;
}