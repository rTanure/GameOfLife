# <a href="https://rtanure.github.io/GameOfLife/">Game Of Life</a>

![Screenshot](https://imgur.com/iqX0Jvr.jpg)

## Descrição

Programa feito em JavaScript e renderizado em um elemento Canvas.

Recriação do script Game Of Life desenvolvido por John Horton Conway em 1970.

## Como usar

Segure o botão esquerdo do mouse e o mova sobre o canvas para ativar os pixels sob o cursor.

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

### 1.1.1 - (14/04/2021)

- Agora os pixels são inicialmente setatos para um Array que guarda suas informação por meio de um object constructor.
- Nenhuma mudança para o usuário final. Apenas a forma como o código funciona foi alterada.

### 1.2 - (14/04/2021)

- A aplicação agora funciona em dispositivos com tela sensível ao toque.
  - Alguns navegadores mobile como o safari podem apresentar problemas por conta das suas interações nativas de acordo com gestos especificos no touch.
- Solução de bugs envolvendo o travamento da simulação enquanto o mouse seleciona novos pixels para serem ativados.
- Para ativar pixels é necessário manter o botão esquerdo do mouse eenquanto o move pelo canvas.
