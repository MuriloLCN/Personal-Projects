#include <iostream>
#include <math.h>
#include <cstdio>
#include <ctime>
#include <string>

using namespace std;

bool checkPrimes(int a);

int main() {
	loop:
	clock_t start;
	float duration;
	int howManyPrimes = 0;
	cout << "---------------------------" << endl;
	cout << "Primes searcher!\n";
	cout << "---------------------------" << endl;
	
	int max;
	int min;
	
	cout << "Enter the interval in which you want to look for:\n>> Max = ";
	cin >> max;
	cout << "\n>> Min = ";
	cin >> min;
	cout << endl;
	if (min <= 1) {
		cout << "Sorry, insert another interval.\n";
		int l; cin >> l;
		system("CLS");
		goto loop;
	}
	cout << "The primes between " << min << " and " << max << " are >>\n";
	start = clock();
	for (int i = min; i <= max; i++) {
		checkPrimes(i);
		if (checkPrimes(i) == true) {
			howManyPrimes++;
			cout << ">> " << i << " is prime! (There are currently " << howManyPrimes << " primes found)\n";
		}
	}
	duration = (clock() - start) / (double) CLOCKS_PER_SEC;
	cout << duration << "." << endl;
	
	cout << "Insert 0 to close or another number to restart\n";
	int x; cin >> x;
	if (x == 0) {
		return 0;
	}
	else {
		system("CLS");
		goto loop;
	}
}

bool checkPrimes(int a) {
	int h = 2;
	if (a == 2) {
		return true;
	}
	do {		
		if (a % h == 0) {
			return false;
		}
		else {
			h++;
		}
		if (h == a - 1) {
		return true;
	}
	}
	while (h < a - 1);

}
