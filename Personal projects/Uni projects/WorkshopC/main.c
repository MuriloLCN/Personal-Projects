#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int numero_items;
    float preco;
    char * nome;
} Item;

void main()
{
    Item arroz;
    arroz.nome = "Pacote de arroz";
    arroz.preco = 12.5;

    Item feijao;
    feijao.nome = "Pacote de feijao";
    feijao.preco = 8;

    Item ovos;
    ovos.nome = "Caixa de ovos";
    ovos.preco = 6.5;

    Item refrigerante;
    refrigerante.nome = "Refrigerante";
    refrigerante.preco = 5.5;

    Item salgadinho;
    salgadinho.nome = "Salgadinho";
    salgadinho.preco = 3.5;

    int numeroItems = 5;
    Item estoque[] = {arroz, feijao, ovos, refrigerante, salgadinho};

    for (int l = 0; l < numeroItems; l++) {
        estoque[l].numero_items = 0;
    }

    float valorCompra, troco, valorRecebido;

    int temp;

    float subTotal = 0;

    while (1){
        system("cls");
        printf("-------------------------\nSupermercado C\n-------------------------\n\n");
        printf("Qual item voce deseja comprar?\n");
        for (int k = 0; k < numeroItems; k++) {
            printf("[%d] %s (preco: %.2f) | No carrinho: %d\n", k + 1, estoque[k].nome, estoque[k].preco, estoque[k].numero_items);
        }
        printf("Sub total: %.2f\n", subTotal);
        printf("Insira [0] para finalizar suas compras\n");

        scanf("%d", &temp);
        fflush(stdin);

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

        printf("Quantos itens deseja comprar? (negativos retiram itens)\n");
        int num;
        scanf("%d", &num);

        if (temp > numeroItems) {
            printf("Numero invalido\n");
            continue;
        }

        if ((estoque[temp - 1].numero_items < -num)) {

            num = -1 * estoque[temp - 1].numero_items;
        }

        subTotal += estoque[temp - 1].preco * num;
        estoque[temp - 1].numero_items += num;
    }

    printf("\nTotal da compra: R$%.2f", subTotal);

}
