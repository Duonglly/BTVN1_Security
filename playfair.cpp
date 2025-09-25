#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

void createMatrix(const string& key, char matrix[5][5]) {
    string temp = "";
    for (char c : key) {
        if (isalpha(c)) {
            c = toupper(c);
            if (c == 'J') c = 'I';
            if (temp.find(c) == string::npos)
                temp += c;
        }
    }
    for (char c = 'A'; c <= 'Z'; ++c) {
        if (c == 'J') continue;
        if (temp.find(c) == string::npos)
            temp += c;
    }
    int idx = 0;
    for (int i = 0; i < 5; ++i)
        for (int j = 0; j < 5; ++j)
            matrix[i][j] = temp[idx++];
}

pair<int, int> findPos(char matrix[5][5], char c) {
    if (c == 'J') c = 'I';
    for (int i = 0; i < 5; ++i)
        for (int j = 0; j < 5; ++j)
            if (matrix[i][j] == c)
                return {i, j};
    return {-1, -1};
}

string prepareText(const string& text) {
    string res = "";
    for (char c : text) {
        if (isalpha(c)) {
            c = toupper(c);
            if (c == 'J') c = 'I';
            res += c;
        }
    }
    for (size_t i = 0; i < res.length(); i += 2) {
        if (i + 1 == res.length() || res[i] == res[i + 1])
            res.insert(i + 1, 1, 'X');
    }
    if (res.length() % 2 != 0) res += 'X';
    return res;
}

string playfairEncrypt(const string& text, const string& key) {
    char matrix[5][5];
    createMatrix(key, matrix);
    string prepared = prepareText(text);
    string result = "";
    for (size_t i = 0; i < prepared.length(); i += 2) {
        auto p1 = findPos(matrix, prepared[i]);
        auto p2 = findPos(matrix, prepared[i + 1]);
        if (p1.first == p2.first) {
            result += matrix[p1.first][(p1.second + 1) % 5];
            result += matrix[p2.first][(p2.second + 1) % 5];
        } else if (p1.second == p2.second) {
            result += matrix[(p1.first + 1) % 5][p1.second];
            result += matrix[(p2.first + 1) % 5][p2.second];
        } else {
            result += matrix[p1.first][p2.second];
            result += matrix[p2.first][p1.second];
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
    cout << "Ma hoa: " << playfairEncrypt(text, key) << endl;
    return 0;
}