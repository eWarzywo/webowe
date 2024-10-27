function generateGallery(images) {
    var container = document.getElementById('container');
    counter = 1;

    images.forEach(function (image) {
        var divContain = document.createElement('div');
        divContain.classList.add('mySlides');
        divContain.classList.add('fade');
        var div = document.createElement('div');
        div.classList.add('numbertext');
        div.innerHTML = counter + ' / ' + images.length;
        var img = document.createElement('img');
        img.src = image;
        img.style.width = '500px';
        var caption = document.createElement('div');
        caption.classList.add('text');
        caption.innerHTML = 'Lore Ematiego ' + counter;
        divContain.appendChild(div);
        divContain.appendChild(img);
        divContain.appendChild(caption);
        container.appendChild(divContain);
        counter++;
    });

    var prev = document.createElement('a');
    prev.classList.add('prev');
    prev.innerHTML = '&#10094;';
    prev.onclick = function () {
        plusSlides(-1);
    };
    var next = document.createElement('a');
    next.classList.add('next');
    next.innerHTML = '&#10095;';
    next.onclick = function () {
        plusSlides(1);
    };
    container.appendChild(prev);
    container.appendChild(next);

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }
}