var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer "
);
myHeaders.append(
  "Cookie",
  "__cf_bm=cL.dyckf5ohY3Ev2WPu9WDvNL4sRF7p3LAoVZc.4wFM-1689706453-0-ARI4UP8upBN1UpzG77t5DaVW7/iziw00aNCSRmdjIYyu3pQ3MhETa0ldiy8AZaFnN2PsNZW0I5Mb84mPk8AxQEs="
);

export const getChat = async (messages) => {
  var raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 250,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    requestOptions
  );

  return response.json();
};
