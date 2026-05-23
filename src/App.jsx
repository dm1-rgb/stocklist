import { useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const files = [
    {
      title: "USA Product List",
      url: "/pdfs/usa-product-list.pdf",
      icon: "🇺🇸",
      description: "Complete USA herbal product catalog",
      color: "from-green-600",
    },
    {
      title: "USA Stock List",
      url: "/pdfs/usa-stock-list.pdf",
      icon: "📋",
      description: "Latest USA stock availability",
      color: "from-green-600",
    },
    {
      title: "Europe Product List",
      url: "/pdfs/europe-product-list.pdf",
      icon: "🇪🇺",
      description: "Europe herbal product catalog",
      color: "from-green-600",
    },
    {
      title: "Europe Stock List",
      url: "/pdfs/europe-stock-list.pdf",
      icon: "📋",
      description: "Updated Europe stock inventory",
      color: "from-green-600",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("downloads").insert([
      {
        name,
        email,
        file_type: selectedFile.title,
      },
    ]);

    if (error) {
      alert("Error saving data");
      setLoading(false);
      return;
    }

    const link = document.createElement("a");
    link.href = selectedFile.url;
    link.download = selectedFile.title + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoading(false);
    setSelectedFile(null);
    setName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] overflow-hidden">

      {/* NAVBAR */}
      <div className="w-full border-b border-gray-200 bg-white/70 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-black text-gray-800">
                Herbal Creations
              </h1>

              <p className="text-sm text-gray-500">
                Premium Herbal Extracts
              </p>
            </div>

          </div>

<a
  href="https://herbal-creations.com/contact-us/"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="hidden md:block px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition">
    Contact Us
  </button>
</a>

        </div>
      </div>

      {/* HERO */}
      <section className="relative">

        {/* Background Shapes */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-200 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute right-[-100px] top-[50px] w-[300px] h-[300px] bg-purple-200 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold text-sm mb-8">
              Trusted by Global Buyers
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">

              Download Premium <br />

              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                Herbal Catalogs
              </span>

            </h1>

            <p className="text-xl text-gray-500 leading-relaxed mb-12">
              Explore USA & Europe product catalogs and updated stock lists
              instantly with a premium experience.
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 mb-16">

            {[
              { number: "500+", label: "Products" },
              { number: "25+", label: "Countries" },
              { number: "45+", label: "Years Experience" },
              { number: "24/7", label: "Support" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 text-center"
              >

                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  {item.number}
                </h2>

                <p className="text-gray-500">
                  {item.label}
                </p>

              </div>
            ))}

          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

            {files.map((file, index) => (
              <div
                key={index}
                onClick={() => setSelectedFile(file)}
                className="group relative bg-white rounded-[35px] p-7 shadow-xl hover:shadow-2xl transition duration-500 cursor-pointer hover:-translate-y-3 border border-gray-100 overflow-hidden"
              >

                {/* TOP GRADIENT */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${file.color}`}
                ></div>

                {/* BIG BG ICON */}
                <div className="absolute -right-5 -top-5 text-[120px] opacity-5 group-hover:scale-110 transition duration-500">
                  {file.icon}
                </div>

                <div className="relative z-10">

                  <div
                    className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${file.color} flex items-center justify-center text-4xl shadow-lg mb-8`}
                  >
                    {file.icon}
                  </div>

                  <h2 className="text-2xl font-black text-gray-800 mb-4 leading-snug">
                    {file.title}
                  </h2>

                  <p className="text-gray-500 leading-relaxed mb-8">
                    {file.description}
                  </p>

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-gray-800">
                      Download PDF
                    </span>

                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${file.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-[-10deg] transition duration-300`}
                    >
                      →
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <div className="text-center py-10 text-gray-500 text-sm">
        © 2026 Herbal Creations. All rights reserved.
      </div>

      {/* MODAL */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-5">

          <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden relative animate-[fadeIn_.3s_ease]">

            {/* TOP */}
            <div
              className={`h-40 bg-gradient-to-br ${selectedFile.color} relative flex items-center justify-center`}
            >

              <div className="text-7xl drop-shadow-lg">
                {selectedFile.icon}
              </div>

              <button
                onClick={() => setSelectedFile(null)}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 backdrop-blur-lg text-white text-xl hover:bg-white/30 transition"
              >
                ×
              </button>

            </div>

            {/* BODY */}
            <div className="p-8">

              <h2 className="text-3xl font-black text-gray-800 mb-2 text-center">
                {selectedFile.title}
              </h2>

              <p className="text-center text-gray-500 mb-8">
                Enter your details to continue
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>

                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition"
                  />

                </div>

                <div>

                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition"
                  />

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-14 rounded-2xl bg-gradient-to-r ${selectedFile.color} text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition`}
                >
                  {loading ? "Please wait..." : "Download PDF"}
                </button>

              </form>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;