bool isInArray(float n, List<float> arr)
{
    for (int i = 0; i < arr.Count; i++)
    {
        if (arr[i] == n)
        {
            return true;
        }
    }
    return false;
}

// Gets a list of all integer divisors of a number N
List<float> getDivisors(int n)
{
    List<float> arr = new List<float>();

    for (int i = 1; i <= Math.Abs(n); i++)
    {
        if (Math.Abs(n) % i == 0)
        {
            arr.Add(i);
            arr.Add(-i);
        }
    }

    return arr;
}

// Solves a polynomial equation for a given value X
// Parameters:
// x -> Value to be substituted in the equation
// coefs -> List with the coeficients of the equation in descending order of power
// degree -> Degree of the equation
float solveForX(float x, List<int> coefs, int degree)
{
    float sum = 0;
    for (int deg = 0; deg <= degree; deg++)
    {
        sum += coefs[degree - deg] * (float)Math.Pow(x, deg);
    }
    return sum;
}


int grau;
bool consegueConverterGrau;

Console.WriteLine("Polynomial root finder");
Console.Write("Insert the equation degree: ");

consegueConverterGrau = Int32.TryParse(Console.ReadLine(), out grau);

if (!consegueConverterGrau)
{
    Console.WriteLine("The string you inserted is invalid");
    return;
}

bool conseguiuConverter;
// Coeficientes da equação
List<int> coeficientes = new List<int>();

for (int i = 0; i <= grau; i++)
{
    Console.Write("X^" + (grau - i).ToString() + ": ");
    int temp;
    conseguiuConverter = Int32.TryParse(Console.ReadLine(), out temp);
    coeficientes.Add(temp);
    if (!conseguiuConverter)
    {
        Console.WriteLine("The string you inserted is invalid");
        return;
    }

}

// P: Coeficiente com X^^0
// Q: Coeficiente com X^grau
int p = coeficientes[grau];
int q = coeficientes[0];

if (p == 0 || q == 0)
{
    Console.WriteLine("The first and the last coefficients cannot be zero for this method");
    return;
}

List<float> divisoresP = getDivisors(p);
List<float> divisoresQ = getDivisors(q);

// Permutações com os possíveis valores de P divididos com os possíveis valores de Q
List<float> permutations = new List<float>();

for (int a = 0; a < divisoresP.Count; a++)
{
    for (int b = 0; b < divisoresQ.Count; b++)
    {
        float num = divisoresP[a] / divisoresQ[b];
        if (!isInArray(num, permutations))
        {
            permutations.Add(num);
        }
    }
}

List<float> roots = new List<float>();
float res;

// Tenta resolver a equação com os valores candidatos obtidos pela permutação dos divisores
// usando o método do teorema das raízes racionais
for (int m = 0; m < permutations.Count; m++)
{
    res = solveForX(permutations[m], coeficientes, grau);

    if (res == 0)
    {
        roots.Add(permutations[m]);
    }
}

Console.WriteLine("Roots found by this method: ");
if (roots.Count == 0)
{
    Console.WriteLine("None");
}
roots.ForEach(r => Console.Write(r.ToString() + " "));

Console.WriteLine("\n\n-----------\nDetails\n-----------\nValues of P: ");
divisoresP.ForEach(r => Console.Write(r.ToString() + " "));

Console.WriteLine("\nValues of Q: ");
divisoresQ.ForEach(r => Console.Write(r.ToString() + " "));

Console.WriteLine("\nPermutations of P/Q: ");
permutations.ForEach(r => Console.WriteLine(r.ToString() + " -> " + solveForX(r, coeficientes, grau).ToString()));

Console.ReadLine();