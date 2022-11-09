using System.Diagnostics;

List<Number> addEquations(List<Number> equation1, List<Number> equation2)
{
    // Adds two equations together, returns a new list with each element being the sum of the two equations

    List<Number> result = new List<Number>();

    foreach (Number item in equation1)
    {
        result.Add(item);
    }
    for (int i = 0; i < equation2.Count; i++)
    {
        result[i] = add(result[i], equation2[i]);
    }

    return result;
}

List<Number> multiplyEquation(List<Number> eq, Number n)
{
    // Multiplies an equation by a scalar, returns their product

    List<Number> result = new List<Number>();

    foreach (Number item in eq)
    {
        result.Add(multiply(item, n));
    }

    return result;
}

bool isIndeterminate(List<Number> eq)
{
    // Checks if an equatios is indeterminate, i.e, 0x + 0y + 0z + ... = 0

    foreach (Number elem in eq)
    {
        if (!elem.isZero())
        {
            return false;
        }
    }
    return true;
}

bool isImpossible(List<Number> eq)
{
    // Checks if an equation is impossible, i.e, 0x + 0y + 0z + ... = k, where (k != 0)

    if (eq[eq.Count - 1].isZero())
    {
        return false;
    }

    for (int i = 0; i < eq.Count - 1; i++) 
    {
        if (!eq[i].isZero())
        {
            return false;
        }
    }

    return true;
}

List<Number> checkSingledNumber(List<Number> eq)
{
    // Checks if an equation has zero in all coefficients but one and returns the result for the non-zero coeff. and it's index
    // Retuns an empty list if not found
    // Example: "0x + 0y + 3z = 12" will return [2, 4] and "0x + 3y + 0z = 15" will return [1, 5] -> [index, result]

    bool isAllZeros = true;
    Number res = new Number(-1);

    for (int i = 0; i < eq.Count - 1; i++)
    {
        if (eq[i].isZero())
        {
            continue;
        }
        else
        {
            if (!isAllZeros) // If it has found another non-zero value in the coefficients
            {
                return new List<Number>();
            }
            isAllZeros = false;
            res = new Number(i);
        }
    }

    if (res.getValue() == -1)
    {
        return new List<Number>();
    }
    Number[] t = { res, divide(eq[eq.Count - 1], eq[(int)res.getValue()]) };

    return new List<Number>(t);
}

bool hasNullColumn(List<List<Number>> systemEquations)
{
    // Checks if there are any columns that are only composed of zeros
    // Example:
    // 0x + 2y = -1
    // 0x - 7y = 5

    for (int i = 0; i < systemEquations[0].Count - 1; i++)
    {
        bool allZero = true;
        foreach (List<Number> equation in systemEquations)
        {
            if (!equation[i].isZero())
            {
                allZero = false;
            }
        }
        if (allZero)
        {
            return true;
        }
    }
    return false;
}

List<List<Number>> avoidZeros(List<List<Number>> systemEquations, out bool possible)
{
    // Checks if all numbers of any column are zeros, tries to swap rows around if elements from the main diagonal are zero

    if (systemEquations.Count == 0 || hasNullColumn(systemEquations))
    {
        possible = false;
        return new List<List<Number>>();
    }

    for (int j = 0; j < systemEquations[0].Count - 1;  j++)
    {
        if (systemEquations[j][j].isZero())
        {
            for (int k = systemEquations.Count - 1; k > 0; k--)
            {
                if (k == j)
                {
                    continue;
                }
                if (systemEquations[k][j].isZero())
                {
                    var temp = systemEquations[k];
                    systemEquations[k] = systemEquations[j];
                    systemEquations[j] = temp;
                }
            }
        }
    }
    possible = true;
    return systemEquations;
}

double getNumber()
{
    // Gets input number from user

    bool possible = false;
    double val = 0;

    while (!possible)
    {
        string? input = Console.ReadLine();
        if (input != null)
        {
            input = input.Replace(".", ",");
        }
        possible = double.TryParse(input, out val);
        if (!possible || input == null)
        {
            Console.Write(" -invalid number- \n>> ");
            continue;
        }
        val = Convert.ToDouble(input);
    }
    return val;

}

List<List<Number>> getSystem()
{
    // Gets the system of equations from the user's inputs

    Console.Write("Insert the number of equations: \n>> ");
    int numberOfEquations = (int)Math.Round(getNumber());
    List<List<Number>> res = new List<List<Number>>();

    Console.WriteLine("Insert the coefficients for the equations (note: last coeff. is the result)");
    for (int i = 0; i < numberOfEquations; i++)
    {
        List<Number> ct = new List<Number>();
        for (int j = 0; j <= numberOfEquations; j++)
        {
            Console.Write($"Eq. {i + 1}, Coef. {j + 1}: ");  // Math notation does not start at zero
            ct.Add(new Number(getNumber()));
        }
        res.Add(ct);
    }
    return res;
}

void printMatrix(List<List<Number>> equationSystem)
{
    // Prints the system of equations
    foreach (var equation in equationSystem) {
        Console.Write("> ");
        foreach (Number n in equation)
        {
            Console.Write($"{n.getValue()} ");
        }
        Console.Write("\n");
    }
    Console.WriteLine();
}

bool indeterminateOrImpossible(List<List<Number>> equationSystem)
{
    // Checks wether the system passed in has any impossible or indeterminate equations

    if (equationSystem.Count <= 0)
    {
        Console.WriteLine("No equations found");
        return true;
    }
    foreach (var equation in equationSystem)
    {
        if (isIndeterminate(equation))
        {
            Console.WriteLine("The system has an indeterminate equation");
            return true;
        }
        if (isImpossible(equation))
        {
            Console.WriteLine("The system has an impossible equation");
            return true;
        }
    }

    return false;
}

void tests()
{
    // Test function 

    Console.WriteLine("Beginning tests");

    List<Number> eq1 = new List<Number>() {new Number(0), new Number(0), new Number(0), new Number(0) };
    List<Number> eq2 = new List<Number>() {new Number(1), new Number(0), new Number(0), new Number(1) };
    List<Number> eq3 = new List<Number>() {new Number(0), new Number(0), new Number(1), new Number(1) };
    List<Number> eq4 = new List<Number>() { new Number(1), new Number(2), new Number(3), new Number(0) };
    List<Number> eq5 = new List<Number>() { new Number(6.6), new Number(9.287042942276), new Number(0), new Number(-3)};
    List<Number> eq6 = new List<Number>() { new Number(-0), new Number(0.0), new Number(-0), new Number(8) };
    List<Number> eq7 = new List<Number>() { new Number(8), new Number(8), new Number(8), new Number(2) };
    List<Number> eq8 = new List<Number>() { new Number(1), new Number(8), new Number(6), new Number(2) };
    List<Number> eq9 = new List<Number>() { new Number(-5), new Number(0), new Number(0), new Number(5) };

    Console.WriteLine("Testing addEquations()");
    Debug.Assert(addEquations(eq1, eq5).Equals(eq5));
    Debug.Assert(addEquations(eq2, eq7).Equals(new List<Number>() { new Number(8), new Number(8), new Number(8), new Number(3) }));
    Debug.Assert(addEquations(eq9, eq4).Equals(new List<Number>() { new Number(-4), new Number(2), new Number(3), new Number(5)}));
    Debug.Assert(addEquations(eq6, eq3).Equals(new List<Number>() { new Number(0), new Number(0), new Number(1), new Number(0.2)}));
    Console.WriteLine("addEquations() tests' passed");

    Console.WriteLine("Testing multiplyEquation()");
    Debug.Assert(multiplyEquation(eq1, new Number(2)).Equals(eq1));
    Debug.Assert(multiplyEquation(eq5, new Number(0)).Equals(eq1));
    Debug.Assert(multiplyEquation(eq8, new Number(-1)).Equals(new List<Number>() { new Number(-1), new Number(-8), new Number(-6), new Number(-2)}));
    Debug.Assert(multiplyEquation(eq9, new Number(0.2)).Equals(new List<Number>() { new Number(-1), new Number(0), new Number(0), new Number(1)}));
    Console.WriteLine("multiplyEquation() tests' passed");

    Console.WriteLine("Testing isIndeterminate()");
    Debug.Assert(isIndeterminate(eq1) == true);
    Debug.Assert(isIndeterminate(eq2) == false);
    Debug.Assert(isIndeterminate(eq3) == false);
    Debug.Assert(isIndeterminate(eq6) == false);
    Console.WriteLine("isIndeterminate() tests' passed");
    
    Console.WriteLine("Testing isImpossible()");
    Debug.Assert(isImpossible(eq1) == false);
    Debug.Assert(isImpossible(eq2) == true);
    Debug.Assert(isImpossible(eq6) == true);
    Debug.Assert(isImpossible(eq8) == false);
    Console.WriteLine("isImpossible() tests' passed");
    
    Console.WriteLine("Testing hasNullColumn()");
    Debug.Assert(hasNullColumn(new List<List<Number>> {eq1, eq2, eq3}) == true);
    Debug.Assert(hasNullColumn(new List<List<Number>> {eq2, eq3, eq4}) == false);
    Debug.Assert(hasNullColumn(new List<List<Number>> {eq3, eq9, eq6}) == true);
    Debug.Assert(hasNullColumn(new List<List<Number>> {eq5, eq7, eq8}) == false);
    Console.WriteLine("hasNullColumn() tests' passed");

    Console.WriteLine("Testing checkSingledNumber()");
    Debug.Assert(checkSingledNumber(eq1).Equals(new List<Number>()));
    Debug.Assert(checkSingledNumber(eq3).Equals(new List<Number>() { new Number(2), new Number(1) }));
    Debug.Assert(checkSingledNumber(eq7).Equals(new List<Number>()));
    Debug.Assert(checkSingledNumber(eq9).Equals(new List<Number>() { new Number(0), new Number(-1) }));
    Console.WriteLine("checkSingledNumber() tests' passed");

    Console.WriteLine("Testing avoidZeros()");
    bool dummy;
    Debug.Assert(avoidZeros(new List<List<Number>> {eq1, eq2, eq3}, out dummy).Equals(new List<List<Number>> {}));
    Debug.Assert(dummy == false);
    Debug.Assert(avoidZeros(new List<List<Number>> {eq3, eq9, eq4}, out dummy).Equals(new List<List<Number>> {eq9, eq4, eq3}));
    Debug.Assert(dummy == true);
    Debug.Assert(avoidZeros(new List<List<Number>> {eq5, eq7, eq8}, out dummy).Equals(new List<List<Number>> {eq5, eq7, eq8}));
    Debug.Assert(dummy == true);
    Debug.Assert(avoidZeros(new List<List<Number>> {eq8, eq7, eq9}, out dummy)[0].Equals(eq9));
    Debug.Assert(dummy == true);
    Console.WriteLine("avoidZeros() tests' passed");

    Console.WriteLine("All tests passed");
}

void calculate(List<List<Number>> equationSystem)
{
    // Main calculating function

    // Checking for indeterminations and impossible equations
    if (indeterminateOrImpossible(equationSystem))
    {
        return;
    }

    // For every number in the main diagonal, add it's row multiplied by a value to the other rows so that only the elements of the main
    // diagonal are not zero
    for (int i = 0; i < equationSystem[0].Count - 1; i++)
    {
        for (int j = 0; j < equationSystem[0].Count - 1; j++)
        {
            //equationSystem = roundSystem(equationSystem);
            if (j == i)
            {
                continue;
            }
            bool p; // Dummy variable
            if (equationSystem[i][i].isZero())
            {
                equationSystem = avoidZeros(equationSystem, out p);
            }
            Number p1 = multiply(new Number(-1), divide(equationSystem[j][i], equationSystem[i][i]));
            equationSystem[j] = addEquations(equationSystem[j], multiplyEquation(equationSystem[i], p1));
        }
    }

    List<List<Number>> indexes = new List<List<Number>>();
    List<Number> results = new List<Number>();
    foreach (var eq in equationSystem)
    {
        var t = checkSingledNumber(eq);
        indexes.Add(t);
        try
        {
            results.Add(t[1]);
        }
        catch
        {
            Console.WriteLine("Could not calculate the solution for the system");
            printMatrix(indexes);
            return;
        }
    }

    Console.WriteLine("Results found: ");
    foreach (Number num in results)
    {
        Console.Write($"{num.getValue()} ");
    }
}

void main()
{
    // Main function

    // tests();

    List<List<Number>> inputSystem;
    inputSystem = getSystem();

    bool isPossible;
    inputSystem = avoidZeros(inputSystem, out isPossible);
    printMatrix(inputSystem);

    if (isPossible)
    {
        calculate(inputSystem);
    }
    else
    {
        Console.WriteLine("Cannot calculate the solutions");
    }
}

main();

Number add(Number n1, Number n2)
{
    // Adds two Number elements together
    double num = n1.numerator * n2.denominator + n2.numerator * n1.denominator;
    double den = n1.denominator * n2.denominator;
    Number result = new Number(num, den);

    return result;
}

Number multiply(Number n1, Number n2)
{
    // Multiplies two Number elemements

    double num = n1.numerator * n2.numerator;
    double den = n1.denominator * n2.denominator;

    return new Number(num, den);
}

Number divide(Number n1, Number n2)
{
    // Divides two Number elements

    double num = n1.numerator * n2.denominator;
    double den = n1.denominator * n2.numerator;

    return new Number(num, den);
}

public class Number
{
    // Class used to store a number as a numerator and a denominator, used to avoid loss of precision

    public double numerator;
    public double denominator;

    public Number(double value)
    {
        // Creates a new instance from a double number, multiplies by 10 until the new value is an integer
        double den = 1;
        double num = value;
        while (Math.Floor(num) != num)
        {
            num *= 10;
            den *= 10;
        }
        numerator = num;
        denominator = den;
    }

    public Number(double num, double den)
    {
        // Creates a new instance from a numerator and a denominator

        numerator = num;
        if (den != 0)
        {
            denominator = den;
        }
        else
        {
            denominator = 1;
        }
    }

    public double getValue()
    {
        // Evaluates the division

        return (numerator / denominator);
    }

    public bool isZero()
    {
        // Returns whether the division evaluates to zero
        return numerator == 0;
    }
}
