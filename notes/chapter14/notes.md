# Capítulo 14 - Where Next?

Esse é o capítulo com a última rendezição do livro onde todos as características implementadas são usadas na criação de uma imagem com resolução de 1200 x 675.

Por não utilizar multithreads esse processo é bastante lento, chegando a casos onde a espera pode passar de 15 horas, portanto recomendo que diminua as amostras por pixel (**samplePerPixel**) na configuração da câmera. A redução das amostras resultará em uma menor qualidade tanto de antialising quanto de efeitos que dependam desse algoritmo (como o desfoque), mas reduzirá consideravelmente o tempo de execução.