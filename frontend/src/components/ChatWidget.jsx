import { useState } from "react";
import { contactPhoneDisplay, whatsappHref } from "../config";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const message = encodeURIComponent(
    "Hi Coffeeland FC! I would like to know more about joining the academy."
  );
  const whatsappUrl = `${whatsappHref}?text=${message}`;

  return (
    <div className={`chat-widget ${open ? "open" : ""}`}>
      <div className="chat-panel" role="dialog" aria-label="Chat with us">
        <div className="chat-header">
          <span className="chat-header-avatar">⚽</span>
          <div>
            <strong>Coffeeland FC</strong>
            <span className="chat-online"><i></i> Online Now</span>
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-bubble">
            Hi there! 👋 Got a question about joining the academy or upcoming camps? Message us on
            WhatsApp or call {contactPhoneDisplay}.
          </div>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="chat-whatsapp-btn">
          💬 Start Chat on WhatsApp
        </a>
      </div>

      <button
        type="button"
        className="chat-fab"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}