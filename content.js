/*
  content.js — EDIT THIS FILE to customize names, messages, photos, and voice notes.

  How to replace assets:
  - Your photo on the first page:
      Replace: assets/photos/me.jpg
  - Roses background:
      Replace: assets/photos/roses-bg.jpg
  - Envelope photos:
      Replace each file: assets/photos/env-<id>.jpg   (example: env-miss-me.jpg)
  - Voice notes:
      Replace each file: assets/audio/voice-<id>.wav  (example: voice-miss-me.wav)
      You can use .mp3/.m4a too — just update the file extension below.
*/

window.CONTENT = {
  // ====== Personalization ======
  girlfriendName: "Subhi aka Quokka",
  yourName: "Kuldeep",

  // Relationship start date (used for counters). Format: YYYY-MM-DD
  relationshipStartDate: "2025-03-12",

  // Optional: next meet / next video date (for countdown card). Format: YYYY-MM-DD
  nextMeetDate: "2026-03-12",

  // WhatsApp number (international format, NO "+" and NO spaces).
  // Example India: 919876543210
  whatsappNumber: "6354641718",

  // Optional passcode gate on the main gift page.
  // Set to "" to disable.
  passcode: "bittu",

  // Valentine envelope unlock date. Format: YYYY-MM-DD
  valentineUnlockDate: "2026-02-13",

  // ====== "Open When" envelopes ======
  envelopes: [
    {
      id: "miss-me",
      title: "Open when you miss me",
      emoji: "💌",
      body: [
        "Hey love.",
        "If you’re reading this, it means we’re apart right now — and I hate that part.",
        "But I want you to remember: distance is a location, not a feeling.",
        "",
        "Visit this page: https://cooldeep-debug.github.io/BubaQuokka/",
        "",
        "Now do this: text me 'PINEAPPLE 🍍' and tell me what you want from me right now (comfort, hype, jokes, or just silence together)."
      ],
      photo: "assets/photos/env-miss-me.jpg",
      audio: "assets/audio/voice-miss-me.wav",
      action: { type: "whatsapp", label: "Text me 'PINEAPPLE 🍍'", text: "PINEAPPLE 🍍 — I miss you. I need: " }
    },
    {
      id: "bad-day",
      title: "Open when you’re having a bad day",
      emoji: "🫶",
      body: [
        "I’m here. Fully.",
        "Bad days don’t define you — they just visit.",
        "",
        "You don’t have to be strong for me. You don’t have to be okay to be loved.",
        "I’m on your team. Always. Do you remember that day when one of your old age patient/aunty gave you chocolates & lots of blessings for doing her tooth surgey so effortlessly without any Pain",
        "Also do you remember time when there came one patient with condition being described such that every other dentist where not being able to do it properly. I am telling about one whose mouth was not opening much & there wasn't much space for instruments to enter mouth, but still then you operated. Though you too got frightened and praying god but surgery went really good & Patient was happy so much so that they started telling you that you are like a god and were thanking you",
        "Fuck, there are innumberable accounts like these, but abhi puri website banani baki hain, Aur bhi kafi sari add krta jaunga with time, so make sure to visit this",
        "Now do this: send me ONE word for how you feel. I’ll reply with exactly what you need."
      ],
      photo: "assets/photos/env-bad-day.jpg",
      audio: "assets/audio/voice-bad-day.wav",
      action: { type: "whatsapp", label: "Send me 1 word", text: "One word for today is: " }
    },
    {
      id: "cant-sleep",
      title: "Open when you can’t sleep",
      emoji: "🌙",
      body: [
        "Hi night owl.",
        "",
        "Have I slept early? Silly & Stupid me..You deserve a lot better person but hey i promise you I really LOVES you, love you like crazy, i mean infinite like crazy, i think about you all the time, i miss you all the time, wait for your text, Dimagi pulao bnata rehta hu about what we will do next time we meet & what not",
        "",
        "Now, If your mind is loud, borrow my calm for a minute.",
        "",
        "Close your eyes and imagine this in our bedroom: we’re in the same room — no pressure to talk — just presence.",
        "",
        "Now do this: put your phone down for 30 seconds, breathe slowly… then message me: 'still awake or call me' (and I'll be your sleepy company)."
      ],
      photo: "assets/photos/env-cant-sleep.jpg",
      audio: "assets/audio/voice-cant-sleep.wav",
      action: { type: "whatsapp", label: "Text 'still awake'", text: "still awake 😴" }
    },
    {
      id: "anxious",
      title: "Open when you’re anxious",
      emoji: "🌿",
      special: { type: "breathing", seconds: 60 },
      body: [
        "Hey. Slow down with me.",
        "You’re safe right now, in this moment.",
        "",
        "Let’s not solve the whole universe. Let’s just get through the next 60 seconds together.",
        "",
        "Use the breathing button below. Then text me: 'I need calm.'"
      ],
      photo: "assets/photos/env-anxious.jpg",
      audio: "assets/audio/voice-anxious.wav",
      action: { type: "whatsapp", label: "Text 'I need calm'", text: "I need calm 🫶" }
    },
    {
      id: "lonely",
      title: "Open when you feel lonely",
      emoji: "🤍",
      body: [
        "Lonely doesn’t mean unloved.",
        "It just means you want closeness — and I want that too.",
        "",
        "Let's do a video call (even if it's short).",
        "",
        "Now do this: pick one — call / movie / 'silent together' (we stay on call while doing our own thing)."
      ],
      photo: "assets/photos/env-lonely.jpg",
      audio: "assets/audio/voice-lonely.wav",
      action: { type: "whatsapp", label: "Pick: call / movie / silent", text: "I want: call / movie / silent together" }
    },
    {
      id: "motivation",
      title: "Open when you need motivation",
      emoji: "⚡",
      body: [
        "Reminder: You’re capable. You’re consistent. You’re getting better.",
        "I’ve seen you show up even when it was hard.",
        "",
        "The way you keep going inspires me.",
        "",
        "Now do this: tell me what you’re working on. I’ll hype you like it’s my job."
      ],
      photo: "assets/photos/env-motivation.jpg",
      audio: "assets/audio/voice-motivation.wav",
      action: { type: "whatsapp", label: "Tell me your goal", text: "I’m working on: " }
    },
    {
      id: "overthinking",
      title: "Open when you’re overthinking",
      emoji: "🧠",
      body: [
        "Let’s not fight battles in your head.",
        "If something feels unclear, we’ll talk and make it clear.",
        "",
        "We're okay. I'm here. I choose you — repeatedly.",
        "",
        "Now do this: ask me directly. I will answer directly."
      ],
      photo: "assets/photos/env-overthinking.jpg",
      audio: "assets/audio/voice-overthinking.wav",
      action: { type: "whatsapp", label: "Ask me directly", text: "I’m overthinking about: " }
    },
    {
      id: "feel-close",
      title: "Open when you want to feel close",
      emoji: "🫀",
      body: [
        "Distance can’t stop closeness — we just have to do it intentionally.",
        "",
        "Ritual: put on ‘Song from our playlist at the same time. Don’t multitask. Just listen.",
        "",
        "Now do this: message me when the song hits your favourite line and tell me what you feel."
      ],
      photo: "assets/photos/env-feel-close.jpg",
      audio: "assets/audio/voice-feel-close.wav",
      action: { type: "whatsapp", label: "Message me at 00:45", text: "00:45 — I feel: " }
    },
    
    {
      id: "proud",
      title: "Open when you’re proud of yourself",
      emoji: "🏆",
      body: [
        "I’m proud of you too.",
        "Not just for results — for effort, courage, and growth.",
        "",
        "I love how you keep becoming more YOU.",
        "",
        "Now do this: tell me what you did so I can celebrate properly."
      ],
      photo: "assets/photos/env-proud.jpg",
      audio: "assets/audio/voice-proud.wav",
      action: { type: "whatsapp", label: "Tell me your win", text: "I’m proud because: " }
    },
    

    /* Bonus envelopes */
    {
      id: "surprise",
      title: "Open when you want a surprise",
      emoji: "🎁",
      body: [
        "Go to the Extras section → press 'Random Reason' 5 times.",
        "Screenshot your favorite one and send it to me."
      ],
      photo: "assets/photos/env-surprise.jpg",
      audio: "assets/audio/voice-surprise.wav",
      action: { type: "whatsapp", label: "Send me a screenshot", text: "I picked my favorite reason. Here it is: " }
    },
   
    
    

    /* Locked Valentine envelope */
    {
      id: "valentine",
      title: "Open on Valentine’s Day ❤️",
      emoji: "🌹",
      unlockDate: "2026-02-13",
      lockMessage: "Not yet 😉 Open this on Valentine’s Day (14 Feb).",
      body: [
        "Happy Valentine’s Day, my love.",
        "",
        "Past: In the last 11 months, we built something real — with calls, messages, patience, and choosing each other.",
        "Present: Right now, I want you to feel loved, safe, and proud of what we are.",
        "Future : I want more ordinary days with you — and the big ones too.",
        "",
        "3 things I learned about love with you:",
        "1) Love is consistency.",
        "2) Love is kindness in small moments.",
        "3) Love is choosing each other even when it’s hard.",
        "",
        "Now do this: text me 'VALENTINE ❤️' and I'll tell you something I've never said out loud."
      ],
      photo: "assets/photos/env-valentine.jpg",
      audio: "assets/audio/voice-valentine.wav",
      action: { type: "whatsapp", label: "Text 'VALENTINE ❤️'", text: "VALENTINE ❤️" }
    }
  ],

  // ====== Extras content ======

  // Timeline (11 months)
  timeline: [
    { dateLabel: "Month 1", title: "March", note: " This is where our magic began, Quokka. We moved away from the noise of Instagram on March 13th because we both felt it was too flashy and superficial. I remember uncovering the 8th wonder of the world for you my home and we immediately clicked over deep, intellectual talks about Sapiens and our shared outlook on life. The flirting was effortless and electric from the very first day. By the end of the month, we both acknowledged that unmistakable spark, realizing that what we had was becoming something much more beautiful than just a casual conversation." },
    { dateLabel: "Month 2", title: "April", note: "Our connection deepened into a passionate fire this month. We stopped holding back and started expressing our love and physical longing for each other more intensely. Whether you were dealing with a hectic, draining day at the clinic or suffering through one of your painful migraines, my only wish was to be your comfort and your escape. This was the month we truly started falling, realizing that we weren’t just talking...we were becoming a vital part of each other's lives." },
    { dateLabel: "Month 3", title: "May", note: "We navigated the delicate vulnerabilities of a growing love during May. We spent time learning each other's boundaries and reinforcing the trust between us. I remember you often sought reassurance, sometimes apologizing for what you called baseless questions, but I loved every single one of them. To me, your curiosity and even your insecurities were just signs of how much you cared, and I cherished the chance to prove my commitment to you over and over again." },
    { dateLabel: "Month 4", title: "June", note: "We began to dream out loud about our future and the day the distance would finally disappear. I started calling you my girl and baby girl with a new sense of pride. What I loved most about this month was our balance; we could discuss the most serious, mature life goals one moment, and then be completely childish, silly, and playful the next. I realized then that I didn’t just want a partner; I wanted you, in all your different versions." },
    { dateLabel: "Month 5", title: "July", note: "While I was focused on the heavy lifting of rebuilding my career and mastering new skills, you remained my constant, steady anchor. No matter how much the world demanded of me during the day, our goodnight texts were the sanctuary I returned to. Every affirmation of ownership and love we shared was a reminder that even when life feels like a climb, I’m never climbing alone because I have you by my side." },
    { dateLabel: "Month 6", title: "August", note: "I looked back this month and was struck by how far we had come since those first texts in March. I told you that you are my home, my chaos, and my calm all at once. We reached a point of no return..in the best way possible, where we both knew that our lives were completely intertwined. The commitment we felt wasn't just a promise; it was a fundamental truth of who we had become together." },
    { dateLabel: "Month 7", title: "September", note: "This was the month I officially claimed Quokka as my favorite name for you. Beyond the deep emotional support I tried to give whenever you felt low, we shared the simple, joyful rhythms of daily life discussing online shopping wins, venting about refunds, and just being present in each other's ordinary moments. You became my best friend and my confidante, the person I wanted to tell everything to, no matter how small." },
    { dateLabel: "Month 8", title: "October", note: "One of the most significant chapters of our story so far. While you were away in Port Blair and Havelock, I was bursting with pride watching you face your fears from afar. When you went 9 meters deep into the ocean for your scuba diving session, I felt like I was holding my breath with you. It was during these weeks that we spoke more seriously than ever about our future, dreaming of the day we would stand proud together before the entire world as one." },
    { dateLabel: "Month 9", title: "November & December", note: "As the year drew to a close, we solidified our roles as each other's greatest strength. We promised to be the person who provides stability when the other feels like they are faltering. We navigated the holidays and the end-of-year reflections knowing that 2025 was just the prologue. We closed out the year with a deep sense of peace, ready to step into 2026 hand-in-hand." },
    { dateLabel: "Month 10", title: "January", note: "We entered the new year by leaning into each other even more. We had our moments of navigating silence and busy schedules, and even when you felt a little distant or ignored because of the gaps in our communication, we chose to talk through it rather than pull away. It proved to me that our bond is strong enough to handle any silence and that my love for you is a constant that doesn't fade when life gets loud." },
    { dateLabel: "Month 11", title: "February", note: "And here we are today, my Quokka. Between the pressures of work and the rush of the world, our good morning and hi baby texts remain the absolute highlights of my day. I still find myself smiling at my phone just seeing your name pop up. Every moment we've shared over the last year is a treasure I carry with me, and I'm so excited for every month that is still to come for us." }
  ],

  



  // Love coupons
  coupons: [
    { id:"c1", title:"1× Movie Date Night", desc:"You pick the movie, I bring snacks + full attention.", redeemText:"Redeem by texting: MOVIE 🍿" },
    { id:"c2", title:"1× 'No solutions, only comfort' call", desc:"You talk, I listen. No fixing mode.", redeemText:"Text: COMFORT 🫶" },
    { id:"c3", title:"1× Late-night talk pass", desc:"Any night, any time.", redeemText:"Text: LATE 🌙" },
    { id:"c4", title:"1× Your choice date", desc:"Game / movie / deep talk — you decide.", redeemText:"Text: YOUR CHOICE 🎲" },
    { id:"c5", title:"1× Compliment attack", desc:"5 specific compliments + 1 voice note.", redeemText:"Text: BOOST ✨" },
    { id:"c6", title:"1× 'Silent together' session", desc:"We stay on call doing our own thing.", redeemText:"Text: SILENT 🤍" }
  ],

  // Reasons list (the generator picks random items)
  reasons: [
    "Reason #1 : You make my worst days lighter.",
    "Reason #2: Your voice feels like home.",
    "Reason #3: You care in a way that's rare.",
    "Reason #4: You make me want to become better.",
    "Reason #5: You're cute even when you're mad.",
    "Reason #6: Your laugh is my favorite sound.",
    "Reason #7: You're strong, but still soft.",
    "Reason #8: You remember the small things.",
    "Reason #9: You try — and that means everything.",
    "Reason #10: You feel like my best friend.",
    "Reason #11: You're beautiful in the most effortless way.",
    "Reason #12: You're honest — even when it's hard.",
    "Reason #13: You make boring days special.",
    "Reason #14: You support my dreams.",
    "Reason #15: You're silly with me.",
    "Reason #16: You make distance feel possible.",
    "Reason #17: You're kind — not just nice.",
    "Reason #18: You inspire me.",
    "Reason #19: You're patient with me.",
    "Reason #20: You are, simply, you."
  ],

  // Mini quiz
  quiz: {
    title: "How well do you know us?",
    questions: [
      {
        id:"q1",
        q:"What’s our go-to vibe on calls?",
        options:["Deep talks","Roasting each other","Silent together","All of the above"],
        answerIndex: 1
      },
      {
        id:"q2",
        q:"What should you text me when you miss me?",
        options:["PINEAPPLE 🍍","BANANA 🍌","MANGO 🥭","APPLE 🍎"],
        answerIndex: 0
      },
      {
        id:"q3",
        q:"What's my favorite thing about you?",
        options:["Your smile","Your kindness","Your laugh","Everything"],
        answerIndex: 3
      }
    ]
  }
};
