let totalSlides = document.querySelectorAll('.slider--item').length;
let currentSlide = 0;

let sliderWidth = document.querySelector('.slider'). clientWidth; //Está selecionando o elemento pela classe e retornando a largura visivel em pixels. 

document.querySelector('.slider--width').style.width = `${sliderWidth * totalSlides}px`;//Aqui é ajustado o tamanho da telinha.
document.querySelector('.slider--controls').style.width = `${sliderWidth}px`;//Aqui é onde ajusta a posição dos botões na tela tendo a largura como referência.
document.querySelector('.slider--controls').style.height = 
   `${document.querySelector('.slider').clientHeight}px`;//Aqui é onde ajusta a altura dos botões na tela. 

   //Volta para a imagem anterior.
    function goPrev() {
        currentSlide--;
        if(currentSlide < 0) {
            currentSlide = totalSlides -1;
        }
        updateMargin();
    }

    //Vai para a próxima foto.
    function goNext() {
        currentSlide++;
        if(currentSlide > (totalSlides - 1)) {
            currentSlide = 0;
        }
        updateMargin();
    }

    function updateMargin() {
        //A propriedade clientWidth retorna a largura visível de um elemento em pixels.
        let sliderItemWidth = document.querySelector('.slider--item').clientWidth; 
        let newMargin = (currentSlide * sliderItemWidth); 
        document.querySelector('.slider--width').style.marginLeft = 
            `-${newMargin}px`; //Ajusta a "margin" da imagem quando muda para outra imagem.
    }

     