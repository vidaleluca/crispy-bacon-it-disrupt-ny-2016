# crispy-bacon-it-disrupt-ny-2016
## Inspiration
[Crispy Bacon Team](http://crispybacon.it) strongly believes that **friendly AI** can take our everyday's life to the next level.
## What it does
Durring a conversation it's able to **understand your mood** and it helps you to feel better, **suggesting** you different **solutions** to overcome the situation.
## How we built it
We created a **custom Alexa skill** hosted on **AWS Lambda function + Speech to Text**, and using a **NodeJS** middleware integrated with **Watson API (Tone Analyzer)**, the result is than used to let Alexa make decision on how to proceed in the conversation, at the end when Alexa is sure about your mood gives you her best hint. For instance, it can play music or suggest you an activity.
## Challenges we ran into
Speech to Text is not a documented Alexa feature, so a workaround has been found.
## Accomplishments that we're proud of
The solution does what we planned to do.
## What we learned
We learned how to install, code and configure Alexa (it was the first time)
We improoved Alexa capabilyties enabling fluid conversational skills 
## What's next for Moodify
Add more conversational options to Alexa and improve mood analysis using different Watson APIs
