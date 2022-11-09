# Equation-System-Solver

This is a simple algorythm to solve a system of N equations with N variables by a matrix manipulation method.

The core of the method is: Add the first line multiplied by a value to all other lines so that only the first element is different from zero, then repeat that for the
second element of the second line, and so on and forth. 

There are other methods to solve the same problem, such as determinants and substitution, but this method is very human-doable as it does not involve solving huge
determinants by hand, and doesn't rely on specific details, such as a line having a lot of zeroes or the first element being one, so it works for most cases.
