#include <iostream>
#include <math.h>

using namespace std;

int main() {
	float a, b, c;
	float delta;
	float res1, res2;
	float vertexX, vertexY;
	loop:
	cout << "2nd degree equations solver" << endl;
	cout << "Insert A, B and C (as in ax^2 + bx + c = 0) " << endl;
	cout << "A >> "; cin >> a;
	cout << "\nB >> "; cin >> b;
	cout << "\nC >> "; cin >> c;
	delta = (b*b) - (4 * a * c);
	res1 = ((b * -1) + sqrt(delta)) / (2 * a);
	res2 = ((b * -1) - sqrt(delta)) / (2 * a);
	vertexX = (b * -1) / (2*a);
	vertexY = (delta * -1) / (4 * a);
	cout << "The results are " << res1 << " and " << res2 << ".\nThe vertex X's position is " << vertexX << " and the vertex Y's position is " << vertexY << "\n Press 0 to close\n";
	int h; cin >> h; if (h == 0) {
		return 0;
	}
	goto loop;
}
