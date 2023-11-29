# Capítulo 12 - Positionable Camera

Até agora a câmera esteve fixada no ponto (0,0,0), mas nesse capítulo será apresentado uma maneira de move-la e rotaciona-la por toda a cena.

## FOV

O campo de visão (field of view) é uma propriedade que dita o tamanho do viewport baseado no ângulo formado pela linha que passa câmera e uma borda do viewport e a linha que passa entre a câmera e a outra borda do viewport, em nosso caso ambas as bordas pertencem ao eixo vertical (vfov). A bordar poderiam pertencer ao eixo horizontal também, mas nunca à eixos diferentes.

Esse ângulo é divido ao meio pelo vetor *focal lenght* já que ele é perpendicular ao viewport, formando um triângulo retângulo de altura $h$ equivalente à metade da altura do viewport.

Diferente do que se mostra do livro, $h=\tan(\frac {\theta} {2}) * focalLength$ (como se mostra na implementação), sendo $h=\tan(\frac {\theta} {2})$ apenas quando o *focal lenght* é igual a 1. Como essa medida é metade da altura do viewport é preciso multiplica-lá por 2 para obter a altura total.

## VUP

Diferente dos vetores *lookFrom* e *lookAt* que possuem nomes autoexplicativos, o vetor vup não possui um nome que reflita sua resposabilidade que é o controle de rotação do viewport. Essa rotação é dada pela relação entre esse vetor e o vetor focal (substração dos vetores *lookFrom* e *lookAt*) através do produto vetorial, gerando o componente horizontal do viewport.

O tamanho desses vetores não é importante, já que o vetor resultante será transformado em um vetor unitário, assim como o ângulo formado por eles, que só importará para decidir a direção do componente horizontal ou a incapacidade de formar um se os vetores forem paralelos.



