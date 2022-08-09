#include <stdio.h>
#include <stdlib.h>
#include <math.h>

/*
 Vê se um número N está em uma array
 Parâmetros:
 n -> número a checar
 arr -> array
 siz -> tamanho da array
*/
int estaNaArray(float n, float arr[], int siz) {
    for (int i = 0; i < siz; i++) {
        if (arr[i] == n) {
            return 1;
        }
    }
    return 0;
}

int main()
{
    // O maior expoente de X
    int grau;
    printf("Polynomial root finder\nInsert the equation degree: ");
    scanf("%d", &grau);
    printf("Insert the coefficients in order: \n");
    int coef[grau];
    int temp;

    // Pega os coeficientes da equação
    for (int i = 0; i <= grau; i++) {
        printf("X^%d: ", grau - i);
        scanf("%d", &temp);
        coef[i] = temp;
    }

    // P: Coeficiente com X^0
    // Q: Coeficiente com X^grau
    int p = coef[grau];
    int q = coef[0];

    if (p == 0 || q == 0) {
        printf("The first and the last coefficient cannot be zero for this calculation");
        return 0;
    }

    // Valores em módulo
    int mp = p;
    int mq = q;

    if (p < 0) {
        mp = -1 * p;
    }
    if (q < 0) {
        mq = -1 * q;
    }

    // Tamanho das arrays div_q e div_p
    int siz_q, siz_p;

    // Arrays com os divisores inteiros de P e Q
    float div_q[mq];
    float div_p[mp];

    // Variável temporária usada várias vezes para contar o tamanho das arrays
    int cIndex = 0;

    // Calcula os divisores de Q, salva na array e anota o tamanho
    for (int i = 1; i <= mq; i++) {
        if ((mq % i) == 0) {
            div_q[cIndex] =  i;
            div_q[cIndex + 1] = -1.0 * i;
            cIndex += 2;
        }
    }

    siz_q = cIndex;
    cIndex = 0;

    // Calcula os divisores de P, salva na array e anota o tamanho
    for (int i = 1; i <= mp; i++) {
        if ((mp % i) == 0) {
            div_p[cIndex] = i;
            div_p[cIndex + 1] =  -1.0 * i;
            cIndex += 2;
        }
    }

    siz_p = cIndex;
    cIndex = 0;

    // Array com os valores da permutação dos divisores de P divididos pelos divisores de Q

    int siz_perm = siz_q * siz_p;
    float perm[siz_perm];

    for (int bb = 0; bb < siz_q; bb++) {
        for (int aa = 0; aa < siz_p; aa++) {
            // P / Q
            float num = div_p[aa] / div_q[bb];
            if (estaNaArray(num, perm, cIndex) == 0) {
                perm[cIndex] = num;
                cIndex += 1;
            }
        }
    }

    siz_perm = cIndex;
    cIndex = 0;
    double roots[grau];

    // Sum -> Usado para manter a soma da equação durante a resolução
    // Mult -> Usado para manter a conta X^N, com X sendo um dos valores permutados e N o grau do expoente naquele ciclo

    double sum, mult;

    for (int m = 0; m < siz_perm; m++) {
        sum = 0;
        for (int gr = 0; gr <= grau; gr++) {
            mult = 1.0;
            for (int k = 0; k < gr; k++) {
                mult *= perm[m];
            }
            sum += (coef[grau - gr] * mult);
        }
        // Margem de erro pq o C tá cheio disso...
        if ((sum < 0.01 && sum > -0.01) || sum == 0) {
            roots[cIndex] = perm[m];
            cIndex += 1;
        }
    }

    printf("Roots found: \n");
    for (int i = 0; i < grau; i++) {
        printf("%f\n", roots[i]);
    }

    return 0;
}
