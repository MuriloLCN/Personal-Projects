#include <iostream>
#include <math.h>
#include <cstdlib>

using namespace std;

float celsius(float self);
float fahrenheit(float self);
float kelvin(float self);

int main() {
	loop:
	cout << "Temperature conversor\nIn which unit is the know value?\n";
	cout << "\n[1] Celsius\n[2] Fahrenheit\n[3] Kelvin\n(insert 0 to close)\n>> ";
	int cur; cin >> cur;
	if (cur != 1 && cur != 2 && cur != 3 && cur != 0) {
		system("CLS");
		goto loop;
	}
	if (cur == 0) {
		return 0;
	}
	cout << "\nInsert the value\n>> ";
	float self; cin >> self;
	if (cur == 1) {
		celsius(self);
		system("CLS");
		goto loop;
	}
	if (cur == 2) {
		fahrenheit(self);
		system("CLS");
		goto loop;
	}
	if (cur == 3) {
		kelvin(self);
		system("CLS");
		goto loop;
	}
}
		
float celsius(float self) {
	float c = self;
	float f = ((9 * self) + 160) / 5;
	float k = self + 273.15;
	cout << "\nCelsius = " << c << "\nFahrenheit = " << f << "\nKelvin = " << k << endl;
	cout << "(insert any number to proceed)\n";
	int i; cin >>i;
}
float fahrenheit(float self) {
	float c = ((5 * self) - 160) / 9; 
	float f = self;
	float k = c + 273.15;
	cout << "\nCelsius = " << c << "\nFahrenheit = " << f << "\nKelvin = " << k << endl;	
	cout << "(insert any number to proceed)\n";
	int i; cin >>i;	
}
float kelvin(float self) {
	float c = self - 273.15;
	float f = ((9 * c) + 160) / 5;
	float k	= self;
	cout << "\nCelsius = " << c << "\nFahrenheit = " << f << "\nKelvin = " << k << endl;	
	cout << "(insert any number to proceed)\n";
	int i; cin >>i;	
}	
