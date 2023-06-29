const snapshot = document.getElementById("snapshot");
const prd1 = document.getElementById("1");
const prd2 = document.getElementById("2");
const em1 = document.getElementById("e1");
const em2 = document.getElementById("e2");

Webcam.set({ height: 300, width: 350, image_format: "png", png_quality: 300 });
Webcam.attach("#camera");

const emojis = {
    best: "👍",
    amazing: "👌",
    victory: "✌️",
};

const imgIdentifier = ml5.imageClassifier(
    "https://storage.googleapis.com/tm-model/PwaBPte0w/model.json",
    () => console.log("[ML5] initialized\n[ML5] version: " + ml5.version)
);

const toTitleCase = (str) =>
    str.replace(
        /\w\S*/g, // dont touch
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

const makeImage = (src) => {
    const _ = new Image();
    _.id = "captured_img";
    _.src = src;
    return _.outerHTML;
};

const takeSnapshot = (e) =>
    Webcam.snap((uri) => (snapshot.innerHTML = makeImage(uri)));

const speak = (p1, p2) =>
    speechSynthesis.speak(
        new SpeechSynthesisUtterance(
            `The first prediction is ${p1}, and the second prediction is ${p2}.`
        )
    );

const check = (e) =>
    imgIdentifier.classify(
        document.getElementById("captured_img"),
        (err, res) => {
            if (err) console.error(err);
            if (err) return;

            const lbl1 = res[0].label,
                lbl2 = res[1].label;

            console.log(res);
            prd1.innerText = toTitleCase(lbl1);
            prd2.innerText = toTitleCase(lbl2);
            speak(lbl1, lbl2);
            em1.innerText = emojis[lbl1];
            em2.innerText = emojis[lbl2];
        }
    );
