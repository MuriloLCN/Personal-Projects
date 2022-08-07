#include <stdio.h>
#include <stdlib.h>

/*
void pegar(char mensagem[200], int *ptr, char modo[2]) {
    printf("%s", mensagem);

    if (modo == "%s") {
        scanf(modo, *ptr);
    }
    else {
        scanf(modo, &*ptr);
    }

    printf("\n");
}
*/

void main()
{
    float precoPacoteDeArroz = 12.5;
    float precoPacoteDeFeijao = 8;
    float precoCaixaDeOvos = 6.5;
    float precoRefrigerante = 5.5;
    float precoSalgadinho = 3.5;

    float valorCompra, troco, valorRecebido;

    int qtdArroz = 0, qtdFeijao = 0, qtdOvos = 0, qtdRefrigerante = 0, qtdSalgadinho = 0;

    int temp;

    float subTotal = 0;

    while (1){
        system("cls");
        printf("-------------------------\nSupermercado C\n-------------------------\n\n");
        printf("Qual item voce deseja comprar?\n");
        printf("[1] Arroz       (preco: %.2f) | No carrinho: %d\n", precoPacoteDeArroz, qtdArroz);
        printf("[2] Feijao       (preco: %.2f) | No carrinho: %d\n", precoPacoteDeFeijao, qtdFeijao);
        printf("[3] Ovos         (preco: %.2f) | No carrinho: %d\n", precoCaixaDeOvos, qtdOvos);
        printf("[4] Refrigerante (preco: %.2f) | No carrinho: %d\n", precoRefrigerante, qtdRefrigerante);
        printf("[5] Salgadinho   (preco: %.2f) | No carrinho: %d\n", precoSalgadinho, qtdSalgadinho);
        printf("Sub total: %.2f\n", subTotal);
        printf("Insira [0] para finalizar suas compras, ou o negativo do numero do item para retirar um\n");

        scanf("%d", &temp);
        fflush(stdin);

        int mult = 1;

        if (temp == 0) {
            printf("\nSeu subtotal: %.2f", subTotal);
            printf("\nInsira o valor que ira pagar: R$");
            scanf("%f", &valorRecebido);
            fflush(stdin);
            troco = valorRecebido - subTotal;
            if (troco < 0) {
                printf("\nVoce nao tem dinheiro suficiente para cobrir essa transacao, tente retirar algum item do carrinho\n");
                printf("[0] Cancelar transacao mesmo assim\n[Outro valor] Voltar a tela de compras\n");
                scanf("%d", &temp);
                fflush(stdin);
                if (temp == 0) {
                    break;
                }
            } else {
                printf("\n-------------\nObrigado pela preferencia\nSeu troco: R$%.2f", troco);
                break;
            }
        }
        if (temp < 0) {
            temp *= -1;
            mult *= -1;
        }

        switch (temp) {
            case 1:
                if (qtdArroz <= 0 && mult == -1) {
                    break;
                }
                subTotal += precoPacoteDeArroz * mult;
                qtdArroz += 1 * mult;
                break;
            case 2:
                if (qtdFeijao <= 0 && mult == -1) {
                    break;
                }
                subTotal += precoPacoteDeFeijao * mult;
                qtdFeijao += 1 * mult;
                break;
            case 3:
                if (qtdOvos <= 0 && mult == -1) {
                    break;
                }
                subTotal += precoCaixaDeOvos * mult;
                qtdOvos += 1 * mult;
                break;
            case 4:
                if (qtdRefrigerante <= 0 && mult == -1) {
                    break;
                }
                subTotal += precoRefrigerante * mult;
                qtdRefrigerante += 1 * mult;
                break;
            case 5:
                if (qtdSalgadinho <= 0 && mult == -1) {
                    break;
                }
                subTotal += precoSalgadinho * mult;
                qtdSalgadinho += 1 * mult;
                break;
        }
    }

    printf("\nTotal da compra: %.2f", subTotal);


    /*
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
    */
}
