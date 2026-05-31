function Contact() {
  return (
    <section className="section-shell page-block contact-layout">
      <div className="page-intro">
        <p className="eyebrow">We would love to hear from you</p>
        <h1>Contact</h1>
        <p>
          Questions about styling, bulk gifting, or an order? Send a note and the
          House of Tharagai team will get back to you.
        </p>

        <div className="contact-details">
          <div>
            <span>Email</span>
            <strong>hello@houseoftharagai.com</strong>
          </div>
          <div>
            <span>Instagram</span>
            <strong>@house_of_tharagai</strong>
          </div>
          <div>
            <span>Hours</span>
            <strong>Mon to Sat, 10 AM - 7 PM</strong>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" />
        </label>
        <label>
          Message
          <textarea name="message" rows="6" placeholder="How can we help?" />
        </label>
        <button className="button button-primary" type="submit">
          Send Message
        </button>
      </form>
    </section>
  )
}

export default Contact
