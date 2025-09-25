#include <iostream>
#include <string>
using namespace std;

// Hàm kiểm tra a nguyên tố cùng 26
bool isCoprime(int a) {
    int b = 26;
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a == 1;
}

string affineEncrypt(const string& text, int a, int b) {
    string result = "";
    a = a % 26;
    b = b % 26;
    if (!isCoprime(a)) {
        return "a khong nguyen to cung 26!";
    }
    for (char c : text) {
        if (isupper(c))
            result += char((a * (c - 'A') + b) % 26 + 'A');
        else if (islower(c))
            result += char((a * (c - 'a') + b) % 26 + 'a');
        else
            result += c;
    }
    return result;
}

int main() {
    string text;
    int a, b;
    cout << "Nhap chuoi: ";
    getline(cin, text);
    cout << "Nhap a (nguyen to cung 26): ";
    cin >> a;
    cout << "Nhap b: ";
    cin >> b;
    cin.ignore();
    cout << "Ma hoa: " << affineEncrypt(text, a, b) << endl;


}    return 0;    return 0;
}