#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int numero_items;
    float preco;
    char nome[50];
} Item;

void limparCompraAnterior(Item estoque[], int nEstoque) {
    for (int i = 0; i < nEstoque; i++) {
        estoque[i].numero_items = 0;
    }
}

void verItens(Item estoque[], int nEstoque) {
    printf("Produtos no estoque: ");
    for (int i = 0; i < nEstoque; i++) {
        printf("\n[%d] %s (%.2f)", i, estoque[i].nome, estoque[i].preco);
    }
}

void adicionarItens(Item estoque[], int * nEstoque) {
    char nome[50];
    float preco;
    verItens(estoque, *nEstoque);
    printf("\nInsira o nome do produto (sem espacos): \n>> ");
    scanf("%s", nome);
    printf("\n%s\nInsira o preco do produto: \n>> ", nome);
    scanf("%f", &preco);
    printf("\n%.2f\n", preco);

    printf("\n%s %.2f\n", nome, preco);

    strcpy(estoque[*nEstoque].nome, nome);
    estoque[*nEstoque].preco = preco;
    *nEstoque += 1;
}

void editarItem(Item estoque[], int nEstoque) {
    verItens(estoque, nEstoque);
    printf("\nInsira o numero do item para editar\n>> ");
    int temp, index;
    scanf("%d", &temp);
    if (temp < 0 || temp >= nEstoque) {
        return;
    }
    index = temp;
    printf("\nVoce quer editar o nome ou o preco?\n[1] Nome\n[2] Preco\n>> ");
    scanf("%d", &temp);
    if (temp != 1 && temp != 2) {
        return;
    }
    if (temp == 1) {
        printf("\nInsira o novo nome para o item '%s'\n>> ", estoque[index].nome);
        char bla[50];
        scanf("%s", bla);
        strcpy(estoque[index].nome, bla);
    }
    if (temp == 2) {
        printf("\nInsira o novo preco para o item '%s'\n>> ", estoque[index].nome);
        float precoNovo;
        scanf("%f", &precoNovo);
        estoque[index].preco = precoNovo;
    }
    printf("\nItem alterado com sucesso");
    scanf("%d", &temp);
}

void removerItem(Item estoque[], int * nEstoque) {
    int temp;
    verItens(estoque, *nEstoque);
    printf("\nInsira o numero do item que sera removido: \n>> ");
    scanf("%d", &temp);
    if (temp < 0 || temp >= *nEstoque || *nEstoque == 0) {
        return;
    }
    Item vazio;
    int i = temp;
    for (i; i < *nEstoque; i++) {
        if (i == 999) {
            estoque[i] = vazio;
            *nEstoque -= 1;
            return;
        }
        estoque[i] = estoque[i + 1];
    }
    *nEstoque -= 1;
    estoque[i] = vazio;
}

void gerente(Item * estoque, int * nEstoque) {
    while (1) {
        system("cls");
        printf("\nBem vindo(a), gerente\n");
        printf("Escolha uma opcao: \n[1] Adicionar um item ao estoque\n[2] Retirar um item do estoque\n[3] Ver estoque\n[4] Editar item do estoque\n[5] Voltar\n>> ");
        int input, temp;
        while (1) {
            scanf("%d", &input);
            if (input == 1 || input == 2 || input == 3 || input == 4 || input == 5) {
                break;
            }
            else {
                printf("\nEntrada invalida\n>> ");
            }
        }
        if (input == 1) {
            adicionarItens(estoque, nEstoque);
        }
        if (input == 2) {
            removerItem(estoque, nEstoque);
        }
        if (input == 3) {
            verItens(estoque, *nEstoque);
            scanf("%d", &temp);
        }
        if (input == 4) {
            editarItem(estoque, *nEstoque);
        }
        if (input == 5) {
            break;
        }
    }
}

void cliente(Item estoque[], int nEstoque) {
    limparCompraAnterior(estoque, nEstoque);

    float subtotal = 0, valorRecebido, troco;
    int temp;

    if (nEstoque == 0) {
        printf("Ainda nao foram adicionados itens para serem comprados (insira qualquer valor para voltar)\n");
        scanf("%d", &temp);
        return;
    }

    while (1) {
        system("cls");

        printf("-------------------------\nSupermercado C\n-------------------------\n\n");
        printf("Qual item voce deseja comprar?\n");
        for (int k = 0; k < nEstoque; k++) {
            printf("[%d] %s (preco: %.2f) | No carrinho: %d\n", k + 1, estoque[k].nome, estoque[k].preco, estoque[k].numero_items);
        }
        printf("Sub total: %.2f\n", subtotal);
        printf("Insira [0] se quiser finalizar suas compras\n>> ");

        scanf("%d", &temp);
        fflush(stdin);

        if (temp == 0) {
            printf("\nSeu subtotal: %.2f", subtotal);
            printf("\nInsira o valor que ira pagar: R$");
            scanf("%f", &valorRecebido);
            fflush(stdin);
            troco = valorRecebido - subtotal;
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

        if (temp > nEstoque) {
            printf("Numero invalido\n");
            continue;
        }

        if ((estoque[temp - 1].numero_items < -num)) {

            num = -1 * estoque[temp - 1].numero_items;
        }

        subtotal += estoque[temp - 1].preco * num;
        estoque[temp - 1].numero_items += num;
    }

    scanf("%d", &temp);
}

int main()
{
    Item estoque[999];
    int nEstoque = 0;

    // 100% seguro, confia kk
    char usuario[] = "admin";
    char senha[] = "123abc";
    char inputUser[15], inputPass[15];

    while (1){
        system("cls");

        printf("---------------\nBem vindo ao Supermercado C\n---------------\n");
        printf("[1] Ir as compras\n[2] Fazer login\n[3] Sair\n>> ");
        int escolha;
        while (1){
            scanf("%d", &escolha);
            if (escolha == 1 || escolha == 2 || escolha == 3) {
                break;
            }
            printf("\nEscolha invalida\n>> ");
        }
        if (escolha == 3) {
            break;
        }
        if (escolha == 1) {
            cliente(estoque, nEstoque);
        }
        if (escolha == 2) {
            printf("\nNome de usuario: \n>> ");
            scanf("%s", inputUser);
            printf("\nSenha: \n>> ");
            scanf("%s", inputPass);

            if (strcmp(inputUser, usuario) == 0 && strcmp(inputPass, senha) == 0) {
                gerente(estoque, &nEstoque);
            }
            else {
                printf("Usuario ou senha errada (dica: admin, 123abc)");
                scanf("%d", &escolha);
            }
        }
    }

    return 0;
}
