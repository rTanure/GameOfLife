# Game Of Life

![Screenshot](https://imgur.com/iqX0Jvr.jpg)

## Descrição

Programa feito em JavaScript e renderizado em um elemento Canvas.

Recriação do script Game Of Life desenvolvido por John Horton Conway em 1970.

## Como baixar

1) Faça o download do repositório.
2) Descompacte o arquivo.
3) Rode o arquivo "index.html"

## Como usar

Movimente o mouse sobre o canvas para ativar as celulas que estiverem abaixo do ponteiro.

## Regras do jogo

- Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.
- Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.
- Qualquer célula morta com exatamente três vizinhos vivos se torna uma célula viva.
- Qualquer célula viva com dois ou três vizinhos vivos continua no mesmo estado para a próxima geração.

## Patch notes
### 1.0 - (28/03/2021)
- First commit

### 1.1 - (10/04/2021)

- Agora o tamanho do canvas é relativo ao tamanho do aba do navegador.
- Ao redimencionar a aba, a quantidade e a disposição de pixels será alterada para se ajustar ao tamanho da tela e a simulação será reiniciada.
