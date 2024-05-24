export const analyzeNextSteps = (step: any, userResponse: any) => {
    return step === 0
      ? {
          purpose: "specify field",
          message: `Nice to meet you, ${userResponse}! It feels like I know you already. We have some job positions for you. Which of these call out to you?`,
          options: ["Frontend", "Backend", "Full Stack"]
        }
      : step === 1
      ? {
          purpose: "specify experience",
          message:
            "That's cool! Could you describe your experience in that field?"
        }
      : step === 2
      ? {
          purpose: "specify projects",
          message:
            "Did you do any projects that you're proud of? Can you tell me more about them? (class projects are cool too...)"
        }
      : step === 3
      ? {
          purpose: "specify personality",
          message:
            "Thanks for telling me that. Let's get personal... (just kidding). Could you tell me about yourself? How would you describe your personality?"
        }
      : step === 4
      ? {
          purpose: "prompt company info",
          message: "Do you want me to explain what we do?",
          options: ["Yeah sure!", "Meh, I'll pass"]
        }
      : step === 5
      ? userResponse === "Yeah sure!"
        ? {
            purpose: "tell company info",
            message: "Oh yay! This is what we do...",
            options: ["Keep going."]
          }
        : {
            purpose: "not tell company info",
            message: "Aww... Well I guess you know what we do already.",
            options: ["Keep going."]
          }
      : step === 6
      ? {
          purpose: "specify reason to work",
          message:
            "Now that you know what we do, how about you tell me why you want to work for us?"
        }
      : step === 7
      ? {
          purpose: "specify hobbies",
          message:
            "Alright, noted! One last question before we finish, besides coding/working, what do you do?"
        }
      : step === 8
      ? {
          purpose: "specify email",
          message:
            "That sounds awesome! Right, it looks like we've got your application set. I would need your email to contact you if you're a good fit for this role!"
        }
      : step === 9
      ? {
          purpose: "end",
          message:
            "Thank you so much for spending time chatting with me. Good luck with the application process! I hope we can meet soon. Bye!"
        }
      : {
          purpose: "bye",
          message: "Bye!"
        };
  }