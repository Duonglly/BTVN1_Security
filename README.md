
# BTVN1_Security
# BÀI TẬP 1: TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN Caesar Affine Hoán vị Vigenère Playfair Với mỗi phương pháp, hãy tìm hiểu:  Tên gọi Thuật toán mã hoá, thuật toán giải mã Không gian khóa Cách phá mã (mà không cần khoá). Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript
# Các bước làm
# Caesar cipher
## Tên

-Caesar cipher (dịch Caesar)

## Thuật toán mã hóa / giải mã

-Bản rõ: letters A..Z (26 chữ cái). Mã hóa với dịch phải k:

E_k(p) = (p + k) mod 26

-Giải mã:

D_k(c) = (c - k mod 26)

(Áp dụng cho chữ hoa/chữ thường — thường bỏ ký tự khác hoặc giữ nguyên.)

## Không gian khóa

k ∈ {0..25} → 26 khóa.

## Cách phá mã (không cần khoá)

-Brute-force: thử 26 khoá.

-Frequency analysis: so sánh phân bố chữ cái (ví dụ E thường gặp trong tiếng Anh).

-Rất dễ.
## Ảnh minh họa mã hóa
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fac60ed2-f336-45c4-b10c-4362eca8193f" />
## Ảnh minh họa giải mã
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1ad3b2ae-7e9c-41fd-aca8-1d9646f88961" />
## Giải thích cách mã hóa
-Công thức: E(p) = (p + k) mod 26
-Khóa: k = 3
-Cách làm (tóm tắt): với mỗi chữ cái, dịch tiến 3 vị trí trong bảng A..Z (a→d, b→e, ...). Ký tự không phải chữ để nguyên (khoảng trắng giữ nguyên).
-Ví dụ vài ký tự:
d → g (d +3 = g)
u → x
o → r
n → q
g → j
khoảng trắng → giữ nguyên
t → w, h → k, i → l
l → o, y → b
Ciphertext:
gxrqj wkl ob
# Affine cipher
## Tên

Affine cipher (mã affine)

## Thuật toán mã hóa / giải mã

-Với khóa (a,b) với gcd(a,26)=1.

-Mã hóa: E_{a,b}(p) = (a * p + b) mod 26

-Giải mã: cần a^{-1} modulo 26 (nghịch đảo multiplicative)

D_{a,b}(c) = a^{-1} * (c - b) mod 26

## Không gian khóa

a phải coprime với 26. Số a khả dĩ = φ(26) = 12 (các a: 1,3,5,7,9,11,15,17,19,21,23,25)

b ∈ {0..25}
→ 12 * 26 = 312 khóa.

## Cách phá mã (không cần khoá)

Brute-force trên 312 khả năng.

Frequency analysis: vì là affine, chỉ là linear transform trên alphabet; phân bố tỉ lệ giữ nguyên dạng nên có thể dùng để suy a,b.
## Ảnh minh họa mã hóa
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fc0bb003-c938-4d39-9f39-6b2125faaba0" />
## Ảnh minh họa giải mã
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4fdd4d61-ac0e-4a25-a95d-de5f0c3ddccb" />
## Giải thích cách mã hóa
Công thức: E(p) = (a * p + b) mod 26 (p: 0..25 với a=5, b=8). Điều kiện: gcd(a,26)=1 — ở đây OK.
-Khóa: a=5, b=8
-Cách làm (tóm tắt): biến đổi tuyến tính mỗi chữ cái (A=0 → Z=25).
-Ví dụ vài ký tự (tính theo p = chữ số của chữ):
d (3) → (5*3 + 8) mod26 = (15+8)=23 → 23→x
u (20) → (5*20+8)=108 mod26 = 108-104=4 → e
o (14) → (5*14+8)=78 mod26 = 78-52=26 → 0 → a
n (13) → (5*13+8)=73 mod26 = 73-52=21 → v
g (6) → (5*6+8)=38 mod26 = 12 → m
khoảng trắng giữ nguyên
t→z, h→r, i→w
l→l (thật ra tính ra l), y→y (tùy tính; kết quả ở đây là ly)
Ciphertext:
xeavm zrw ly

# Permutation cipher (Hoán vị)

Mình hiểu "Hoán vị" ở đây là substitution bằng hoán vị cố định của bảng chữ cái, hoặc có thể là block permutation (chia block rồi hoán vị các vị trí). Mình trình bày cả 2 dạng ngắn.

## Dạng A — Substitution bằng hoán vị (monoalphabetic permutation)

-Key: một hoán vị của alphabet (mapping 26→26).

-Mã hóa: thay thế mỗi chữ cái bằng chữ cái tương ứng trong permutation.

-Giải mã: áp mapping ngược.

-Keyspace

26! ≈ 4.03 × 10^26 — rất lớn.

-Cách phá mã (không cần khoá)

-Frequency analysis (substitution đơn) — phổ biến trong giải mã monoalphabetic substitution: dùng tần suất chữ cái + mẫu từ (cribs) + thuật toán hill-climbing / simulated annealing để tối ưu hoán vị.

-Truy tìm các cấu trúc từ, cặp/triple chữ — digraph/trigraph.

## Dạng B — Block permutation (transposition)

- plaintext thành block kích thước n, dùng một permutation π trên {0..n-1} để sắp xếp lại vị trí trong block.

-Keyspace: n! (n nhỏ, ví dụ n=6 -> 720).

-Cách phá mã

-Dùng tần suất n-gram, xác suất ngôn ngữ, hill-climbing hoặc dùng ký tự nguyên vẹn (crib) — vì transposition giữ nguyên tần suất chữ cái nhưng thay đổi vị trí.
## Ảnh minh họa mã hóa
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dc4cfc30-01d6-47b2-97cf-a879edcf14c9" />


## Ảnh minh họa giải mã
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5ae72039-e2eb-4aee-a4bf-17861cc8af8d" />


# Vigenère cipher
## Tên

Vigenère cipher (chuỗi khóa lặp)

## Thuật toán mã hóa / giải mã

-Key K = k0 k1 ... k_{m-1} (chữ cái)

-Mã hóa: E_K(p_i) = (p_i + k_{i mod m}) mod 26

-Giải mã: D_K(c_i) = (c_i - k_{i mod m} + 26) mod 26

## Không gian khóa

-Nếu key length = m → 26^m khả năng. Nếu m là nhỏ (ví dụ 5), không quá lớn. Trong thực tế, attacker không biết m.

## Cách phá mã (không cần khoá)

Kasiski examination: tìm các khoảng cách giữa các xuất hiện của cùng đoạn trùng → ước lượng độ dài khóa m.

Friedman test: dùng chỉ số tương đồng (IC) để ước lượng m.

Sau khi biết m, phân chia ciphertext thành m nhóm (caesar trên mỗi nhóm) và dùng frequency analysis để suy key từng nhóm.

Nếu key ngắn hoặc text dài, dễ phá.
## Ảnh minh họa mã hóa
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3a61c1d6-bbfa-4cd2-99f5-f9d33f512cdc" />

## Ảnh minh họa giải mã
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dd20849f-71fa-455f-afb9-cf942fbf04e8" />

# Playfair cipher
## Tên

Playfair cipher (bảng 5x5)

## Thuật toán mã hóa / giải mã (tóm tắt)

Tạo bảng 5×5 từ khóa: viết các chữ cái từ khóa không trùng, sau đó các chữ cái còn lại (thường gộp I/J thành một ô).

Tách plaintext thành bigrams (cặp chữ). Nếu cặp có cùng chữ thì chèn chữ filler (thường 'X') giữa chúng. Nếu chiều dài lẻ thêm 'X'.

Quy tắc mã hóa cặp (A,B):

Nếu nằm cùng hàng → thay bằng chữ bên phải (vòng).

Nếu cùng cột → thay bằng chữ bên dưới (vòng).

Nếu khác hàng & cột → thay bằng hai chữ nằm cùng hàng nhưng bù cột (góc chữ nhật) — chữ A lấy cột của B, chữ B lấy cột của A.

Giải mã: cách ngược lại (trái / trên / rectangle swap).

## Không gian khóa

Tùy thuộc cách sắp xếp 25 chữ cái trong 5x5: khoảng 25! (rất lớn, ~1.5e25). Nhưng vì bảng được tạo từ khóa ngôn ngữ, thực tế không gian khả dĩ nhỏ hơn (do từ khóa có cấu trúc).

## Cách phá mã

Dùng digraph frequency analysis (phân tích cặp chữ).

Thử tìm crib (từ biết trước) hoặc dùng heuristic search/hill-climbing để tối ưu bảng.

Chứa nhiều thông tin dạng bigram nên có thể bị tấn công bằng thuật toán tự động.
## Ảnh minh họa mã hóa
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a86f3f22-5b5a-4378-941f-06907b093945" />

## Ảnh minh họa giải mã
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2bdd32a6-d907-43c8-ba0d-913d1d6b416e" />

