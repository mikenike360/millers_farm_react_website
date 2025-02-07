export default function Contact() {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <form className="max-w-lg mx-auto space-y-4">
          <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
          <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
          <textarea placeholder="Your Message" className="textarea textarea-bordered w-full"></textarea>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    );
  }
  