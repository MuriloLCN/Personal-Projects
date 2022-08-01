#include <iostream>
#include <string>
#include <math.h>

using namespace std;

int sum(int deg1, int min1, int seg1, int deg2, int min2, int seg2);
int sub(int deg1, int min1, int seg1, int deg2, int min2, int seg2);
int mul(int deg1, int min1, int seg1, int factor);
int div(int deg1, int min1, int seg1, int factor);

int main() {
	loop:
	cout << "Deg - Min - Sec - Calculator" << endl;
	cout << "What operation will be done? \n[1] Addition\n[2] Subtraction\n[3] Multiplication\n[4] Division\n>>";
	int x; cin >> x;
	int dego, mino, sego, degt, mint, segt, factor;
	switch (x) {
		case 1:
			cout << "Insert the numbers in order >>\nDeg1 >> "; cin >> dego; cout << "\nMin1 >> "; cin >> mino; cout << "\nSec1 >> "; cin >> sego;
			cout << "\nDeg2 >> "; cin >> degt; cout << "\nMin2 >> "; cin >> mint; cout << "\nSec2 >> "; cin >> segt;
			system("CLS");
			sum(dego, mino, sego, degt, mint, segt);
			break;
		case 2:
			cout << "Insert the numbers in order >>\nDeg1 >> "; cin >> dego; cout << "\nMin1 >> "; cin >> mino; cout << "\nSec1 >> "; cin >> sego;
			cout << "\nDeg2 >> "; cin >> degt; cout << "\nMin2 >> "; cin >> mint; cout << "\nSec2 >> "; cin >> segt;
			system("CLS");
			sub(dego, mino, sego, degt, mint, segt);
			break;
		case 3:
			cout << "Insert the numbers in order >>\nDeg1 >> "; cin >> dego; cout << "\nMin1 >> "; cin >> mino; cout << "\nSec1 >> "; cin >> sego;
			cout << "\nFactor of multiplication >> "; cin >> factor;
			system("CLS");
			mul(dego, mino, sego, factor);
			break;
		case 4:
			cout << "Insert the numbers in order >>\nDeg1 >> "; cin >> dego; cout << "\nMin1 >> "; cin >> mino; cout << "\nSec1 >> "; cin >> sego;
			cout << "\nFactor of division >> "; cin >> factor;
			system("CLS");
			div(dego, mino, sego, factor);
			break;
		default:
			cout << "This is not a valid number\n";
			system("CLS");
			goto loop;
	}
	goto loop;
}

int sum(int deg1, int min1, int seg1, int deg2, int min2, int seg2) {
	int degr, minr, segr;	
	segr = seg1 + seg2;
	minr = min1 + min2;
	degr = deg1 + deg2;
	if (segr >= 60) {
		minr += (segr / 60);
		int h = segr % 60;
		segr = h;
	}
	if (degr >= 60) {
		degr += (minr / 60);
		int j = minr % 60;
		minr = j;
	}
	cout << degr << "° " << minr << "' " << segr << "''" << endl;
	cout << "Insert 0 to close the program"; int p; cin >> p; if (p == 0) { return 0; }
}

int sub(int deg1, int min1, int seg1, int deg2, int min2, int seg2) {
	int degr, minr, segr;
	if (seg1 < seg2) {
		min1--;
		seg1 += 60;
	}
	if (min1 < min2) {
		deg1--;
		min1 += 60;
	}
	segr = seg1 - seg2;
	minr = min1 - min2;
	degr = deg1 - deg2;
	cout << degr << "° " << minr << "' " << segr << "''" << endl;
	cout << "Insert 0 to close the program"; int p; cin >> p; if (p == 0) { return 0; }
}
	
int mul(int deg1, int min1, int seg1, int factor) {
	int degr, minr, segr;
	segr = seg1 * factor;
	minr = min1 * factor;
	degr = deg1 * factor;
	
	if (segr >= 60) {
		minr += (segr / 60);
		int h = segr % 60;
		segr = h;
	}
	if (minr >= 60) {
		degr += (minr / 60);
		int j = minr % 60;
		minr = j;
	}
	cout << degr << "° " << minr << "' " << segr << "''" << endl;
	cout << "Insert 0 to close the program"; int p; cin >> p; if (p == 0) { return 0; }
}

int div(int deg1, int min1, int seg1, int factor) {
	int degr, minr, segr;
	degr = deg1 / factor;
	if ((degr % factor) != 0) {
		minr += 60 * (degr % factor);
	}
	minr = min1 / factor;
	if ((minr % factor) != 0) {
		segr += 60 * (minr % factor);
	}
	segr = seg1 / factor;
	
	cout << degr << "° " << minr << "' " << segr << "''" << endl;
	cout << "Insert 0 to close the program"; int p; cin >> p; if (p == 0) { return 0; }
}
