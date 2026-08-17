// =====================================================
// A LITTLE SOMETHING FOR MAX
// =====================================================


// =====================================================
// GET HTML ELEMENTS
// =====================================================

const title = document.getElementById("title");
const dialogue = document.getElementById("dialogue-text");
const choices = document.getElementById("choices");
const nextButton = document.getElementById("next-button");


// =====================================================
// VARIABLES
// =====================================================

let currentStage = 0;

let typing = false;

let typingTimer = null;

let nextStage = null;


// =====================================================
// TYPING EFFECT
// =====================================================

function typeText(text, speed = 25, callback = null) {

    clearInterval(typingTimer);

    dialogue.textContent = "";

    typing = true;

    nextButton.disabled = true;

    let index = 0;


    typingTimer = setInterval(() => {

        dialogue.textContent += text[index];

        index++;


        // Finished typing

        if (index >= text.length) {

            clearInterval(typingTimer);

            typing = false;

            nextButton.disabled = false;


            if (callback) {
                callback();
            }

        }

    }, speed);
}


// =====================================================
// SHOW NORMAL STAGE
// =====================================================

function showStage(stage) {

    // Reset everything

    choices.innerHTML = "";

    nextButton.style.display = "none";

    nextStage = null;


    // Set title

    title.textContent = stage.title || "";


    // =================================================
    // LETTER
    // =================================================

    if (stage.type === "letter") {

        showLetter();

        return;
    }


    // =================================================
    // FINAL SCREEN
    // =================================================

    if (stage.type === "final") {

        showFinalScreen();

        return;
    }


    // =================================================
    // NORMAL DIALOGUE
    // =================================================

    typeText(stage.text);


    // =================================================
    // CHOICES
    // =================================================

    if (stage.choices) {

        stage.choices.forEach(choice => {

            const button = document.createElement("button");

            button.className = "choice-button";

            button.textContent = choice.text;


            button.addEventListener("click", () => {

                handleChoice(choice);

            });


            choices.appendChild(button);

        });

    }


    // =================================================
    // NORMAL NEXT BUTTON
    // =================================================

    else {

        nextButton.style.display = "inline-block";

        nextButton.textContent = stage.button || "Next";

        nextStage = currentStage + 1;

    }

}


// =====================================================
// HANDLE CHOICES
// =====================================================

function handleChoice(choice) {

    // Remove the choice buttons

    choices.innerHTML = "";

    // Show Next button

    nextButton.style.display = "inline-block";

    nextButton.textContent = "Next";

    nextStage = currentStage + 1;


    // =================================================
    // MOOD QUESTION
    // =================================================

    if (choice.type === "mood") {


        // PRETTY GOOD

        if (choice.text === "Pretty good") {

            typeText(
                `Glad to hear that.

Keep it that way.

You've got something to get.`
            );

        }


        // TIRED

        else if (choice.text === "Tired") {

            typeText(
                `It's okay, you must've had a pretty long day.
                
Make sure you get some rest, okay?`
            );

        }


        // HUNGRY

        else if (choice.text === "Hungry") {

            typeText(
                `You should probably eat something.

I heard you can cook, btw.

So... go make yourself something because you da chefsito.`
            );

        }


        // DON'T KNOW

        else if (choice.text === "I don't even know anymore") {

            typeText(
                `Yeah...

I get that.

Life is kinda weird sometimes.

Let's just keep going.`
            );

        }

    }


    // =================================================
    // DOGS
    // =================================================

    else if (choice.type === "dogs") {

        showPhotoResponse(

            "Oh, dogs?",

            `Well...

Here they are.

They look cute...

But since you said they're evil, so let's just move on to the next question.`,

            "assets/dog.jpg"

        );

    }


    // =================================================
    // CATS
    // =================================================

    else if (choice.type === "cats") {

        showPhotoResponse(

            "Cats?",

            `Awww, nice choice.

I know you miss your cat.

But you'll have another one someday yaaa.`,

            "assets/cat.jpg"

        );

    }


    // =================================================
    // OVERTHINKING
    // =================================================

    else if (choice.type === "overthinking") {

        showPhotoResponse(

            "Yeah... makes sense.",

            `I kinda knew you'd pick this one.

The person who made this website can read your mind, so...`,

            "assets/overthinking.jpg"

        );

    }


    // =================================================
    // MUSIC
    // =================================================

    else if (choice.type === "music") {

        showPhotoResponse(

            "Hmm interesting.",

            `I bet i can guess what kind of songs you listen to.`,

            "assets/music.jpg"

        );

    }


    // =================================================
    // PLAY WITH DOGS
    // =================================================

    else if (choice.type === "play-dogs") {

        showPhotoResponse(

            "Buddy & Gordo.",

            `Buddy and Gordo are fun, yeah.

But you know what's even more fun?

Playing with the person who made this website.`,

            "assets/dogs-playing.jpg"

        );

    }

}


// =====================================================
// PHOTO RESPONSE
// =====================================================

function showPhotoResponse(titleText, text, imagePath) {

    // Change title

    title.textContent = titleText;


    // Clear old text

    dialogue.textContent = "";


    // Clear old content

    choices.innerHTML = "";


    // Show button

    nextButton.style.display = "inline-block";

    nextButton.textContent = "Next";


    // The next stage is the normal next stage

    nextStage = currentStage + 1;


    // Typing

    typeText(text, 25, () => {


        // Create image

        const image = document.createElement("img");


        image.src = imagePath;


        image.className = "memory-image";


        image.alt = "A little photo";


        // Add image

        choices.appendChild(image);


    });

}


// =====================================================
// LETTER
// =====================================================

function showLetter() {

    // Change title

    title.textContent = "A little something for you.";


    // Clear dialogue

    dialogue.textContent = "";


    // Clear choices

    choices.innerHTML = "";


    // Hide button first

    nextButton.style.display = "none";


    // Create letter

    const letter = document.createElement("div");

    letter.className = "letter";


    // Letter content

    letter.innerHTML = `

        <h2>Hi, Max.</h2>


        <p>
            If you're reading this, then I guess you made it all the way here.

            It might be a little random, but I just wanted to make a little

            something for you.
        </p>


        <p>
            Maybe it's a little unnecessary,

            but I just wanted to say thank you.
        </p>


        <p>
            Thank you for everything.

            You've made a lot of my days better,

            and somehow, meeting someone like you has helped me grow too.
        </p>


        <p>
           Because of you, I got to make something like this. It might not

           be too much, but I genuinely learned so many things from you.
           
           And i'm really grateful for that.
        </p>


        <p>
            You're genuinely one of the sweetest people I've met,

            and I'm really proud of you for making it this far

            and for still being you.
        </p>


        <p>
            Thank you for the little things.

            For being someone I could talk to.

            And for all the moments that probably meant more to me

            than you realized.
        </p>


        <p>
            Muchas gracias, Max.
        </p>


        <p>
            That's all I wanted you to know. Semangat kuliahnya ya, Max.

            I'm wishing you the best in everything you do <3
        </p>


        <div class="signature">
            — Ginza
        </div>

    `;


    // Add letter to page

    choices.appendChild(letter);


    // Wait for letter animation

    setTimeout(() => {

        nextButton.style.display = "inline-block";

        nextButton.textContent = "Continue";

        nextStage = currentStage + 1;

    }, 900);

}


// =====================================================
// FINAL SCREEN
// =====================================================

function showFinalScreen() {

    // Title

    title.textContent = "That's all :)";


    // Clear dialogue

    dialogue.textContent = "";


    // Clear choices

    choices.innerHTML = "";


    // Hide button

    nextButton.style.display = "none";


    // Create final message

    const finalMessage = document.createElement("div");

    finalMessage.className = "final-message";


    finalMessage.innerHTML = `

        <p>
            I hope this made you smile,

            even just a little.
        </p>


        <p>
            Thanks for being here,

            <strong>Mr. Guapo.</strong>
        </p>


        <p>
            And thank you for all the little things.
        </p>


        <div class="final-signature">
            — Ginza
        </div>

    `;


    choices.appendChild(finalMessage);

}


// =====================================================
// NEXT BUTTON
// =====================================================

nextButton.addEventListener("click", () => {


    // Don't allow clicking while typing

    if (typing) {
        return;
    }


    // If there is a next stage

    if (nextStage !== null) {

        currentStage = nextStage;

        showStage(stages[currentStage]);

    }

});


// =====================================================
// ALL STAGES
// =====================================================

const stages = [


    // =================================================
    // STAGE 01 — INTRODUCTION
    // =================================================

    {

        title: "Hi, Max.",

        text:
        `Welcome.

I'm here to deliver something to you on behalf of someone.

What is it?

I don't even know either.

And don't take this too seriously, just have fun with it ok?

But apparently, I wasn't allowed to just hand it to you and leave.

Instead, there are a few things you need to see first.

So...

Let's do this.`,

        button: "Okay, let's go"

    },


    // =================================================
    // STAGE 02 — BEFORE WE CONTINUE
    // =================================================

    {

        title: "Okayyy, let's see...",

        text:
        `Before we continue, let's get a few things out of the way.

Don't worry.

There isn't gonna be a test.

Probably.

First question:

What's your current mood?`,

        choices: [

            {

                text: "Pretty good",

                type: "mood"

            },

            {

                text: "Tired",

                type: "mood"

            },

            {

                text: "Hungry",

                type: "mood"

            },

            {

                text: "I don't even know anymore",

                type: "mood"

            }

        ]

    },


    // =================================================
    // STAGE 03 — DOGS OR CATS
    // =================================================

    {

        title: "What's your favorite animal?.",

        text:
        `I know you like both, but you gotta pick one ;D `,

        choices: [

            {

                text: "Dogs 🐶",

                type: "dogs"

            },

            {

                text: "Cats 🐱",

                type: "cats"

            }

        ]

    },


    // =================================================
    // STAGE 04 — WHAT WOULD YOU DO?
    // =================================================

    {

        title: "Okay, last one.",

        text:
        `What would you do if you were all alone?

Pick one.`,

        choices: [

            {

                text: "Overthinking 💭",

                type: "overthinking"

            },

            {

                text: "Listen to music 🎧",

                type: "music"

            },

            {

                text: "Play with my dawgs 🐶",

                type: "play-dogs"

            }

        ]

    },


    // =================================================
    // STAGE 05 — ENOUGH QUESTIONS
    // =================================================

    {

        title: "Okay, enough questions.",

        text:
        `Finally.

You've officially survived.

And no, there wasn't actually a right answer to any of them.

I just wanted to bother you a little before giving you the actual thing.

So...

Are you ready to receive something?`,

        button: "I don't know, but let's go"

    },


    // =================================================
    // STAGE 06 — THE LETTER
    // =================================================

    {

        title: "The letter.",

        text:
        `You've made it this far.

The letter has been waiting for you this whole time.

So...

I guess it's finally yours.`,

        button: "Open the letter"

    },


    // =================================================
    // STAGE 07 — THE ACTUAL LETTER
    // =================================================

    {

        type: "letter"

    },


    // =================================================
    // STAGE 08 — ENDING
    // =================================================

    {

        title: "You made it.",

        text:
        `Yayyy, you finally got your letter.

You've officially reached the end.

You're free now.`,

        button: "Finish"

    },


    // =================================================
    // FINAL SCREEN
    // =================================================

    {

        type: "final"

    }

];


// =====================================================
// START WEBSITE
// =====================================================

showStage(stages[currentStage]);