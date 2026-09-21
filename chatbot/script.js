// =====================================================
// VIT-AP PARENT INFORMATION ASSISTANT
// Frontend only - NO hard-coded student information
// =====================================================


let speechRate = 0.9;

let currentSpeakingButton = null;


// =====================================================
// SEND MESSAGE
// =====================================================

function sendMessage() {

    const input = document.getElementById("user-input");

    if (!input) {
        return;
    }

    const message = input.value.trim();

    if (message === "") {
        return;
    }


    // Display user's question
    addMessage(message, "user");


    // Clear input
    input.value = "";


    // Get selected language
    const language =
        document.getElementById("language").value;


    // Detect what the parent is asking
    const intent =
        detectIntent(message, language);


    console.log("Question:", message);
    console.log("Language:", language);
    console.log("Detected Intent:", intent);


    /*
       IMPORTANT:

       NO STUDENT DATA IS BEING RETURNED HERE.

       Later, this is where we will call the backend.

       Example future request:

       fetch("/api/chat", {
           method: "POST",
           body: JSON.stringify({
               question: message,
               intent: intent,
               language: language
           })
       });

       Backend will then communicate with
       the database and return the real information.
    */


    const response =
        getWaitingResponse(language);


    setTimeout(function () {

        addMessage(response, "bot");

    }, 500);

}



// =====================================================
// TEMPORARY RESPONSE
// =====================================================

function getWaitingResponse(language) {

    if (language === "te") {

        return "మీ ప్రశ్న అర్థమైంది. విద్యార్థి సమాచారాన్ని పొందడానికి బ్యాక్‌ఎండ్ మరియు డేటాబేస్ కనెక్షన్ అవసరం.";

    }


    if (language === "hi") {

        return "आपका प्रश्न समझ गया। छात्र की जानकारी प्राप्त करने के लिए बैकएंड और डेटाबेस कनेक्शन आवश्यक है.";

    }


    return "I understood your question. The backend and database connection will provide the actual student information.";
}



// =====================================================
// ADD MESSAGE
// =====================================================

function addMessage(message, type) {

    const chatMessages =
        document.getElementById("chat-messages");


    if (!chatMessages) {
        return;
    }


    const messageDiv =
        document.createElement("div");


    messageDiv.classList.add("message");


    if (type === "user") {

        messageDiv.classList.add("user-message");


        messageDiv.innerHTML = `

            <div class="message-bubble">

                ${escapeHTML(message)}

            </div>

        `;

    }


    else {

        messageDiv.classList.add("bot-message");


        const messageId =
            "bot-message-" + Date.now();


        messageDiv.innerHTML = `

            <div class="message-bubble">

                <span id="${messageId}">
                    ${escapeHTML(message)}
                </span>

                <button
                    class="speaker-button"
                    onclick="speakElement('${messageId}', this)"
                    title="Read this message">

                    🔊

                </button>

            </div>

        `;

    }


    chatMessages.appendChild(messageDiv);


    // Scroll to newest message

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}



// =====================================================
// NORMALIZE TEXT
// =====================================================

function normalizeText(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/[?!.,]/g, "")
        .replace(/\s+/g, " ");

}



// =====================================================
// DETECT INTENT
// =====================================================

function detectIntent(message, language) {

    const normalizedMessage =
        normalizeText(message);


    let bestIntent = "unknown";

    let bestScore = 0;


    for (const intent in trainingData) {

        if (!trainingData[intent][language]) {
            continue;
        }


        const examples =
            trainingData[intent][language];


        for (const example of examples) {

            const normalizedExample =
                normalizeText(example);


            const score =
                calculateSimilarity(
                    normalizedMessage,
                    normalizedExample
                );


            if (score > bestScore) {

                bestScore = score;

                bestIntent = intent;

            }

        }

    }


    if (bestScore < 0.35) {

        return "unknown";

    }


    return bestIntent;

}



// =====================================================
// SIMILARITY
// =====================================================

function calculateSimilarity(message, example) {

    const messageWords =
        message.split(" ");


    const exampleWords =
        example.split(" ");


    let matches = 0;


    messageWords.forEach(function (word) {

        if (exampleWords.includes(word)) {

            matches++;

        }

    });


    if (messageWords.length === 0) {

        return 0;

    }


    return matches /
        messageWords.length;

}



// =====================================================
// QUICK QUESTIONS
// =====================================================

function askAttendance() {

    const language =
        document.getElementById("language").value;


    if (language === "te") {

        setQuestion(
            "నా పిల్లల హాజరు ఎంత"
        );

    }

    else if (language === "hi") {

        setQuestion(
            "मेरे बच्चे की उपस्थिति कितनी है"
        );

    }

    else {

        setQuestion(
            "What is my child's attendance?"
        );

    }

}



function askMarks() {

    const language =
        document.getElementById("language").value;


    if (language === "te") {

        setQuestion(
            "నా పిల్లల మార్కులు ఎంత"
        );

    }

    else if (language === "hi") {

        setQuestion(
            "मेरे बच्चे के अंक कितने हैं"
        );

    }

    else {

        setQuestion(
            "What are my child's marks?"
        );

    }

}



function askAssignments() {

    const language =
        document.getElementById("language").value;


    if (language === "te") {

        setQuestion(
            "పెండింగ్‌లో ఉన్న అసైన్మెంట్లు ఉన్నాయా"
        );

    }

    else if (language === "hi") {

        setQuestion(
            "क्या कोई असाइनमेंट बाकी है"
        );

    }

    else {

        setQuestion(
            "Are there any pending assignments?"
        );

    }

}



function askExams() {

    const language =
        document.getElementById("language").value;


    if (language === "te") {

        setQuestion(
            "తదుపరి పరీక్ష ఎప్పుడు"
        );

    }

    else if (language === "hi") {

        setQuestion(
            "अगली परीक्षा कब है"
        );

    }

    else {

        setQuestion(
            "When is the next exam?"
        );

    }

}



// =====================================================
// SET QUICK QUESTION
// =====================================================

function setQuestion(question) {

    const input =
        document.getElementById("user-input");


    if (!input) {
        return;
    }


    input.value = question;


    // Automatically submit quick question

    sendMessage();

}



// =====================================================
// ENTER KEY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const input =
            document.getElementById("user-input");


        if (input) {

            input.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        event.preventDefault();

                        sendMessage();

                    }

                }
            );

        }


        updateLanguage();

    }
);



// =====================================================
// LANGUAGE
// =====================================================

function updateLanguage() {

    const language =
        document.getElementById("language");


    if (!language) {
        return;
    }


    const selectedLanguage =
        language.value;


    const input =
        document.getElementById("user-input");


    const welcomeMessage =
        document.getElementById("welcome-message");


    const welcomeDescription =
        document.getElementById("welcome-description");


    const voiceLanguageDisplay =
        document.getElementById(
            "voice-language-display"
        );



    // ---------------- ENGLISH ----------------

    if (selectedLanguage === "en") {

        if (input) {

            input.placeholder =
                "Ask about your child...";

        }


        if (welcomeMessage) {

            welcomeMessage.textContent =
                "Hello! I am your Parent Information Assistant. How can I help you today?";

        }


        if (welcomeDescription) {

            welcomeDescription.textContent =
                "Ask questions about your child's academic information.";

        }


        if (voiceLanguageDisplay) {

            voiceLanguageDisplay.textContent =
                "English";

        }

    }



    // ---------------- TELUGU ----------------

    else if (selectedLanguage === "te") {

        if (input) {

            input.placeholder =
                "మీ పిల్లల గురించి అడగండి...";

        }


        if (welcomeMessage) {

            welcomeMessage.textContent =
                "నమస్కారం! నేను మీ Parent Information Assistant. ఈరోజు మీకు ఎలా సహాయం చేయగలను?";

        }


        if (welcomeDescription) {

            welcomeDescription.textContent =
                "మీ పిల్లల విద్యా సమాచారానికి సంబంధించిన ప్రశ్నలను అడగండి.";

        }


        if (voiceLanguageDisplay) {

            voiceLanguageDisplay.textContent =
                "తెలుగు";

        }

    }



    // ---------------- HINDI ----------------

    else if (selectedLanguage === "hi") {

        if (input) {

            input.placeholder =
                "अपने बच्चे के बारे में पूछें...";

        }


        if (welcomeMessage) {

            welcomeMessage.textContent =
                "नमस्ते! मैं आपका Parent Information Assistant हूँ। मैं आपकी कैसे मदद कर सकता हूँ?";

        }


        if (welcomeDescription) {

            welcomeDescription.textContent =
                "अपने बच्चे की शैक्षणिक जानकारी के बारे में प्रश्न पूछें।";

        }


        if (voiceLanguageDisplay) {

            voiceLanguageDisplay.textContent =
                "हिन्दी";

        }

    }

}



// =====================================================
// VOICE INPUT
// =====================================================

function startVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice input is not supported in this browser. Please use Google Chrome."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    const language =
        document.getElementById("language").value;


    if (language === "en") {

        recognition.lang = "en-IN";

    }

    else if (language === "te") {

        recognition.lang = "te-IN";

    }

    else if (language === "hi") {

        recognition.lang = "hi-IN";

    }


    recognition.interimResults = false;

    recognition.continuous = false;


    const micButton =
        document.getElementById("mic-button");


    const voiceStatus =
        document.getElementById("voice-status");


    try {

        recognition.start();

    }

    catch (error) {

        return;

    }


    if (micButton) {

        micButton.classList.add("listening");

    }


    if (voiceStatus) {

        voiceStatus.textContent =
            "🎤 Listening... Please speak your question.";

    }


    recognition.onresult =
        function (event) {

            const speech =
                event.results[0][0].transcript;


            const input =
                document.getElementById("user-input");


            if (input) {

                input.value = speech;

            }


            if (voiceStatus) {

                voiceStatus.textContent =
                    "Voice captured successfully.";

            }


            setTimeout(
                function () {

                    sendMessage();

                },
                300
            );

        };


    recognition.onend =
        function () {

            if (micButton) {

                micButton.classList.remove(
                    "listening"
                );

            }


            setTimeout(
                function () {

                    if (voiceStatus) {

                        voiceStatus.textContent = "";

                    }

                },
                2000
            );

        };


    recognition.onerror =
        function (event) {

            if (micButton) {

                micButton.classList.remove(
                    "listening"
                );

            }


            if (!voiceStatus) {
                return;
            }


            if (event.error === "not-allowed") {

                voiceStatus.textContent =
                    "Microphone permission was denied.";

            }

            else if (event.error === "no-speech") {

                voiceStatus.textContent =
                    "No speech detected. Please try again.";

            }

            else {

                voiceStatus.textContent =
                    "Unable to recognize your voice. Please try again.";

            }

        };

}



// =====================================================
// VOICE OUTPUT
// =====================================================

function speakText(text, button = null) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Voice output is not supported in this browser."
        );

        return;
    }


    window.speechSynthesis.cancel();


    if (currentSpeakingButton) {

        currentSpeakingButton.classList.remove(
            "speaking"
        );

        currentSpeakingButton.textContent =
            "🔊";

    }


    const speech =
        new SpeechSynthesisUtterance(text);


    const language =
        document.getElementById("language").value;


    if (language === "en") {

        speech.lang = "en-IN";

    }

    else if (language === "te") {

        speech.lang = "te-IN";

    }

    else if (language === "hi") {

        speech.lang = "hi-IN";

    }


    speech.rate = speechRate;

    speech.pitch = 1;

    speech.volume = 1;


    if (button) {

        button.classList.add("speaking");

        button.textContent = "🔊";

        currentSpeakingButton = button;

    }


    speech.onend =
        function () {

            if (button) {

                button.classList.remove(
                    "speaking"
                );

                button.textContent =
                    "🔊";

            }


            currentSpeakingButton = null;

        };


    speech.onerror =
        function () {

            if (button) {

                button.classList.remove(
                    "speaking"
                );

                button.textContent =
                    "🔊";

            }


            currentSpeakingButton = null;

        };


    window.speechSynthesis.speak(speech);

}



// =====================================================
// SPEAK MESSAGE
// =====================================================

function speakElement(elementId, button) {

    const element =
        document.getElementById(elementId);


    if (!element) {
        return;
    }


    speakText(
        element.textContent,
        button
    );

}



// =====================================================
// STOP SPEAKING
// =====================================================

function stopSpeaking() {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

    }


    if (currentSpeakingButton) {

        currentSpeakingButton.classList.remove(
            "speaking"
        );

        currentSpeakingButton.textContent =
            "🔊";

    }


    currentSpeakingButton = null;

}



// =====================================================
// AUDIO SETTINGS
// =====================================================

function toggleAudioSettings() {

    const panel =
        document.getElementById(
            "audio-settings-panel"
        );


    const button =
        document.getElementById(
            "audio-settings-toggle"
        );


    if (!panel || !button) {
        return;
    }


    panel.classList.toggle("hidden");


    if (panel.classList.contains("hidden")) {

        button.textContent =
            "Show";

    }

    else {

        button.textContent =
            "Hide";

    }

}



// =====================================================
// SPEECH RATE
// =====================================================

function updateSpeechRate() {

    const rate =
        document.getElementById(
            "speech-rate"
        );


    if (!rate) {
        return;
    }


    speechRate =
        parseFloat(rate.value);

}