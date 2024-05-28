interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
}


export const analyzeNextSteps = (step: number, userResponse: string): ResponseBotObject => {
  let response: ResponseBotObject = {
    purpose: "",
    message: "",
    sender: "bot",
    options: [] 
  };

  if (step === 0) {
    response = {
      purpose: "ask_option",
      message: `Nice to meet you, ${userResponse}! What would you like to know about?`,
      options: ["Parking lots", "Price information", "Cancellation policy"],
      sender: "bot"
    };
  } else if (step === 1) {
    if (userResponse === "Parking lots" || userResponse === "Price information" || userResponse === "Cancellation policy") {
      response = {
        purpose: "redirect",
        message: `You can search for parking located in your neighborhoods by clicking on the Find Parkings Section. What else would you like to know?`,
        options: ["Parking lots", "Price information", "Cancellation policy"],
        sender: "bot"
      };
    }
  } else if ((step === 2 || step === 3 || step === 4) && (userResponse === "Parking lots" || userResponse === "Price information" || userResponse === "Cancellation policy")) {
    response = {
      purpose: userResponse.toLowerCase().replace(/\s/g, "_"), 
      message: userResponse === "Parking lots" ?
        `<p>You can search for parking located in your neighborhoods by clicking on this link: <a href='https://advanced-parking.vercel.app/ourparkings'>Parkings</a></p>` :
        userResponse === "Price information" ?
        "The price is 3.55 USD per hour. Would you like to know something else?" :
        "No cancellation is available and funds are not refundable. Would you like to know something else?",
      options: ["Parking lots", "Price information", "Cancellation policy", "Finish chat"],
      sender: "bot"
    };
  } else if (step === 4 && userResponse === "Finish chat") {
    response = {
      purpose: "end chat",
      message: "Bye!",
      sender: "bot"
    };
  }
  else if (userResponse === "Finish chat") {
    response = {
      purpose: "end chat",
      message: "Bye!",
      sender: "bot"
    };
  } else {
    response = {
      purpose: "default",
      message: "I'm sorry, I didn't understand that. Can you please choose one of the options: ",
      sender: "bot",
      options: ["Parking lots", "Price information", "Cancellation policy", "Finish chat"]
    };
  }

  return response;
};
