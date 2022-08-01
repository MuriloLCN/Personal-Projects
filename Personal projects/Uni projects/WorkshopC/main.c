#include <stdio.h>
#include <stdlib.h>

void pegar(char mensagem[200], int *ptr, char modo[2]) {
    printf("%s", mensagem);

    scanf(modo, &*ptr);

    printf("\n");
}

void main()
{
    printf("-------------------------\nSupermercado C\n-------------------------\n\n");

    float precoPacoteDeArroz = 12.5;
    float precoPacoteDeFeijao = 8;
    float precoCaixaDeOvos = 6.5;
    float precoRefrigerante = 5.5;
    float precoSalgadinho = 3.5;

    float valorCompra, troco, valorRecebido;

    int qtdArroz, qtdFeijao, qtdOvos, qtdRefrigerante, qtdSalgadinho;

    printf("Insira o numero de itens comprados\n-------------------------\n");

    printf("Preco arroz: %.2f\n", precoPacoteDeArroz);
    pegar("Pacotes arroz: ", &qtdArroz, "%d");

    printf("Preco feijao: %.2f\n", precoPacoteDeFeijao);
    pegar("Pacotes feijao: ", &qtdFeijao, "%d");

    printf("Preco caixa ovos: %.2f\n", precoCaixaDeOvos);
    pegar("Duzias de ovos: ", &qtdOvos, "%d");

    printf("Preco refrigerantes: %.2f\n", precoRefrigerante);
    pegar("Refrigerantes: ", &qtdRefrigerante, "%d");

    printf("Preco salgadinhos: %.2f\n", precoSalgadinho);
    pegar("Salgadinhos: ", &qtdSalgadinho, "%d");

    valorCompra = 0;
    valorCompra += precoPacoteDeArroz * qtdArroz;
    valorCompra += precoPacoteDeFeijao * qtdFeijao;
    valorCompra += precoCaixaDeOvos * qtdOvos;
    valorCompra += precoRefrigerante * qtdRefrigerante;
    valorCompra += precoSalgadinho * qtdSalgadinho;

    printf("-------------------------\nValor total da compra: R$%.2f\n", valorCompra);

    pegar("Insira o valor pago: R$", &valorRecebido, "%f");

    troco = valorRecebido - valorCompra;

    printf("Troco: R$%.2f\n", troco);

    printf("\n-------------------------\nObrigado pela preferencia, tenha um bom dia!\n-------------------------\n");

}
