import { useState } from "react";
import "./index.css";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();
    if (!message) return;

    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    // alert(message);
    fetch("http://localhost:8080/", {
      method: "post",

      headers: {
        "content-Type": "application/json",
      },

      body: JSON.stringify({
        chats: msgs,
      }),
    })
      .then((response) => response.json)
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <main>
      <h1>ChattyMind</h1>
      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p
                key={index}
                className={chat.role === "user" ? "user-message" : "ai-message"}
              >
                <span
                  style={{
                    color: "black",
                    marginRight: "1%",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                  }}
                >
                  {chat.role.toUpperCase()}
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i style={{ color: "white", marginBottom: "1%" }}> Typing ... </i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)} className="form">
        <input
          className="input__filed"
          type="text"
          name="message"
          value={message}
          placeholder="Type a message and hit enter"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default App;
