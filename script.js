const promptBar = document.querySelector("#prompt_bar");
const imageresult = document.querySelector("#image_result");

let isImgGen = false;

const updateImgBoxes = (imageUrls) => {
    imageUrls.forEach((url, index) => {
        const imgBox = imageresult.querySelectorAll(".img_box")[index];
        const imgElement = imgBox.querySelector("img");
        const downloadBtn = imgBox.querySelector(".download-btn");

        imgElement.src = url;

        imgElement.onload = () => {
            imgBox.classList.remove("loading");
            downloadBtn.href = url;
            downloadBtn.download = `AI_Image_${Date.now()}.jpg`;
        };
    });
};

const generateAIImages = (imgQuantity) => {

    const mockImages = Array.from({ length: imgQuantity }, (_, i) =>
        `https://picsum.photos/512?random=${Date.now() + i}`
    );

    updateImgBoxes(mockImages);
    isImgGen = false;
};

const handlePrompt = (e) => {
    e.preventDefault();
    if (isImgGen) return;
    isImgGen = true;

    imageresult.style.display = "grid";

    const userPrompt = e.target.elements[0].value;
    const imgQuantity = parseInt(e.target.elements[1].value);
    const imgSize = e.target.elements[2].value;

    const imgBoxes = Array.from({ length: imgQuantity }, () => `
        <div class="img_box loading">
            <img src="images/loader.gif" />
            <a href="#" class="download-btn">
                <i class="fa-solid fa-download"></i>
            </a>
        </div>
    `).join("");

    imageresult.innerHTML = imgBoxes;
    generateAIImages(imgQuantity);
};
promptBar.addEventListener("submit", handlePrompt);
