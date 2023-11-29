# Capítulo 1 - Overview

Nesse capítulo o autor se concentra em descrever os objetivos do livro e as tecnologias utilizadas, portanto, utilizarei ele para introduzir a linguagem e bibliotecas que serão usadas nesse repositorio.

## Linguagem

O livro implementa todos os exemplos em **C++**, mas esse repositório utilizará **Typescript** pelos seguintes motivos:

- É um superset de uma linguagem amplamente utilizada, **Javascript**, o que facilita a compreensão para a maior parte das pessoas;

- Possui um gerenciador de pacotes de fácil uso, permitindo que bibliotecas possam ser integradas sem grandes configurações adicionais para usuários de qualquer sistema operacional, sendo necessário apenas a instalação do **Nodejs**;

- Por ser uma linguagem interpretada, evita o uso de builders como **CMake** e **Makefile** já que a compilação não é necessária, apenas uma transpilação de Typescript para Javascript. Além disso, ferramentas de build geralmente possuem uma curva de aprendizado maior, o que pode gerar um desfoque do assunto principal (*Ray Tracing*);

- Evita o complexidades intrínsecas da linguagem C++, como: *operator overloading*, *shared_ptr*, entre outros;

- É a linguagem que eu estava interessado no momento que fiz esse repositório.

Assim como as vantagens, existem caracteristicas desejadas por implementações em C++ que não serão suportadas:

- Como o código precisará ser transpilado para Javascript e interpretado pelo motor do *Nodejs* a execução será mais lenta do que um código compilado diretamente para a máquina alvo como no C++;

- Embora gere complexidade, os recursos do C++ são muitas vezes desejados porque agilizam o desenvolvimento. Um exemplo disso é o *operator overloading*, que facilita a operação entre vetores;

- Typescript não é uma escolha de mercado e nem usual para a implementação de programas dedicados à computação gráfica.

Apesar disso, como o objetivo principal é o aprendizado sobre o método *Ray Tracing* e não o desempenho, acredito que seja uma escolha válida e que facilite o entendimento.


## Bibliotecas

Por não ser compilado, não é possível redirecionar a saída do programa para um arquivo como ocorrerá nos próximos capítulos do livro,

Por uma escolha pessoal, decidi não redirecionar a saída do programa para um arquivo como ocorrerá nos próximos capítulos do livro, por isso a biblioteca externa (*third-party library*) **Jimp** será usada para criação de images a partir de nossos buffers em memória.

A implementação dessa biblioteca faz uso da interface **IImageLibrary**, sendo assim, caso queria utilizar outra biblioteca de processamento de imagem, crie uma nova classe que implemente essa interface e passe uma instância dela para a função do capítulo dejesado.

## Recomendações

Para ter um bom aproveitamento na leitura do livro é necessário um conhecimento básico sobre vetores e álgebra linear. Bons conteúdos sobre esse assunto podem ser acessados nos links a baixo:

- [3blue1brow - Essence of Linear Algebra](https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab).